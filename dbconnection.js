// const functions = require('firebase-functions');
const admin = require('firebase-admin');


var serviceAccount = require("./permissions.json");
    admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://react-game-fa128-default-rtdb.firebaseio.com"
    });
const db = admin.firestore();


module.exports = db
