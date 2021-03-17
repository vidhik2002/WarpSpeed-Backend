const express = require("express");
const router = express.Router();

router.post('/', (req, res) => {
    const token = req.body.token;
    const username = req.body.username
    const user = { name: username }
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({ accessToken })
});

module.exports = router;