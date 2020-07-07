const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/auth');
const Food = require('../model/food/post');
const Refridgerator = require('../model/refridgerator');
const preCompute = require('../computation/precompute');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3')

const s3 =  new AWS.S3({
  accessKeyId: process.env.ID,
  secretAccessKey: process.env.SECRET
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

  router.post('/_food/addpost', auth, upload.single('image'), (req,res)=>{

    const userId = req.user.userId;

    if(!req.body.category){
        return res.status(400).send({success:false,message:"provide food category"});
    }

    if(!req.body.ingredients){
      return res.status(400).send({success:false,message:"provide food ingredients"});   
    }

    if(!req.body.fridgeId){
      return res.status(400).send({success:false,message:"provide fridge id"});   
    }


    if(!req.file){
        return res.status(400).send({success:false,message:"provide food pic"});
    }

    try {
        let food = new Food({
            userId,
            ...req.body,
            imageUrl:req.file.location,
            imageName:req.file.key
        });

        food.save().then((post)=>{

            res.send({success:true,data:post});
            return Promise.resolve(post);

        }).then(async (post)=>{

          const refridgerator = await Refridgerator.findOne({_id:post._id});
          
          let obj = {
            foodName:post.foodName,
            imageUrl:post.imageUrl,
            foodId:post.foodId
          }
          refridgerator.food.push(obj);
          await refridgerator.save();

            console.log('precomputing');
            preCompute(userId,food._id);

        }).catch(err => {throw err})
    } catch (e) {
        res.send({success:false,message:'something went wrong',error:e});
    }
  });

  router.get('/_food/myposts', auth, async (req,res)=>{
    try {
      const posts = await Food.find({userId:req.user.userId});
      if(!posts){
        return res.send({success:false,message:"no posts found"});
      }
      res.send({success:true,data:posts});
    } catch (e) {
      res.send({success:false,message:'something went wrong',error:e});   
    }
  });

module.exports = router;