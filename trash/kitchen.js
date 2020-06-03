const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Kitchen = require('../model/kitchen');

router.post('/savekitchen', auth,async (req,res)=>{

    const userId = req.user.userId;

    if(!req.body.name){
        return res.status(400).send({success:false,message:"provide kitchen name"})
    }

    try {
        const kitchen = new Kitchen({
            userId,
            ...req.body
        });

        await kitchen.save();
        return res.send({success:true,data:kitchen});
    } catch (e) {
        res.status(500).send({success:false,message:"something went wrong",error:e});   
    }
    
});


router.get('/getkitchen', auth,async (req,res)=>{
    const userId = req.user.userId;

    try {

        let kitchen = await Kitchen.find({userId});
        if(!kitchen || Object.keys(kitchen).length == 0){
            return res.status(404).send({success:false,message:`no kitchen found with id ${userId}`})
        }
        res.send({success:true,data:kitchen})

    } catch (e) {
        res.status(500).send({success:false,message:"something went wrong",error:e});
    }
});

router.get('/getallkitchen', auth, async (req,res)=>{

    try {

        let kitchen = await Kitchen.find({});
        if(!kitchen || Object.keys(kitchen).length == 0){
            return res.status(404).send({success:false,message:`no kitchen found `})
        }
        res.send({success:true,data:kitchen})

    } catch (e) {
        res.status(500).send({success:false,message:"something went wrong",error:e});
    }
});

router.post('/updatekitcheninfo/:id', auth,async (req,res)=>{
    const _id = req.params.id;
    
    if(!req.body){
        return res.status(400).send({success:false,message:"provide updates"});
    }
    
    const validUpdates = ['name'];
    const updates = Object.keys(req.body);

    const isValidOperation = updates.every((update)=>{
     
         return validUpdates.includes(update);
    });

    if(!isValidOperation){
        return res.send({success:false,message:"invalid updates"});
    }
    try {
        const kitchen = await Kitchen.findOne({_id});

        if(!kitchen || Object.keys(kitchen).length == 0){
            return res.status(404).send({success:false,message:"kitchen not found"});
        }
        updates.forEach((update)=>{
            kitchen[update] = req.body[update];
        });

        await kitchen.save();
        res.send({success:true,data:kitchen});
    } catch (e) {
        res.status(500).send({success:false,message:"something went wrong",error:e});

    }
});




module.exports = router;