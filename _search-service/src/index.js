require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const RSMQWorker = require('rsmq-worker');
const worker = new RSMQWorker(process.env.QUEUE_NAME);
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const {
    postData,
    postSAYT,
    patchData,
    deleteData
} = require('./controller');

const makeExpressCallback = require('./express-callback')
const makeEvent = require('./event');

//app.post('/search/data/:index', makeExpressCallback(postData));
worker.on("message",makeEvent(postData,patchData,deleteData));
app.post('/search/sayt/:index/:query', makeExpressCallback(postSAYT));   // body:{"field":"username"}
//app.patch('/search/update/:index/:id', makeExpressCallback(patchData));

app.listen(3009,()=>{
    console.log('Listening on port 3009');
    worker.start();
})