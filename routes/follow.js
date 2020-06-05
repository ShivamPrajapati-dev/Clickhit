const express = require('express');
const router = express.Router();
const Follow = require('../model/follow');
const auth = require('../middleware/auth');

router.post('/addfollowee', auth, async (req,res)=>{
    
    if(!req.body.followeeId){
        return res.status(400).send({success:false,message:'provide followee id'});
    }

    const follow = new Follow({
        followerId:req.user._id,
        followeeId:req.body.followeeId
    })
    try {
        await follow.save();
        res.send({success:true,data:follow});
    } catch (e) {
        res.send({success:false,message:'something went wrong',error:e})
    }
    
});



module.exports = router;
