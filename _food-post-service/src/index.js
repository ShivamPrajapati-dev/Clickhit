require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const RedisSMQ = require("rsmq");
const rsmq = new RedisSMQ( {host: "127.0.0.1", port: 6379, ns: "rsmq"} );

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

            rsmq.listQueues(function (err,queues){
                if(err){
                    console.log(err);
                    return;
                }
                if(queues.includes(process.env.QUEUE_NAME)){
                    app.listen(3003,()=>{
                        console.log('Food post service is up on port 3003');
                    });
                }else{
                    rsmq.createQueue({qname:process.env.QUEUE_NAME},function (err,resp){
                        if(err){
                            console.log(err);
                            return;
                        }
                        app.listen(3003,()=>{
                            console.log('Food post service is up on port 3003');
                        }); 
                    })
                }
            })

        }).catch(e=>{
            console.log(e);
        })

