require('dotenv').config();
const express = require('express');
const bodyParser =require('body-parser');

const {
    postLike,
    removeLike,
    readLikes,
    postTopic
} = require('./controller');

const makeCallback = require('./express-callback');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.post('/getlikes', makeCallback(readLikes));
app.post('/topic/create', makeCallback(postTopic));     // admin API
app.post('/addlike', makeCallback(postLike));
app.delete('/deletelike', makeCallback(removeLike));

app.listen(3004,()=>{
    console.log('Server is up on port 3004');
});
