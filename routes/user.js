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

    try {
        
        let user;

        if(req.file){
            user = new User({
                ...req.body,
                picUrl:'http://localhost:3000/uploads/profile_pictures/'+name+path.extname(req.file.originalname),
                picName:name+path.extname(req.file.originalname)
            })
        }else{
            user = new User({
                ...req.body,
             })
        }

        await user.save();

        res.send({success:true,data:user})

    } catch (e) {
        res.status(500).send({success:false,message:"something went wrong",error:e});
    }

})


module.exports = router;