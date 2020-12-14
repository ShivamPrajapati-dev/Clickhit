require('dotenv').config();
const express = require('express');
const bodyParser =require('body-parser');

const mongoose = require('mongoose');

const {
    postLike,
    removeLike,
    readLikes
} = require('./controller');

const makeCallback = require('./express-callback');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/getlikes', makeCallback(readLikes));
app.post('/addlike', makeCallback(postLike));
app.delete('/deletelike', makeCallback(removeLike));

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
        .then((result)=>{
            app.listen(3000,()=>{
                console.log('Server is up on port 3000');
            });
        }).catch(e=>{
            console.log(e);
        })

