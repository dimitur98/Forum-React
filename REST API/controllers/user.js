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
            console.log(userId)
            models.User.findOne({ _id: userId }).then( async (user) => {
                if(user.uuid.toString() === uuid.toString()){
                   await models.User.findOneAndUpdate({_id: userId}, {isConfirmed: true})
                   return res.send('success')
                }
                return res.send('Confirmation emial is not valid!')
            })
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
            console.log(email)
            models.User.findOne({ email })
            .then((user) => {
                if(user){
                    res.status(409).send({err: 'Email exists'});
                    return;
                }                                 
            })
            .catch(next);
            models.User.create({ email, password, imageUrl })
                .then(async(createdUser) => {
                    console.log(faceBook)
                    if(faceBook){
                        const a = await models.User.findOneAndUpdate({_id: createdUser._id}, {isConfirmed: true})
                        console.log(a)
                    }else{
                        utils.sendMsg({email: createdUser.email, subject: 'Please confirm your email!',text: `Confirmation email', 'Please click on this link to confirm your account! http://localhost:9999/api/user/confirm/${createdUser.uuid}/${createdUser._id}`})
                    }
                    res.send(createdUser)
                })
                .catch(err=>{
                    console.log(err)
                    res.send(err)
                })    
        },

        login: (req, res, next) => {
            const { email, password } = req.body;
            models.User.findOne({ email })
                .then((user) => Promise.all([user, user.matchPassword(password)]))
                .then(([user, match]) => {
                    if (!match) {
                        res.status(401).send('Invalid password');
                        return;
                    }
                    if(!user.isConfirmed){
                        res.send('Not confirmed');
                        return;
                    }                  
                    const token = utils.jwt.createToken({ id: user._id });
                    res.header("Authorization", token).send(user);
                })
                .catch(next);
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