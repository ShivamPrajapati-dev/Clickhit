require('dotenv').config();

const mongoose = require('mongoose');
const {
    foodPostUpdater,
    quotePostUpdater,
    sketchPostUpdater
} = require('./use-case')


mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
        .then(async (result)=>{
            console.log('mongodb connected');
            await foodPostUpdater();
            await quotePostUpdater();
            await sketchPostUpdater();
        }).catch(e=>{
            console.log(e);
        })

