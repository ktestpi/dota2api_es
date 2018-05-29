'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphqlTools = require('graphql-tools');

var _schemas = require('./schemas.js');

var _schemas2 = _interopRequireDefault(_schemas);

var _resolvers = require('./resolvers.js');

var _resolvers2 = _interopRequireDefault(_resolvers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _graphqlTools.makeExecutableSchema)({
  typeDefs: _schemas2.default,
  resolvers: _resolvers2.default
});


console.log('testing');