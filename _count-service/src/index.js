require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const {
    postCommentLikeCount,
    postLikeCount
} = require('./controller')

const makeExpressCallback = require('./express-callback');

app.post('/likes',makeExpressCallback(postLikeCount));
app.post('/comments', makeExpressCallback(postCommentLikeCount));


mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
        .then((result)=>{
            app.listen(3002,()=>{
                console.log('Server is up on port 3002');
            });
        }).catch(e=>{
            console.log(e);
        })
