const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const NewFood = require('../model/new-food');
const Food = require('../model/food');

router.get('/getposts', auth, async (req,res)=>{
    try {
        const newFood = await NewFood.find({});
        if(!newFood || Object.keys(newFood).length == 0){
            return res.send({success:false,message:'no new post found'});
        }
        let posts = [];
        newFood.newFood.forEach(async (foodId)=>{
            const food = await Food.findOne({_id:foodId});
            posts.push(food);
        });

        res.send({success:true,data:posts});

    } catch (e) {
        res.status(500).send({success:false,message:"something went wrong", error:e})
    }
});

module.exports = router;