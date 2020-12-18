const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const {
    postConsumer,
    postJWT
} = require('./contoller');
const makeCallback = require('./express-callback');

app.post('/addconsumer', makeCallback(postConsumer));
app.post('/createjwt',makeCallback(postJWT));

app.listen(3000,()=>{
    console.log('listening on post 3000');
})