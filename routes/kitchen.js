const express = require('express');
const auth = require('../middleware/auth');
const Kitchen = require('../model/kitchen');
const Refriderator = require('../model/refridgerator');
const Space = require('../model/space');
const router = express.Router();

router.post('/save/kitchen', auth, async (req,res)=>{
    
    const userId = req.user.userId;
    
    if(!req.body.name){
        return res.send({success:false,message:"provide kitchen name"});
    }

    try {
        const kitchen = new Kitchen({
            userId,
            name:req.body.name
        });

         kitchen.save().then((data)=>{
            res.send({success:true,data});
            return Promise.resolve({_id:data._id});
         }).then( async (data)=>{     

            const refridgerator = new Refriderator({kitchenId:data._id});
            await refridgerator.save();
            
            const space = new Space({kitchenId:data._id,fridgeId:refridgerator._id,userId});
            await space.save();
            console.log('saved');
            
         }).catch( err=> {throw err});
    } catch (e) {
        res.status(500).send({success:false,message:"somthing went wrong",error:e});
    }

});

router.get('/get/kitchen', auth, async (req,res)=>{

    try {
        const kitchen = await Kitchen.findOne({userId:req.user.userId});

        if(!kitchen || Object.keys(kitchen).length == 0){
            return res.send({success:false,message:"Kitchen not exist"})
        }
        const space = await Space.findOne({userId:req.user.userId});
        res.send({success:true,data:kitchen,space});
    } catch (e) {
        res.status(500).send({success:false,message:"somthing went wrong",error:e});  
    }

});


module.exports = router