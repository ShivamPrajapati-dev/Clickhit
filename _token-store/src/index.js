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
app.post('/tokenstore/post',makeExpressCallback(postToken));
app.post('/tokenstore/get',makeExpressCallback(getTokenstore));
app.patch('/tokenstore/update', makeExpressCallback(patchTokenstore));
app.delete('/tokenstore/delete', makeExpressCallback(removeToken));

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
        .then((result)=>{
            app.listen(3009,()=>{
                console.log('Server is up on port 3009');
                worker.start();
            });
        }).catch(e=>{
            console.log(e);
        })
