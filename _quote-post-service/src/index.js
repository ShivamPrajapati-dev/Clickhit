require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const {v4:uuidv4} = require('uuid');
const path = require('path')
const RedisSMQ = require("rsmq");
const rsmq = new RedisSMQ( {host: "127.0.0.1", port: 6379, ns: "rsmq"} );

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const s3 =  new AWS.S3({
    accessKeyId:process.env.ID,
    secretAccessKey:process.env.SECRET,
    region:'ap-south-1'
});


const {
    postQuote,
    getQuote,
    deleteQuote,
    patchQuote,
    fileUpload
} = require('./controller')

const makeExpressCallback = require('./express-callback');
const upload = fileUpload({multer,multerS3,uuidv4,s3,path});

app.post('/quote/post', upload.single('pic'),makeExpressCallback(postQuote));
app.patch('/quote/update',upload.single('pic'), makeExpressCallback(patchQuote));
app.delete('/quote/delete',makeExpressCallback(deleteQuote));
app.post('/quote/get',makeExpressCallback(getQuote));

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
        .then((result)=>{

            rsmq.listQueues(function (err,queues){
                if(err){
                    console.log(err);
                    return;
                }
                if(queues.includes(process.env.QUEUE_NAME)){
                    app.listen(3004,()=>{
                        console.log('Food post service is up on port 3004');
                    });
                }else{
                    rsmq.createQueue({qname:process.env.QUEUE_NAME},function (err,resp){
                        if(err){
                            console.log(err);
                            return;
                        }
                        app.listen(3004,()=>{
                            console.log('Food post service is up on port 3004');
                        }); 
                    })
                }
            })

        }).catch(e=>{
            console.log(e);
        })

