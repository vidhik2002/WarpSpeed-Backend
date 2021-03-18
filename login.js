const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/', (req, res) => {
    // const token = req.body.token;
    const username = req.body.username;
    const email = req.body.email;
    const user = { name: username , email: email}
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({ accessToken })
});

module.exports = router;