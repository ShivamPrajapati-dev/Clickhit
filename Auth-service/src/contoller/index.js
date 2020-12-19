const {addConsumer,createJWT, loginConsumer} = require('../use-case')

const makePostConsumer = require('./post-consumer');
const makePostJWT = require('./post-jwt');
const makeGetConsumer = require('./get-consumer');

const postConsumer = makePostConsumer({addConsumer});
const postJWT = makePostJWT({createJWT});
const getConsumer = makeGetConsumer({loginConsumer});

module.exports = {postConsumer,postJWT, getConsumer};