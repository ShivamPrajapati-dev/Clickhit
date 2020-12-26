const {addConsumer,createJWT, loginConsumer, logoutConsumer} = require('../use-case')

const makePostConsumer = require('./post-consumer');
const makePostJWT = require('./post-jwt');
const makeGetConsumer = require('./get-consumer');
const makeDeleteConsumer = require('./delete-consumer');

const postConsumer = makePostConsumer({addConsumer});
const postJWT = makePostJWT({createJWT});
const getConsumer = makeGetConsumer({loginConsumer});
const deleteConsumer = makeDeleteConsumer({logoutConsumer});

module.exports = {postConsumer, postJWT, getConsumer, deleteConsumer};