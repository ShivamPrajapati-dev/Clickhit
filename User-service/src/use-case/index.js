const User = require('../model/user');

const makeAddUser = require('./add-user');
const makeEditUser = require('./edit-user');

const addUser = makeAddUser({User});
const editUser = makeEditUser({User});

module.exports = {addUser,editUser};