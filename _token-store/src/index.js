require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const RSMQWorker = require('rsmq-worker');
const worker = new RSMQWorker(process.env.QUEUE_NAME);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const {
    postToken,
    patchTokenstore,
    removeToken,
    getTokenstore
} = require('./controller')

const makeExpressCallback = require('./express-callback');
const makeEvent = require('./events');

worker.on("message",makeEvent(postToken))                            // create tokenstore through an event
app.post('/post',makeExpressCallback(postToken));
app.post('/get',makeExpressCallback(getTokenstore));
app.patch('/update', makeExpressCallback(patchTokenstore));
app.delete('/delete', makeExpressCallback(removeToken));

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
        .then((result)=>{
            app.listen(3013,()=>{
                console.log('Server is up on port 3013');
                worker.start();
            });
        }).catch(e=>{
            console.log(e);
        })
