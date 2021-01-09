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

app.post('/follow/postfollowee',makeExpressCallback(postFollowee));
app.post('/follow/getfollowee', makeExpressCallback(getFollowee));
app.post('/follow/getfollower', makeExpressCallback(getFollower));
app.post('/topic/create', makeExpressCallback(postTopic));
app.delete('/follow/deletefollowee', makeExpressCallback(deleteFollowee));

mongoose
    .connect(process.env.MONGO_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then((result)=>{
        app.listen(3002,()=>{
            console.log('Follow service listening on port 3002');
        })
    }).catch(e=>{
        console.log(e.message);
    })