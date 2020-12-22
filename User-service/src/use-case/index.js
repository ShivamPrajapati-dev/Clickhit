const User = require('../model/user');

const makeAddUser = require('./add-user');
const makeEditUser = require('./edit-user');
const makeDeleteToken = require('./delete-token');

const addUser = makeAddUser({User});
const editUser = makeEditUser({User});
const deleteToken = makeDeleteToken({User});

module.exports = {addUser,editUser, deleteToken};