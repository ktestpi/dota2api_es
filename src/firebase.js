import firebase from 'firebase-admin'
var serviceAccount
try{
  serviceAccount = require('./firebasekey.json')
}catch(err){
  serviceAccount = {
    type: "service_account",
    project_id: "dota2-api-es",
    // "private_key_id": process.env.PRIVATE_KEY_ID,
    "private_key": process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
    "client_email": process.env.CLIENT_EMAIL,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://accounts.google.com/o/oauth2/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs"
  }
}

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://dota2-api-es.firebaseio.com"
});

let fs = firebase.firestore()
const rt = firebase.database().ref()
rt.onval = (path) => rt.child(path).once('value')

export { fs, rt }
