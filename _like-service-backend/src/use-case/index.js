const { subscribe } = require('../subscriber');
const Like = require('../model/likes');
const TempLike =require('../model/temp-likes')

const makePermanentStorageUpdater = require('./permanent-storage-updater');
const makeTemporaryStorageUpdater = require('./temp-storage-updater');

const permanentStorageUpdater = makePermanentStorageUpdater({Like, subscribe});
const temporaryStorageUpdater = makeTemporaryStorageUpdater({TempLike,subscribe});

module.exports = { permanentStorageUpdater, temporaryStorageUpdater }