const makeAddConsumer = require('./add-consumer');
const makeCreteJWT = require('./create-jwt');
const makeLoginConsumer = require('./login-consumer');

const axios = require('axios');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const consumer_url = process.env.CONSUMER_URL;
const jwt_url = process.env.JWT_URL;

const addConsumer = makeAddConsumer({axios,consumer_url});
const createJWT = makeCreteJWT({axios,jwt,jwt_url});
const loginConsumer = makeLoginConsumer({axios,consumer_url});

module.exports = {addConsumer,createJWT, loginConsumer};