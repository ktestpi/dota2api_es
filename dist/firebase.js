'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rt = exports.fs = undefined;

var _firebaseAdmin = require('firebase-admin');

var _firebaseAdmin2 = _interopRequireDefault(_firebaseAdmin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var serviceAccount;
try {
  serviceAccount = require('./dota2-api-es-firebase-admin-service-account.json');
} catch (err) {
  serviceAccount = {
    type: "service_account",
    project_id: "dota2-api-es",
    // "private_key_id": process.env.PRIVATE_KEY_ID,
    "private_key": process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
    "client_email": process.env.CLIENT_EMAIL,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://accounts.google.com/o/oauth2/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs"
  };
}

_firebaseAdmin2.default.initializeApp({
  credential: _firebaseAdmin2.default.credential.cert(serviceAccount),
  databaseURL: "https://dota2-api-es.firebaseio.com"
});

var fs = _firebaseAdmin2.default.firestore();
var rt = _firebaseAdmin2.default.database().ref();
rt.onval = function (path) {
  return rt.child(path).once('value');
};

exports.fs = fs;
exports.rt = rt;