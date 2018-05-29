'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _firebase = require('./firebase.js');

var _apolloServerExpress = require('apollo-server-express');

var _graphql = require('./graphql');

var _graphql2 = _interopRequireDefault(_graphql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const express = require('express')
var app = (0, _express2.default)();

app.set('PORT', process.env.PORT || 3000);

app.use('/api', _express2.default.json(), (0, _apolloServerExpress.graphqlExpress)({
  schema: _graphql2.default,
  context: { fs: _firebase.fs, rt: _firebase.rt }
}));

app.use('/apigql', (0, _apolloServerExpress.graphiqlExpress)({
  endpointURL: '/api'
}));

app.listen(app.get('PORT'), function () {
  console.log('Servidor conectado en puerto', app.get('PORT'));
});