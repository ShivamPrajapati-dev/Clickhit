const { createNotification, createTopic } = require('../use-case');

const makePostNotification = require('./post-noitfication');
const makePostTopic = require('./post-topic');

const postNotification =makePostNotification({createNotification});
const postTopic = makePostTopic({createTopic});

module.exports = { postNotification, postTopic };