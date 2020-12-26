const { addFollowee, readFollowee, readFollower, removeFollowee} = require('../use-case');

const makePostFollowee = require('./post-followee');
const makeGetFollowee = require('./get-followee');
const makeGetFollower = require('./get-follower');
const makeDeleteFollowee = require('./delete-followee');

const postFollowee = makePostFollowee({addFollowee});
const getFollowee = makeGetFollowee({readFollowee});
const getFollower = makeGetFollower({readFollower});
const deleteFollowee = makeDeleteFollowee({removeFollowee});

module.exports = {postFollowee, getFollowee, getFollower, deleteFollowee};