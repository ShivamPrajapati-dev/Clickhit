const express = require('express');
const router = express.Router();
const Follow = require('../model/follow');
const auth = require('../middleware/auth');

router.post('/addfollowee', auth, async (req,res)=>{
    
    if(!req.body.followeeId){
        return res.status(400).send({success:false,message:'provide followee id'});
    }

    if(!req.body.followeeImageUrl){
        return res.status(400).send({success:false,message:'provide followee image'});
    }

    if(!req.body.followeeName){
        return res.status(400).send({success:false,message:'provide followee name'});
    }

    const follow = new Follow({
        followerId:req.user._id,
        followerImageUrl:req.user.imageUrl,
        followerName:req.user.name,
        followeeId:req.body.followeeId,
        followeeImageUrl:req.body.followeeImageUrl,
        followeeName:req.body.followeeName
    })
    try {
        await follow.save();
        res.send({success:true,data:follow});
    } catch (e) {
        res.status(500).send({success:false,message:'something went wrong',error:e})
    }
    
});

router.get('/readfollowers', auth, async (req,res)=>{
    try {
        const followers = await Follow.find({followeeId:req.user._id});
        if(!followers || Object.keys(followers).length == 0){
            return res.send({success:false,message:'no followers found'})
        }
        res.send({success:true,data:followers});
    } catch (e) {
        res.status(500).send({success:false,message:'something went wrong',error:e})
    }
});

router.get('/readfollowee', auth, async (req,res)=>{
    try {
        const followees = await Follow.find({followerId:req.user._id});
        if(!followees || Object.keys(followees).length == 0){
            return res.send({success:false,message:'no followees found'})
        }
        res.send({success:true,data:followees});
    } catch (e) {
        res.status(500).send({success:false,message:'something went wrong',error:e})
    }
});



module.exports = router;
