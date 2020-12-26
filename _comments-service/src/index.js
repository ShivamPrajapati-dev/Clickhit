require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');


const {
    postComment,
    patchComment,
    delete_Comment,
    read_Comment
} = require('./controller')
const makeCallback = require('./express-callback');


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/getcomment', makeCallback(read_Comment));
app.post('/addcomment',makeCallback(postComment));
app.patch('/editcomment', makeCallback(patchComment));
app.delete('/deletecomment', makeCallback(delete_Comment));

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
        .then((result)=>{
            app.listen(3001,()=>{
                console.log('Server is up on port 3000');
            });
        }).catch(e=>{
            console.log(e);
        })


