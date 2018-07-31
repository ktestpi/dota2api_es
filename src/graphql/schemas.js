export default `
  type Query{
    player(id: Int!): Player!
    match(id: String!): Match!
    team(id: Int!): Team!
    league(id: Int!): League!
    playerr(id: Int!): Player!
  }
  type Player{
    id: Int!
    name: String!
    url: String
    avatar: String!
    rank : Int
    ranklb : Int
  }
  type Match{
    id: String!
    dire_kills: Int
    dire_team: Team!
    duration: Int!
    end: Int!
    players: [MatchPlayer!]!
    radiant_kills : Int
    radiant_team: Team!
    radiant_win: Boolean!
  }
  type Team{
    id: Int!
    country_code: String
    logo: String
    name: String
    tag: String
  }
  type MatchPlayer{
    id: Int!
    player : Player!
    assists: Int
    backPack1: Int
    backPack2: Int
    backPack3: Int
    deaths: Int
    denies: Int
    gpm: Int!
    hero: Int!
    hero_damage: Int
    hero_healing: Int
    item0: Int
    item1: Int
    item2: Int
    item3: Int
    item4: Int
    item5: Int
    kills: Int
    lane: Int
    lasthits: Int
    level: Int!
    slot: Int
    tower_damage: Int
    xpm: Int!
  }
  type League{
    id: Int!
    name: String!
    matches: [Match!]!
  }
`
