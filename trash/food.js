const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/auth');
const Food = require('../model/food/post');
const Kitchen = require('../model/kitchen');
const Feedback = require('../model/feedbacks');
const NewFood = require('../model/new-food');

let name;

const storage = multer.diskStorage({
    destination: "./public/uploads/food",
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

  router.post('/addfood',auth,upload.single('pic'), async (req,res)=>{
      const userId = req.user.userId;

      if(!req.body.category){
          return res.status(400).send({success:false,message:"provide food category"});
      }

      if(!req.body.ingredients){
        return res.status(400).send({success:false,message:"provide food ingredients"});   
      }

      if(!req.body.recipe){
        return res.status(400).send({success:false,message:"provide food recipe"});   
      }

      if(!req.file){
          return res.status(400).send({success:false,message:"provide food pic"});
      }

      try {
        let food;

        if(req.file){
            food = new Food({
                ...req.body,
                foodPicUrl:'http://localhost:3000/uploads/food/'+name+path.extname(req.file.filename),
                picName:name+path.extname(req.file.filename)
            })
        }
        
        await food.save();

        let kitchen = await Kitchen.findOne({userId});
        if(!kitchen || Object.keys(kitchen).length == 0){
            return res.status(404).send({success:false,message:`no kitchen found with id ${userId}`})
        }

        kitchen.allFood.addToSet(food._id);
        kitchen.foodCount++;
        await kitchen.save();
        const newFood = new NewFood();
        newFood.newFood.push(food._id);
        await newFood.save();
        res.send({success:true,data:{food,kitchen}})
      } catch (e) {
        res.status(500).send({success:false,message:"something went wrong",error:e});
      }
  });

  router.post('/addfeedback', auth, async (req,res)=>{
      
    const fromId = req.user.userId;
    if(!req.body.foodId){
        return res.send({success:false,message:"provide food id"});
    }
    if(!req.body.types){
        return res.send({success:false,message:"provide feedback type"});
    }
    
    try {
        const feedbackX = await Feedback.exists({foodId:req.body.foodId});
        if(feedbackX){
            let feedback = await Feedback.findOne({foodId:req.body.foodId});

            if(req.body.types.like){

              const check = await Feedback.exists({foodId:req.body.foodId,likes:{$in:[fromId]}});
              
              if(check){

                  feedback.likeCount--
                  var index = feedback.likes.indexOf(fromId);
                  
                  if (index >= 0) {
                    feedback.likes.splice( index, 1 );
                  }

                  await feedback.save();
                  return res.send({success:true,data:feedback});

              }

                feedback.likes.addToSet(fromId);
                feedback.likeCount++;
            }else if(req.body.types.comment){
              
                feedback.comments.addToSet({from:fromId,description:req.body.description});
                feedback.commentCount++;
            }
            
            await feedback.save();
            
            const food = await Food.findById({_id:req.body.foodId});
            food.feedback = feedback._id;

            await food.save();

            return res.send({success:true,data:{feedback,food}});
        }else{
            const feedback = new Feedback({
                foodId:req.body.foodId
            });

            if(req.body.types.like){
                feedback.likes.addToSet(fromId);
                feedback.likeCount++;
            }else if(req.body.types.comment){
                feedback.comments.addToSet({from:fromId,description:req.body.description});
                feedback.commentCount++;
            }

            await feedback.save();
            
            const food = await Food.findById({_id:req.body.foodId});
            food.feedback = feedback._id;

            await food.save();

            return res.send({success:true,data:{feedback,food}});
        }
    } catch (e) {
        res.status(500).send({success:false,message:"something went wrong",error:e});
    }

  })

module.exports = router;
