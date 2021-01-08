require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose')
const app = express();

const {
    like_aggregator,
    comment_aggregator
} = require('./use-case')


mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
        .then((result)=>{
            app.listen(3000,()=>{
                console.log('server up on port 3000');
                like_aggregator()
                comment_aggregator()
            })
        }).catch(e=>{
            console.log(e);
        })