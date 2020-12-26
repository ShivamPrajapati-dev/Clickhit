require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const RSMQWorker = require('rsmq-worker');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const {v4:uuidv4} = require('uuid');
const path = require('path');
const redis = require('redis');
const cache = redis.createClient();

const worker = new RSMQWorker(process.env.QUEUE_NAME);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const s3 =  new AWS.S3({
    accessKeyId: process.env.ID,
    secretAccessKey: process.env.SECRET,
    region:'ap-south-1'
});


const{
    postUser,
    patchUser,
    deleteUserToken,
    fileUpload,
    getUser
} = require('./controller');


const upload = fileUpload({multer,multerS3,uuidv4,s3,path});
const makeExpressCallback = require('./express-callback');
const makeEvent = require('./events');
const makeCacheMiddleware = require('./middleware/cache');

worker.on("message",makeEvent(postUser,patchUser,deleteUserToken));
app.post('/adduser',makeExpressCallback(postUser));
app.patch('/updateuser', upload.single('pic'),makeExpressCallback(patchUser));
app.get('/getuser',makeCacheMiddleware(cache),makeExpressCallback(getUser));


mongoose
    .connect(process.env.MONGO_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
        .then(result=>{
            app.listen(3007,()=>{
                console.log('User service listening on port 3001');
                worker.start();
            })
            
        })
          .catch(e=>{
              console.log(e.message);
          })
