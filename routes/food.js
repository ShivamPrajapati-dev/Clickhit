const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const path = require('path');
const Food = require('../model/food');
const Kitchen = require('../model/kitchen');

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

  router.post('/addfood/:id',upload.single('pic'), async (req,res)=>{
      const userId = req.params.id;

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

        res.send({success:true,data:{food,kitchen}})
      } catch (e) {
        res.status(500).send({success:false,message:"something went wrong",error:e});
      }
  });


module.exports = router;
