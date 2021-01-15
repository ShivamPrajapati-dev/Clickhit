require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const {v4:uuidv4} = require('uuid');
const path = require('path')


const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const s3 =  new AWS.S3({
    accessKeyId:process.env.ID,
    secretAccessKey:process.env.SECRET,
    region:'ap-south-1'
});


const {
    postFood,
    patchFood,
    deleteFood,
    getFood,
    fileUpload
} = require('./controller');

const makeExpressCallback = require('./express-callback');
const upload = fileUpload({multer,multerS3,uuidv4,s3,path});

app.post('/post', upload.single('pic'), makeExpressCallback(postFood));   // update userfeed of followers after new posts,update and delete post
app.patch('/update',upload.single('pic'), makeExpressCallback(patchFood));
app.delete('/delete',makeExpressCallback(deleteFood));
app.post('/get', makeExpressCallback(getFood));

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
        .then((result)=>{

            app.listen(3007,()=>{
                console.log('Food post service is up on port 3007');
            }); 
        }).catch(e=>{
            console.log(e);
        })

