const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');


router.post('/', (req, res) => {
    const username = req.body.username;    
    const email = req.body.email;
    const token = req.body.token;
    const user = { username: username , email: email}
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({ accessToken })
});

module.exports = router;