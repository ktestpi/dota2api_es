'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rt = exports.fs = undefined;

var _firebaseAdmin = require('firebase-admin');

var _firebaseAdmin2 = _interopRequireDefault(_firebaseAdmin);

var _dota2ApiEsFirebaseAdminServiceAccount = require('./dota2-api-es-firebase-admin-service-account.json');

var _dota2ApiEsFirebaseAdminServiceAccount2 = _interopRequireDefault(_dota2ApiEsFirebaseAdminServiceAccount);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_firebaseAdmin2.default.initializeApp({
  credential: _firebaseAdmin2.default.credential.cert(_dota2ApiEsFirebaseAdminServiceAccount2.default),
  databaseURL: "https://dota2-api-es.firebaseio.com"
});

var fs = _firebaseAdmin2.default.firestore();
var rt = _firebaseAdmin2.default.database().ref();
rt.onval = function (path) {
  return rt.child(path).once('value');
};

exports.fs = fs;
exports.rt = rt;