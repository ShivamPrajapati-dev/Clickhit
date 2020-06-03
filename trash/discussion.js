const express = require('express');
const router = express.Router();
const Discussion = require('../model/discussion');

router.post('/addquestion/:id', async (req,res)=>{
    const userId = req.params.id;

    if(!req.body.question){
        return res.status(400).send({success:false,message:"provide question"});
    }

    try {
        const discussion = new Discussion({
            userId,
            question:req.body.question
        });

        await discussion.save();
        res.send({success:true,data:discussion});
    } catch (e) {
        res.status(500).send({success:false,message:"something went wrong", error:e});
    }
});

router.post('/answer/:id', async (req,res)=>{
    
    const quesId = req.params.id;

    if(!req.body.userId){
        return res.status(400).send({success:false,message:"provide user id of answerer"});
    }

    try {
        
        let discussion = await Discussion.findOne({_id:quesId});
        
        let answer = {
            userId:req.body.userId,
            date:Date.now(),
            response:req.body.response
        };

        discussion.answers.push(answer);
        await discussion.save();
        res.send({success:true,data:discussion});
    
    } catch (e) {
        res.status(500).send({success:false,message:"something went wrong", error:e}); 
    }

});

router.post('/acceptanswer/:id', async (req,res)=>{
    const answerId = req.params.id;

    try {
        let discussion = await Discussion.findOne({_id:req.body.quesId}).select({answers:{$elemMatch:{_id:answerId}}});
        
        discussion.answers[0].accepted = !discussion.answers[0].accepted;
        await discussion.save();
        res.send({success:false,data:discussion});
    } catch (e) {
        res.status(500).send({success:false,message:"something went wrong", error:e}); 
    }
});


module.exports = router;