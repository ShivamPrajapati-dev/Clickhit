const Follow = require('../model/follow');

const makeAddFollowee = require('./add-followee');
const makeReadFollowee = require('./read-followee');
const makeReadFollower = require('./read-follower');
const makeRemoveFollowee = require('./remove-followee');

const addFollowee = makeAddFollowee({Follow});
const readFollowee = makeReadFollowee({Follow});
const readFollower = makeReadFollower({Follow});
const removeFollowee = makeRemoveFollowee({Follow});

module.exports = {addFollowee, readFollowee, readFollower, removeFollowee};