const { subscribe } = require('../subscribe')
const Follow = require('../model/follow');
const TempFollow = require('../model/temp-follow');

const makePermanentStorageUpdater = require('./permanent-storage-updater');
const makeTemporaryStorageUpdater = require('./temporary-storage-updater');

const permanentStorageUpdater = makePermanentStorageUpdater({Follow, subscribe});
const temporaryStorageUpdater = makeTemporaryStorageUpdater({TempFollow,subscribe});

module.exports = { permanentStorageUpdater, temporaryStorageUpdater };