const models = require('../models');
const config = require('../config/config');
const utils = require('../utils');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { v4: uuidv4 } = require('uuid');

module.exports = {
    get: {
        getUser: (req, res, next) => {
        models.User.find()
            .then((users) => res.send(users))
            .catch(next)
        },
        confirmEmail: async (req, res, next) => {
            const {uuid, userId} = req.params
            console.log(uuid)
            try{
                models.User.findOne({ _id: userId }).then( async (user) => {
                    if(user.uuid.toString() === uuid.toString()){
                    await models.User.findOneAndUpdate({_id: userId}, {isConfirmed: true})
                    return res.send('success')
                    }
                    return res.status(401).send({err:'Confirmation email is not valid!',status: 401})
                }).catch(() => {
                    return res.status(401).send({err:'Confirmation email is not valid!',status: 401})
                })
            }catch(e){
                console.log(e)
                return res.status(401).send({err:'Confirmation email is not valid!',status: 401})
            }
        },
        verifyLogin: (req, res, next) => {
            const token = req.headers.authorization || '';
  
            Promise.all([
                utils.jwt.verifyToken(token),
                models.TokenBlacklist.findOne({ token })
            ])
                .then(([data, blacklistToken]) => {
                    if (blacklistToken) { return Promise.reject(new Error('blacklisted token')) }
  
                    models.User.findById(data.id)
                        .then((user) => {
                            console.log(user)
                            return res.send({
                              status: true,
                              user
                            })
                        });
                })
                .catch(err => {
  
                    if (['token expired', 'blacklisted token', 'jwt must be provided'].includes(err.message)) {
                        res.status(401).send('UNAUTHORIZED!');
                        return;
                    }
  
                    res.send({
                      status: false
                    })
                })
          },
        
    },

    post: {
        register: async(req, res, next) => {
            const { email, password, imageUrl, faceBook} = req.body;
            models.User.findOne({ email })
            .then((user) => {
                if(user){
                    res.status(409).send({err: 'Email exists'});
                    return;
                }else{
                    models.User.create({ email, password, imageUrl })
                    .then(async(createdUser) => {
                        console.log(faceBook)
                        if(faceBook){
                             await models.User.findOneAndUpdate({_id: createdUser._id}, {isConfirmed: true})
                        }else{
                             await utils.sendMsg({email: createdUser.email, subject: 'Please confirm your email!',text: `Confirmation email', 'Please click on this link to confirm your account! https://localhost:3000/Confirm/${createdUser.uuid}/${createdUser._id}`})
                        }
                        res.header("Authorization", 'notConfirmed').send(createdUser)
                    })
                    .catch(err=>{
                        res.send(err)
                    })    
                }                               
            })
            .catch(next);
            
        },

        login: (req, res, next) => {
            const { email, password, faceBook } = req.body;
            if((!email || !password) && !faceBook){
                res.status(400).send({err: 'Missing data',status: 400})
                return
            }
            models.User.findOne({ email })
                .then((user) => Promise.all([user, user.matchPassword(password)]))
                .then(([user, match]) => {
                    if (!match) {
                        res.status(401).send({err:'Invalid user', status: 401});
                        return;
                    }
                    if(!user.isConfirmed){
                        res.status(401).send({err:'Not confirmed', status:401});
                        return;
                    }                  
                    const token = utils.jwt.createToken({ id: user._id });
                    res.header("Authorization", token).send(user);
                })
                .catch(e => {
                    res.status(401).send({err: 'Invalid user',status: 401})
                });
        },
        
        logout: (req, res, next) => {
            const token = req.cookies[config.authCookieName];
            console.log('-'.repeat(100));
            console.log(token);
            console.log('-'.repeat(100));
            models.TokenBlacklist.create({ token })
                .then(() => {
                    res.clearCookie(config.authCookieName).send('Logout successfully!');
                })
                .catch(next);
        },
        imgChange: async(req,res,next) => {
            const {url} = req.body
            const {userId} = req.params

            try{
            const result = await models.User.findOneAndUpdate({_id: userId}, {imageUrl: url})
            console.log(result)
            res.send(result)
            }catch(e){
                console.log(e)
            }
        }
        
           
    },

    put: (req, res, next) => {
        const id = req.params.id;
        const { oldPassword, newPassword } = req.body;
        console.log(oldPassword)
        models.User.findOne({_id:id}).then((user) => Promise.all([user, user.matchPassword(oldPassword)]))
        .then(([user, match])=>{
            if(match){
                bcrypt.genSalt(saltRounds, (err, salt) => {
                    bcrypt.hash(newPassword, salt, (err, hash) => {
                        if (err) { next(err); return }
                        models.User.update({ _id: id }, {password: hash }).then((updatedUser)=>{
                            console.log(updatedUser)
                            res.send(updatedUser)
                            return
                        })
                        
                    });
                });
               
               
            }
            res.status(401).send('no match')
        })
        
        // models.User.update({ _id: id }, { username, password })
        //     .then((updatedUser) => res.send(updatedUser))
        //     .catch(next)
    },

    delete: (req, res, next) => {
        const id = req.params.id;
        models.User.deleteOne({ _id: id })
            .then((removedUser) => res.send(removedUser))
            .catch(next)
    }
};