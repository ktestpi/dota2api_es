'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// const test = {val : true}
// const test_ = {val : false}
// console.log({id:0, ...(5>4? test : test_)});
exports.default = {
  Query: {
    player: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, args, _ref) {
        var fs = _ref.fs,
            rt = _ref.rt;

        var _ref3, err, data;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return awtc(fs.collection('players').doc(args.id + '').get());

              case 2:
                _ref3 = _context.sent;
                err = _ref3.err;
                data = _ref3.data;

                if (err) {
                  _error('Error en la base de datos');
                }
                if (!data.exists) {
                  _error('Jugador con id ' + args.id + ' no encontrado');
                }
                return _context.abrupt('return', _extends({ id: args.id }, data.data()));

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      function player(_x, _x2, _x3) {
        return _ref2.apply(this, arguments);
      }

      return player;
    }(),
    match: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(parent, args, _ref4) {
        var fs = _ref4.fs,
            rt = _ref4.rt;
        var matchLeague, matchInfo, match, playersID, promises, players;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return awtc(rt.onval('matches/' + args.id));

              case 2:
                matchLeague = _context2.sent;

                if (matchLeague.err) {
                  _error('Error en la base de datos');
                }
                if (!matchLeague.data.exists()) {
                  _error('Partida con id ' + args.id + ' no encontrada');
                }
                //Carga la partida de la liga a la que pertenece
                _context2.next = 7;
                return awtc(fs.collection('leagues').doc(matchLeague.data.val() + '').collection('matches').doc(args.id + '').get());

              case 7:
                matchInfo = _context2.sent;

                if (matchInfo.err) {
                  _error('Error en la base de datos');
                }
                if (!matchInfo.data.exists) {
                  _error('Partida con id ' + args.id + ' no encontrada en liga ' + matchLeague.data.val());
                }
                //match = objeto a devolver de la partida
                match = _extends({ id: args.id + '' }, matchInfo.data.data());
                // console.log('matchInfo',match);

                playersID = match.players.map(function (player) {
                  return player.id ? player.id : 0;
                });
                promises = playersID.map(function (player) {
                  return player ? _getPlayer(fs, player) : 0;
                });
                _context2.next = 15;
                return awtc(Promise.all(promises));

              case 15:
                players = _context2.sent;

                if (players.err) {
                  _error('Error en la base de datos');
                }
                match.players = match.players.map(function (player, i) {
                  return _extends({}, player, { player: _extends({ id: player.id }, player.id !== 0 ? players.data[i].data() : _createPlayer()) });
                });
                // console.log(match.players);
                // console.log('radiant_win',match.radiant_win);
                // for (var i = 0; i < players.data.length; i++) {
                // }
                return _context2.abrupt('return', match);

              case 19:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, undefined);
      }));

      function match(_x4, _x5, _x6) {
        return _ref5.apply(this, arguments);
      }

      return match;
    }(),
    team: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(parent, args, _ref6) {
        var fs = _ref6.fs,
            rt = _ref6.rt;

        var _ref8, err, data;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return awtc(fs.collection('teams').doc(args.id + '').get());

              case 2:
                _ref8 = _context3.sent;
                err = _ref8.err;
                data = _ref8.data;

                if (err) {
                  _error('Error en la base de datos');
                }
                if (!data.exists) {
                  _error('El equipo con id ' + args.id + ' no se encuentra');
                }
                return _context3.abrupt('return', _extends({ id: args.id }, data.data()));

              case 8:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, undefined);
      }));

      function team(_x7, _x8, _x9) {
        return _ref7.apply(this, arguments);
      }

      return team;
    }(),
    league: function () {
      var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(parent, args, _ref9) {
        var fs = _ref9.fs,
            rt = _ref9.rt;

        var leagueInfo, league, matchesCollection, players_league, promisesPlayers, playersID_league, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, player, players;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return awtc(fs.collection('leagues').doc(args.id.toString()).get());

              case 2:
                leagueInfo = _context4.sent;

                if (leagueInfo.err) {
                  _error('Error en la base de datos');
                }
                if (!leagueInfo.data.exists) {
                  _error('La liga con id ' + args.id + ' no se encuentra');
                }
                league = _extends({ id: args.id }, leagueInfo.data.data());
                _context4.next = 8;
                return awtc(fs.collection('leagues').doc(args.id + '').collection('matches').get());

              case 8:
                matchesCollection = _context4.sent;

                if (matchesCollection.err) {
                  _error('Error en la base de datos');
                }
                // if(!matchesCollection.data.exists){_error(`Las partidas de la liga con id ${args.id} no se encuentran`)}
                league.matches = [];
                players_league = new Set();

                matchesCollection.data.forEach(function (matchCol) {
                  league.matches.push(_extends({ id: matchCol.id }, matchCol.data()));
                  matchCol.data().players.map(function (player) {
                    if (player.id) {
                      players_league.add(player.id);
                    }
                  });
                });
                if (!players_league.size) {
                  _error('No hay jugadores en los equipos');
                }
                console.log('SIZE PLAYERS LEAGUE', players_league.size);
                promisesPlayers = [];
                playersID_league = [];
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context4.prev = 20;

                for (_iterator = players_league.values()[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  player = _step.value;

                  playersID_league.push(player);
                  promisesPlayers.push(fs.collection('players').doc(player + '').get());
                }
                _context4.next = 28;
                break;

              case 24:
                _context4.prev = 24;
                _context4.t0 = _context4['catch'](20);
                _didIteratorError = true;
                _iteratorError = _context4.t0;

              case 28:
                _context4.prev = 28;
                _context4.prev = 29;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 31:
                _context4.prev = 31;

                if (!_didIteratorError) {
                  _context4.next = 34;
                  break;
                }

                throw _iteratorError;

              case 34:
                return _context4.finish(31);

              case 35:
                return _context4.finish(28);

              case 36:
                _context4.next = 38;
                return awtc(Promise.all(promisesPlayers));

              case 38:
                players = _context4.sent;

                if (players.err) {
                  _error('Error en la base de datos');
                }
                players = players.data.map(function (player, i) {
                  return _extends({ id: playersID_league[i] }, player.data());
                });
                league.matches = league.matches.map(function (match) {
                  return _extends({}, match, {
                    players: match.players.map(function (player) {
                      return _extends({}, player, { player: player.id ? players.find(function (p) {
                          return p.id === player.id;
                        }) : _createPlayer() });
                    }) });
                });
                return _context4.abrupt('return', league);

              case 43:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, undefined, [[20, 24, 28, 36], [29,, 31, 35]]);
      }));

      function league(_x10, _x11, _x12) {
        return _ref10.apply(this, arguments);
      }

      return league;
    }()
  }
};


