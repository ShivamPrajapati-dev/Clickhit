const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const path = require('path');
const User = require('../model/user');
const client = require('../redis-client/client');
const auth = require('../middleware/auth');
const userfeed = require('../middleware/userfeed');
const cache = require('../middleware/cache');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3')
require('dotenv').config()

//==================================================================



const s3 =  new AWS.S3({
    accessKeyId: process.env.ID,
    secretAccessKey: process.env.SECRET,
    region:'ap-south-1'
});


  var upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: process.env.BUCKET_NAME,
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      key: function (req, file, cb) {
          req.filename = uuidv4() + path.extname(file.originalname);
        cb(null, req.filename);
      }
    })
  })

  var uploadX = multer({
    storage: multerS3({
      s3: s3,
      bucket: process.env.BUCKET_NAME,
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      key: function (req, file, cb) {
        cb(null, req.user.imageName);
      }
    })
  })

router.post('/adduser', upload.single("pic"), async (req,res)=>{
    
    console.log(req.body);
  
    if(!req.body.userId){
        return res.status(400).send({success:false,message:"user id is required"})
    }

    if(!req.body.name){
        return res.status(400).send({success:false,message:"name is required"})
    }

    // if(!req.body.dob){
    //     return res.status(400).send({success:false,message:"age is required"})
    // }

    if(!req.body.password){
        return res.status(400).send({success:false,message:"password is required"})
    }

        const userX = await User.exists({userId:req.body.userId});
        console.log(userX);
        
        if(userX){
            return res.status(500).send({success:false,message:"user already exist"})
        }


    try {
        
        let user;       
        
        if(req.file){

            user = new User({
                ...req.body,
                imageUrl:req.file.location,
                imageName:req.file.key
             });
           
        }else{
            user = new User({
                ...req.body
             })
        }

         await user.save();
         console.log(user);
         const token = await user.generateAuthToken();
          console.log(token);
         return res.send({success:true,data:user,token})

    } catch (e) {
        console.log(e);
        res.status(500).send({success:false,message:"something went wrong",error:e});
    }

});

router.post('/user/login', async (req,res)=>{
    try {
        const user = await User.findByCredentials(req.body.userId,req.body.password);
        const token = await user.generateAuthToken();
        res.send({success:true,data:user,token});
    } catch (e) {
        res.status(500).send({success:false,message:"something went wrong",error:e});
    }
});

router.get('/user/me',cache, auth, (req,res)=>{
    res.send({user:req.user});
    
});

// router.get('/public/profile/:userid', async (req,res)=>{
//     try {
//         const user = await User.findOne({userId:req.params.userid});
//         let publicProfile = {
//             name:user.name,
//             imageUrl:user.imageUrl
//         };
//         res.send({success:true,data:publicProfile});
//     } catch (e) {
//         res.status(500).send({success:false,message:"something went wrong",error:e});
//     }
// })

router.get('/user/me/logout', auth, async (req,res)=>{

    try {
        req.user.tokens = req.user.tokens.filter((token)=>{            
            return token.token !== req.token
        })
    
        await req.user.save();
    
        res.send({success:true});
    } catch (e) {
        res.status(500).send({success:false,message:"something went wrong",error:e});
    }
    
});

router.post('/user/me/logoutall', auth, async (req,res)=>{
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send({success:true});
    } catch (e) {
        res.status(500).send({success:false,message:"something went wrong",error:e});
    }
});

router.get('/userfeed/me', auth, userfeed, (req,res)=>{
    if(req.userfeed){
        res.send({success:true,data:req.userfeed});
    }else{
        res.send({success:false,message:"no userfeed found"});
    }
})

router.post('/updatepic/me',auth, uploadX.single('newpic'), async (req,res)=>{
  
    if(!req.file){
        return res.send({success:false,message:"provide new image"})
    }

    res.send({success:true})
});

router.post('/updateuserinfo/me',auth, async (req,res)=>{
    
    if(!req.body){
        return res.status(400).send({success:false,message:"provide updates"});
    }
    
    const validUpdates = ['name','email','mobile'];
    const updates = Object.keys(req.body);

    const isValidOperation = updates.every((update)=>{
     
         return validUpdates.includes(update);
    });

    if(!isValidOperation){
        return res.send({success:false,message:"invalid updates"});
    }
    try {
        
        updates.forEach((update)=>{
            req.user[update] = req.body[update];
        });

        await req.user.save();
        res.send({success:true,data:req.user});
    } catch (e) {
        res.status(500).send({success:false,message:"something went wrong",error:e});

    }
});

// router.get('/get/users/:query', async (req,res)=>{
//     User.search(
//         {match:{userId:req.params.query}}
//     ,function(err,data){
//         if(err){
//             return res.send({success:false,message:"something went wrong",error:err})
//         }

//         res.send({success:true,data});
//     })
// })


module.exports = router;