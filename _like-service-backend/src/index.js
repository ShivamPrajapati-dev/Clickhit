require('dotenv').config();

const mongoose = require('mongoose');
const {
    permanentStorageUpdater,
    temporaryStorageUpdater
} = require('./use-case')


mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
        .then(async (result)=>{
            console.log('mongodb connected');
            await permanentStorageUpdater();
            await temporaryStorageUpdater();
        }).catch(e=>{
            console.log(e);
        })

