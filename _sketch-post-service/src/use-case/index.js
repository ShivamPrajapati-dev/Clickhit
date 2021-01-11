const {Kafka} = require("kafkajs")
const mongoose = require('mongoose')
const kafka = new Kafka({
    "clientId": "clickhit",
    "brokers" :["shivam:9092"]
})

const Sketch = mongoose.model('sketch', new mongoose.Schema());

const makeAddSketch = require('./add-sketch');
const makeEditSketch = require('./edit-sketch');
const makeRemoveSketch = require('./remove-sketch');
const makeGetSketch = require('./get-sketch');
const makeFileUpload = require('./file-upload');

const addSketch = makeAddSketch({kafka});
const editSketch = makeEditSketch({kafka});
const removeSketch = makeRemoveSketch({kafka});
const readSketch = makeGetSketch({Sketch});
const fileUpload = makeFileUpload();

module.exports = {addSketch, editSketch, removeSketch, readSketch, fileUpload};