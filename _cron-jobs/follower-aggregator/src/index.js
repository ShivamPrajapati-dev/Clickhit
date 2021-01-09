require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose')
const app = express();

const {
    aggregate
} = require('./use-case')


mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
        .then((result)=>{
            app.listen(3000,()=>{
                console.log('server up on port 3000');
                aggregate()
            })
        }).catch(e=>{
            console.log(e);
        })