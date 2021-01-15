require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const {
    postFollowee,
    getFollowee,
    getFollower,
    deleteFollowee,
    postTopic
} = require('./controller');

const makeExpressCallback = require('./express-callback');

app.post('/postfollowee',makeExpressCallback(postFollowee));
app.post('/getfollowee', makeExpressCallback(getFollowee));
app.post('/getfollower', makeExpressCallback(getFollower));
app.post('/topic/create', makeExpressCallback(postTopic));
app.delete('/deletefollowee', makeExpressCallback(deleteFollowee));

mongoose
    .connect(process.env.MONGO_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then((result)=>{
        app.listen(3006,()=>{
            console.log('Follow service listening on port 3006');
        })
    }).catch(e=>{
        console.log(e.message);
    })