require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const {
    postNotification,
    postTopic
} = require('./controller')

const makeExpressCallback = require('./express-callback');

app.post('/notification/post',makeExpressCallback(postNotification));
app.post('/notification/topic/post',makeExpressCallback(postTopic));

app.listen(3011,()=>{
    console.log('Server up on port 3011');
})