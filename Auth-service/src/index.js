const express = require('express');
const bodyParser = require('body-parser');
const RedisSMQ = require("rsmq");
const rsmq = new RedisSMQ( {host: "127.0.0.1", port: 6379, ns: "rsmq"} );

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const {
    postConsumer,
    postJWT,
    getConsumer
} = require('./contoller');
const makeCallback = require('./express-callback');

app.post('/addconsumer', makeCallback(rsmq,"create",process.env.QUEUE_NAME,postConsumer,postJWT));
app.post('/loginconsumer', makeCallback(rsmq,"login",process.env.QUEUE_NAME,getConsumer,postJWT));


rsmq.listQueues(function (err,queues){
    if(err){
        console.log(err);
        return;
    }
    if(queues.includes(process.env.QUEUE_NAME)){
        app.listen(3000,()=>{
            console.log('Auth service listening on post 3000');
        }) 
    }else{
        rsmq.createQueue({qname:process.env.QUEUE_NAME},function (err,resp){
            if(err){
                console.log(err);
                return;
            }
            app.listen(3000,()=>{
                console.log('Auth service listening on post 3000');
            }) 
        })
    }
})