function _getPlayer(db, player) {
  return db.collection('players').doc(player.toString()).get();
}

function _createPlayer() {
  return _defineProperty({ id: 0, name: 'Desconocid@', url: '0', avatar: '0', rank: 0, rankdb: 0 }, 'avatar', 't');
}

function _cerror(err, message) {
  console.log(err);throw new Error(message);
}

function _error(message) {
  throw new Error(message);
}

Promise.props = function (props) {
  return Promise.all(Object.keys(props).map(function (key) {
    // ok with val, func, prom?
    return Promise.resolve(props[key]).then(function (res) {
      var one = {};
      one[key] = res;
      return one;
    });
  })).then(function (arr) {
    return arr.reduce(function (memo, oneRes) {
      var key = Object.keys(oneRes)[0];
      memo[key] = oneRes[key];
      return memo;
    }, {});
  });
};

var awtc = function awtc(promise) {
  return promise.then(function (data) {
    return { err: null, data: data };
  }).catch(function (err) {
    return Promise.resolve({ err: err, data: null });
  });
};

// then.catch
// player : (parent, args, { fs, rt }) => {
//   console.log(args);
//   return fs.collection('players').doc(args.id.toString()).get().then(snap => {
//     console.log(snap.data());
//     if(!snap.exists){throw new Error('Jugador/a no encontrad@')}
//     const result = Object.assign({id : args.id},snap.data())
//     console.log(result);
//     return result
//   }).catch(err => {
//     console.log(err)
//     throw new Error('Ocurrió un error con la base de datos')
//   })
// },
//
// return rt.onval(`matches/${args.id}`).then(snap => {
//   if(!snap.exists()){ throw new Error('Liga no encontrada para la Partida')}
//   return fs.collection('leagues').doc(snap.val().toString()).collection('matches').doc(args.id).get().then(shot => {
//     if(!shot.exists){throw new Error(`Partida no encontrada en la liga ${snap.val()}`)}
//     console.log(shot.data());
//     const playersID = shot.data().players.map(player => player.id ? player.id : 0)
//     const promises = playersID.map(player => player ? _getPlayer(fs,player) : 0)
//     return Promise.all(promises).then(p => {
//       let result = Object.assign({id: args.id},shot.data())
//       for (var i = 0; i < p.length; i++) {
//         const infoPlayer = Object.assign({id : playersID[i]},p[i].data())
//         console.log(infoPlayer);
//         result.players[i].player =  p[i] !== 0 ? infoPlayer : _createPlayer()
//       }
//       // console.log(result.players);
//       return result
//     }).catch(err => {
//       console.log(err);
//       throw new Error('Error al obtener l@s jugaodores de la partida')
//     })
//     // return Object.assign({id: args.id},shot.data())
//   }).catch(err => {
//     console.log(err);
//     throw new Error('Error al obtener la partida de la liga')
//   })
// }).catch(err => {
//   console.log(err);
//   throw new Error('Error al comprobar la liga de la partida')
// })

// return fs.collection('leagues').doc(args.id.toString()).get().then(snap => {
//   if(!snap.exists){_error(`La liga con id ${args.id} no existe`)}
//   return fs.collection('leagues').doc(args.id.toString()).collection('matches').get().then(_matches => {
//     // console.log('MATCHES',_matches.docs);
//     // if(!_matches.exists){_error(`No se encuentran las partidas para la liga con id ${args.id}`)}
//     let league = snap.data()
//     league.id = args.id
//     // league.matches = []
//     let players_league = new Set()
//     let matches = []
//     return new Promise((res,rej) => {
//       _matches.forEach(_match => {
//         // console.log(_match);
//         matches.push(Object.assign({id : _match.id},_match.data()))
//         _match.data().players.map(player => player.id ? players_league.add(player.id) : null)
//       })
//       // console.log(players_league);
//       if(!players_league.size){_error('No hay jugadores en los equipos')}
//       let promises = []
//       let playersID_league = []
//       for (player of players_league.values()) {
//         playersID_league.push(player)
//         promises.push(fs.collection('players').doc(player.toString()).get())
//       }
//       console.log('PROMISES',promises.length);
//       return Promise.all(promises).then(_players => {
//         // console.log(_players);
//         let players = _players.map((player,i) => Object.assign({id : playersID_league[i]},player.data()))
//         // console.log(players);
//         league.matches = matches.map(match => {
//           // console.log(match.id);
//           match.players = match.players.map(player => Object.assign(player,{player : player.id ? players.find(p => p.id === player.id) : _createPlayer()}))
//           return match
//         })
//         league.matches.map(mt => mt.players.map(pl => console.log(mt.id,pl.name)))
//         // console.log(league);
//         res(league)
//       })
//     }).then(league => league)
//   })
// })