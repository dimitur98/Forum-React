const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.APIKEY,
    api_secret: process.env.APISECRET
    });
const models = require('../models');

module.exports ={
    post:{
        deleteImage: (req,res,next)=>{
            var {url} = req.body
            var {userId} = req.params
            url = url.split('/')
            url=url[url.length -1].split('.')
            cloudinary.uploader.destroy(url[0]).then(c=>{
                res.send(c)
            })
            
        }
    }
}