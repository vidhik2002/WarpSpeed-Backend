require('dotenv').config()
const express = require('express');
const app = express()
const jwt = require('jsonwebtoken')
app.use(express.json())

const loginRoute = require("./login");
const logoutRoute = require("./logout");
const scoreRoute = require("./score");

app.use('/login', loginRoute);
app.use('/logout', logoutRoute);
app.use('/score', scoreRoute);


app.listen(3000);