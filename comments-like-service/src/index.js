require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');


const {
    postComment
} = require('./controller/index')
const makeCallback = require('./express-callback');


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/addcomment',makeCallback(postComment));

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
        .then((result)=>{
            app.listen(3000,()=>{
                console.log('Server is up on port 3000');
            });
        }).catch(e=>{
            console.log(e);
        })


