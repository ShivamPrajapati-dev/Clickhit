const express = require('express');
const router = express.Router();
const Kitchen = require('../model/kitchen');
const Food = require('../model/food');

router.post('/savekitchen/:id', async (req,res)=>{

    const userId = req.params.id;

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


router.get('/getkitchen/:id', async (req,res)=>{
    const userId = req.params.id;

    try {

        let kitchen = await Kitchen.findOne({userId});
        if(!kitchen || Object.keys(kitchen).length == 0){
            return res.status(404).send({success:false,message:`no kitchen found with id ${userId}`})
        }
        res.send({success:true,data:kitchen})

    } catch (e) {
        res.status(500).send({success:false,message:"something went wrong",error:e});
    }
});


module.exports = router;