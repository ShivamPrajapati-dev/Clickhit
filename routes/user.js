const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const path = require('path');
const User = require('../model/user');

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
        
        const _id = req.params.id;

        const user = await User.findOne({_id});
        
      cb(
        null,
        user.picName + path.extname(file.originalname)
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
                picUrl:'http://localhost:3000/uploads/profile_pictures/'+name+path.extname(req.file.filename),
                picName:name+path.extname(req.file.filename)
            })
        }else{
            user = new User({
                ...req.body
             })
        }


        await user.save();

        res.send({success:true,data:user})

    } catch (e) {
        res.status(500).send({success:false,message:"something went wrong",error:e});
    }

});

router.get('/getuser/:id', async (req,res)=>{
    const _id = req.params.id;

    try {
        const user = await User.findOne({_id:_id});
        if(!user || Object.keys(user).length == 0){
            return res.status(404).send({success:false,message:"no user found"})
        }
        res.send({success:true,data:user});
    } catch (e) {
        res.status(500).send({success:false,message:"something went wrong",error:e});
    }
});

router.get('/getuserfromuserid/:id', async (req,res)=>{
    const userId = req.params.id;

    try {
        const user = await User.find({userId});
        if(!user || Object.keys(user).length == 0){
            return res.status(404).send({success:false,message:"no user found"})
        }
        res.send({success:true,data:user});
    } catch (e) {
        res.status(500).send({success:false,message:"something went wrong",error:e});
    }
});

router.get('/getalluser', async (req,res)=>{

    try {
        const user = await User.find({});
        if(!user || Object.keys(user).length == 0){
            return res.status(404).send({success:false,message:"no user found"})
        }
        res.send({success:true,data:user});
    } catch (e) {
        res.status(500).send({success:false,message:"something went wrong",error:e});
    }
});

router.post('/updatepic/:id', uploadX.single('newpic'), async (req,res)=>{
  
    if(!req.file){
        return res.send({success:false,message:"provide new image"})
    }

    res.send({success:true})
});

router.post('/updateuserinfo/:id', async (req,res)=>{
    const _id = req.params.id;
    
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
        const user = await User.findOne({_id});

        if(!user || Object.keys(user).length == 0){
            return res.status(404).send({success:false,message:"user not found"});
        }
        updates.forEach((update)=>{
            user[update] = req.body[update];
        });

        await user.save();
        res.send({success:true,data:user});
    } catch (e) {
        res.status(500).send({success:false,message:"something went wrong",error:e});

    }
});

router.post('/followorunfollowuser/:id', async (req,res)=>{
    const userId = req.params.id;

    if(!req.body.follower){
        return res.status(400).send({success:false,message:"provide follower id"})
    }

    try {
        let user = await User.findOne({userId});

        if(!user || Object.keys(user).length == 0){
            return res.status(404).send({success:false,message:`user not found with id ${userId}`});
        }
        const check = await User.exists({userId,followers:{$in:[req.body.follower]}});
              
        if(check){

            user.followersCount--
            var index = user.followers.indexOf(req.body.follower);
            
            if (index >= 0) {
              user.followers.splice( index, 1 );
            }

            await user.save();
            let follower = await User.findOne({_id:req.body.follower});
            var index = follower.following.indexOf(user._id);
            
            if (index >= 0) {
              follower.following.splice( index, 1 );
            }
            follower.followingCount--
            await follower.save();
            return res.send({success:true,data:user});

        }
        user.followers.addToSet(req.body.follower);
        user.followersCount++;
        await user.save();
        let follower = await User.findOne({_id:req.body.follower});
        follower.following.addToSet(user._id);
        follower.followingCount++
        await follower.save();
        return res.send({success:true,data:user});
    } catch (e) {
        res.status(500).send({success:false,message:"something went wrong",error:e});
    }

});

router.post('/savecategory/:id', async (req,res)=>{
    const userId = req.params.id;

    if(!req.body.foodCategory){
        return res.status(400).send({success:false,message:"provide categories"})
    }

    try {
        let user = await User.findOne({userId});

        user.foodCategory = req.body.foodCategory;

        await user.save();
        res.send({success:true,data:user});
    } catch (e) {
        res.status(500).send({success:false,message:"something went wrong",error:e});
    }
})


module.exports = router;