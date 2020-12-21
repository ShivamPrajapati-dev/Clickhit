require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const{
    postUser,
    patchUser
} = require('./controller');

const makeExpressCallback = require('./express-callback');

app.post('/adduser',makeExpressCallback(postUser));
app.patch('/updateuser', makeExpressCallback(patchUser));

mongoose
    .connect(process.env.MONGO_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
        .then(result=>{
            app.listen(3000,()=>{
                console.log('listening on port 3000');
            })
        })
          .catch(e=>{
              console.log(e.message);
          })
