const { addFollowee, readFollowee, readFollower, removeFollowee, createTopic} = require('../use-case');

const makePostFollowee = require('./post-followee');
const makeGetFollowee = require('./get-followee');
const makeGetFollower = require('./get-follower');
const makeDeleteFollowee = require('./delete-followee');
const makePostTopic = require('./post-topic');

const postFollowee = makePostFollowee({addFollowee});
const getFollowee = makeGetFollowee({readFollowee});
const getFollower = makeGetFollower({readFollower});
const deleteFollowee = makeDeleteFollowee({removeFollowee});
const postTopic = makePostTopic({createTopic})

module.exports = {postFollowee, getFollowee, getFollower, deleteFollowee, postTopic};