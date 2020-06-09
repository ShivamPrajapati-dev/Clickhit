const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Comment = require('../model/comment');

router.post('/addcomment/:id', auth,async (req,res)=>{
    const activityId = req.params.id;
    if(!req.body.text){
        return res.send({success:false,message:"provide comment text"})
    }

    try {
        const comment = new Comment({
            name:req.user.name,
            userId:req.user.userId,
            imageUrl:req.user.userId,
            text:req.body.text,
            activityId       
        });

        await comment.save();
        res.send({success:false,data:comment});
    } catch (e) {
        res.status(500).send({success:false,message:"Something went wrong", error:e});
    }
});

router.post('/getcomments/:id', auth, (req,res)=>{
    const activityId = req.params.id;
    try {
        const comments = await Comment.find({activityId});
        if(!comments){
            return res.send({success:false,message:"no comments found"});
        }
        res.send({success:false,data:comments});
    } catch (e) {
        res.status(500).send({success:false,message:"Something went wrong", error:e}); 
    }
});


module.exports = router;