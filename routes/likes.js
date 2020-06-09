const express = require('express');
const auth = require('../middleware/auth');
const Like = require('../model/likes');
const Activity = require('../model/activity');
const router = express.Router();

router.post('/addlike/:id', auth, async (req,res)=>{
    const _id = req.params.id;

    if(!req.body.type){
        return res.send({success:false,message:'provide like type'});
    }

    try {
        const like = await Like.findOne({activityId:_id,userId:req.user.userId});
        const activity = await Activity.findOne({activityId:_id});
        if(like){
            like.active = !like.active;
            activity.likes -- ;
        }else{
            const like = new Like({
                userId:req.user.userId,
                activityId:_id,
                active:true,
                type:req.body.type
            });
            activity.likes ++ ;
            await like.save();
            return res.send();
        }
    } catch (e) {
        res.status(500).send({success:false,message:"somthing went wrong",error:e});
    }

});

router.post('/getlikes/:id', async (req,res)=>{
    const activityId = req.params.id; 

    try {
        const activity = await Activity.find({activityId});
        if(!activity){
            return res.send({success:false,message:"no post history found"});
        }
        res.send({success:true,data:activity});
    } catch (e) {
        res.status(500).send({success:false,message:"somthing went wrong",error:e});   
    }
})

module.exports = router;