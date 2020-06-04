const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const path = require('path');
const User = require('../model/user');
const client = require('../redis-client/client');
const auth = require('../middleware/auth');
const cache = require('../middleware/cache');
const userfeed = require('../middleware/userfeed');
let name;

const storage = multer.diskStorage({
    destination: "./public/uploads/profile_pictures",
    filename: function (req, file, cb) {
        name = uuidv4();        
      cb(
        null,
        name + path.extname(file.originalname)
      );
    },
  });
  
  //init upload variable
  const upload = multer({
    storage: storage,
  });

  const storageX = multer.diskStorage({
    destination: "./public/uploads/profile_pictures",
    filename: async function (req, file, cb) {
       
      cb(
        null,
        req.user.picName + path.extname(file.originalname)
      );
    },
  });

  const uploadX = multer({
    storage: storageX,
  });

router.post('/adduser', upload.single('pic'), async (req,res)=>{

    if(!req.body.userId){
        return res.status(400).send({success:false,message:"user id is required"})
    }

    if(!req.body.name){
        return res.status(400).send({success:false,message:"nameis required"})
    }

    if(!req.body.age){
        return res.status(400).send({success:false,message:"age is required"})
    }

    if(!req.body.mobile){
        return res.status(400).send({success:false,message:"mobile number is required"})
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
                imageUrl:'http://localhost:3000/uploads/profile_pictures/'+name+path.extname(req.file.filename),
                imageName:name+path.extname(req.file.filename)
            })
        }else{
            user = new User({
                ...req.body
             })
        }


        await user.save();
        const token = await user.generateAuthToken();
        res.send({success:true,data:user,token})

    } catch (e) {
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
    res.send({success:true,data:req.user});
    
});

router.post('/user/me/logout', auth, async (req,res)=>{

    try {
        req.user.tokens = req.user.tokens.filter((token)=>{            
            return token.token !== req.token
        })
    
        await req.user.save();
        const key = '__user__'+req.user._id.toString();
        client.del(key);
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

router.get('/userfeed/me', cache, auth, userfeed, (req,res)=>{
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
    const key = '__user__'+req.user._id.toString();
    client.set(key,JSON.stringify(req.user));

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
        const key = '__user__'+req.user._id.toString();
        client.set(key,JSON.stringify(req.user));
        res.send({success:true,data:req.user});
    } catch (e) {
        res.status(500).send({success:false,message:"something went wrong",error:e});

    }
});



module.exports = router;