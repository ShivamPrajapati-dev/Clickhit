const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/auth');
const Food = require('../model/food/post');
const preCompute = require('../computation/precompute');

const storage = multer.diskStorage({
    destination: "./public/uploads/food",
    filename: function (req, file, cb) {
        req.filename = uuidv4();  
              
      cb(
        null,
        req.filename + path.extname(file.originalname)
      );
    },
  });
  
  //init upload variable
  const upload = multer({
    storage: storage,
  });

  router.post('/addpost', auth, upload.single('image'), (req,res)=>{

    const userId = req.user._id;

    if(!req.body.category){
        return res.status(400).send({success:false,message:"provide food category"});
    }

    if(!req.body.ingredients){
      return res.status(400).send({success:false,message:"provide food ingredients"});   
    }

    if(!req.file){
        return res.status(400).send({success:false,message:"provide food pic"});
    }

    try {
        let food = new Food({
            ...req.body,
            imageUrl:'http://localhost:3000/uploads/food/'+req.filename+path.extname(req.file.filename),
            imageName:req.filename+path.extname(req.file.filename)
        });

        food.save().then((post)=>{
            res.send({success:true,data:post});
        }).then(()=>{
            console.log('precomputing');
            preCompute(userId,food._id);
        })
    } catch (e) {
        res.send({success:false,message:'something went wrong',error:e});
    }
  })



module.exports = router;