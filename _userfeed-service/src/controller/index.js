const { readUserfeed } = require('../use-case');
const makeGetUserfeed = require('./get-userfeed');

const getUserfeed = makeGetUserfeed({readUserfeed});

module.exports = {getUserfeed}