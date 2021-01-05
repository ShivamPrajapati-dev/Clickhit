
var admin = require("firebase-admin");

var serviceAccount = require('../credentials.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const BuildMakeIndividualMSG = require('./individual-msg');
const BuildMakePromotionalMSG = require('./promotional-msg');

const makeIndividualMSG = BuildMakeIndividualMSG({admin});
const makePromotionalMSG = BuildMakePromotionalMSG({admin});

module.exports = { makeIndividualMSG, makePromotionalMSG };