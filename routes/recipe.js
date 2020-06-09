const express = require('express');
const router = express.Router();
const Recipe = require('../model/recipe');
const auth = require('../middleware/auth');

router.post('/save/recipe/:id', auth, async (req,res)=>{

    if(!req.body.recipe){
        return res.send({success:false,message:"provide recipe details"});
    }

    if(!req.body.secret){
        return res.send({success:false,message:"provide recipe privacy"});
    }

    try {
        const recipe = new Recipe({
            userId:req.user.userId,
            foodId:req.params.id,
            recipe:req.body.recipe,
            secret:req.body.secret
        });

        await recipe.save();
        res.send({success:true});
    } catch (e) {
        res.status(500).send({success:false,message:'something went wrong',error:e})  
    }
});

router.post('/get/recipe/:id', async (req,res)=>{
   
    if(!req.body.userId){
        return res.send({success:false,message:"provide recipe privacy"});
    }

    try {
        const recipe = Recipe.findOne({userId:req.body.userId,foodId:req.params.id});
        if(!recipe || Object.keys(recipe).length == 0){
            return res.send({success:false,secret:false,message:"no recipe exist"});
        }else if(recipe.secret){
            return res.send({success:true,secret:true,message:"secret recipe"});
        }

        res.send({success:true,secret:false,data:recipe});
    } catch (e) {
        res.status(500).send({success:false,message:'something went wrong',error:e})  
    }
});

module.exports = router