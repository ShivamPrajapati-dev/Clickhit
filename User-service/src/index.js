require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const RSMQWorker = require('rsmq-worker');
const worker = new RSMQWorker(process.env.QUEUE_NAME);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const{
    postUser,
    patchUser,
    deleteUserToken
} = require('./controller');

const makeExpressCallback = require('./express-callback');
const makeEvent = require('./events');

worker.on("message",makeEvent(postUser,patchUser,deleteUserToken));
app.post('/adduser',makeExpressCallback(postUser));
app.patch('/updateuser', makeExpressCallback(patchUser));

mongoose
    .connect(process.env.MONGO_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
        .then(result=>{
            app.listen(3001,()=>{
                console.log('User service listening on port 3001');
                worker.start();
            })
            
        })
          .catch(e=>{
              console.log(e.message);
          })
