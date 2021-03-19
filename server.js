require('dotenv').config({path: './.env'}) 
const cors = require('cors');
const express = require('express');
const app = express()
const jwt = require('jsonwebtoken')
app.use(express.json())
app.use(cors({
    origin: true
}))

const loginRoute = require("./login");
const logoutRoute = require("./logout");
const scoreRoute = require("./score");

app.use('/login', loginRoute);
app.use('/logout', logoutRoute);
app.use('/score', scoreRoute);

const port = process.env.PORT || 3000

app.listen(port, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
