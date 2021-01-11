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
            app.listen(3000,()=>{
                console.log('server up on port 3000');
                calculator();
            })
        }).catch(e=>{
            console.log(e);
        })