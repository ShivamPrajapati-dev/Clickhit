require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const RSMQWorker = require('rsmq-worker');
const redis = require('redis');
const { promisify } = require('util');
const axios = require('axios');

const worker = new RSMQWorker(process.env.QUEUE_NAME);
const cache = redis.createClient();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const {
    getUserfeed
} = require('./controller');

const makeEvent = require('./events');
const makeExpressCallback = require('./express-callback');

worker.on("message", makeEvent(cache,promisify,axios,process.env.FOLLOW_URL));
app.post('/get', makeExpressCallback(getUserfeed));

app.listen(3015, ()=>{
    console.log('userfeed service up on port 3015');
    worker.start();
});