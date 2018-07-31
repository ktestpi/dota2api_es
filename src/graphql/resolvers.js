
export default {
  Query : {
    player : async (parent, args, { fs, rt }) => {
      const {err, data} = await awtc(fs.collection('players').doc(args.id+'').get())
      if(err){_error('Error en la base de datos')}
      if(!data.exists){_error(`Jugador con id ${args.id} no encontrado`)}
      return {id : args.id,...data.data()}
    },
    match : async (parent, args, { fs, rt }) => {
      //Comprueba la liga a la que pertenece la partida
      const matchLeague = await awtc(rt.onval(`matches/${args.id}`))
      if(matchLeague.err){_error('Error en la base de datos')}
      if(!matchLeague.data.exists()){_error(`Partida con id ${args.id} no encontrada`)}

      //Carga la partida de la liga a la que pertenece
      const matchInfo = await awtc(fs.collection('leagues').doc(matchLeague.data.val()+'').collection('matches').doc(args.id+'').get())
      if(matchInfo.err){_error('Error en la base de datos')}
      if(!matchInfo.data.exists){_error(`Partida con id ${args.id} no encontrada en liga ${matchLeague.data.val()}`)}

      //match = objeto a devolver de la partida
      let match = {id : args.id+'', ...matchInfo.data.data()}
      const playersID = match.players.map(player => player.id ? player.id : 0)
      const promises = playersID.map(player => player ? _getPlayer(fs,player) : 0)

      const players = await awtc(Promise.all(promises))
      if(players.err){_error('Error en la base de datos')}
      match.players = match.players.map((player,i) => ({...player, player : {id : player.id, ...(player.id !== 0 ? players.data[i].data() : _createPlayer())}}))

      return match
    },
    team : async (parent, args, { fs, rt }) => {
      const { err , data } = await awtc(fs.collection('teams').doc(args.id+'').get())
      if(err){_error('Error en la base de datos')}
      if(!data.exists){_error(`El equipo con id ${args.id} no se encuentra`)}
      return {id : args.id, ...data.data()}
    },
    league : async (parent, args, { fs, rt }) => {
      const leagueInfo = await awtc(fs.collection('leagues').doc(args.id.toString()).get())
      if(leagueInfo.err){_error('Error en la base de datos')}
      if(!leagueInfo.data.exists){_error(`La liga con id ${args.id} no se encuentra`)}
      let league = {id: args.id,...leagueInfo.data.data()}
      const matchesCollection = await awtc(fs.collection('leagues').doc(args.id+'').collection('matches').get())
      if(matchesCollection.err){_error('Error en la base de datos')}
      // if(!matchesCollection.data.exists){_error(`Las partidas de la liga con id ${args.id} no se encuentran`)}
      league.matches = []
      let players_league = new Set()
      matchesCollection.data.forEach(matchCol => {
        league.matches.push({id : matchCol.id, ...matchCol.data()})
        matchCol.data().players.map(player => {if(player.id){players_league.add(player.id)}})
      })
      if(!players_league.size){_error('No hay jugadores en los equipos')}
      // console.log('SIZE PLAYERS LEAGUE',players_league.size);
      let promisesPlayers = []
      let playersID_league = []
      for (let player of players_league.values()) {
        playersID_league.push(player)
        promisesPlayers.push(fs.collection('players').doc(player+'').get())
      }
      let players = await awtc(Promise.all(promisesPlayers))
      if(players.err){_error('Error en la base de datos')}
      players = players.data.map((player,i) => ({id : playersID_league[i],...player.data()}))
      league.matches = league.matches.map(match => ({...match,
        players : match.players.map(player => ({...player, player : player.id ? players.find(p => p.id === player.id) : _createPlayer()}))})
      )
      return league
    },
  }
}

function _getPlayer(db,player){
  return db.collection('players').doc(player.toString()).get()
}

function _createPlayer(){return {id : 0, name: 'Desconocid@', url : '0', avatar :'0', rank : 0 , rankdb : 0, avatar : 't'}}

function _cerror(err,message){console.log(err); throw new Error(message)}

function _error(message){throw new Error(message) }

Promise.props = function (props) {
  return Promise.all(Object.keys(props).map(function (key) {
    // ok with val, func, prom?
    return Promise.resolve(props[key]).then(function (res) {
      var one = {};
      one[key] = res;
      return one;
  });
}))
  .then(function (arr) {
    return arr.reduce(function (memo, oneRes) {
    var key = Object.keys(oneRes)[0];
    memo[key] = oneRes[key];
    return memo;
  }, {});
 });
};

const awtc = (promise) => promise.then(data => ({err : null, data})).catch(err => Promise.resolve({err, data : null}))
