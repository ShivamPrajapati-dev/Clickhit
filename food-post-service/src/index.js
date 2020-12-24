require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const {
    postFood,
    patchFood,
    deleteFood,
    getFood
} = require('./controller');

const makeExpressCallback = require('./express-callback');

app.post('/food/post', makeExpressCallback(postFood));   // update userfeed of followers after new posts,update and delete post
app.patch('/food/update', makeExpressCallback(patchFood));
app.delete('/food/delete',makeExpressCallback(deleteFood));
app.get('/food/get', makeExpressCallback(getFood));

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
        .then((result)=>{
            app.listen(3000,()=>{
                console.log('Food post service is up on port 3000');
            });
        }).catch(e=>{
            console.log(e);
        })

