// const functions = require('firebase-functions');
const admin = require('firebase-admin');
require('dotenv').config({path: './.env'})

var serviceAccount = require("./warpspeedfirebase.json");
serviceAccount.private_key = process.env.PRIVATE_KEY.replace(/\\n/g, '\n')
    admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DATABASE_URL
    });
const db = admin.firestore();


module.exports = db
