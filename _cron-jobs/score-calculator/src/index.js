require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose')
const app = express();

const {
    calculator
} = require('./use-case')


mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
        .then((result)=>{
            app.listen(3005,()=>{
                console.log('server up on port 3005');
                calculator();
            })
        }).catch(e=>{
            console.log(e);
        })