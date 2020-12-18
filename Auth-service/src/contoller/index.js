const {addConsumer,createJWT} = require('../use-case')

const makePostConsumer = require('./post-consumer');
const makePostJWT = require('./post-jwt');

const postConsumer = makePostConsumer({addConsumer});
const postJWT = makePostJWT({createJWT});

module.exports = {postConsumer,postJWT};