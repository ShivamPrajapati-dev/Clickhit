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
    deleteFollowee
} = require('./controller');

const makeExpressCallback = require('./express-callback');

app.post('/follow/postfollowee',makeExpressCallback(postFollowee));
app.get('/follow/getfollowee', makeExpressCallback(getFollowee));
app.get('/follow/getfollower', makeExpressCallback(getFollower));
app.delete('/follow/deletefollowee', makeExpressCallback(deleteFollowee));

mongoose
    .connect(process.env.MONGO_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then((result)=>{
        app.listen(3000,()=>{
            console.log('Follow service listening on port 3000');
        })
    }).catch(e=>{
        console.log(e.message);
    })