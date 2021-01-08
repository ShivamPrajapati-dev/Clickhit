require('dotenv').config();

const mongoose = require('mongoose');
const {
    addComment,
    editComment,
    deleteComment
} = require('./use-case')


mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
        .then(async (result)=>{
            console.log('mongodb connected');
            await addComment();
            await editComment();
            await deleteComment()
        }).catch(e=>{
            console.log(e);
        })

