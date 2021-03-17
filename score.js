const express = require("express");
const router = express.Router();


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    console.log(req.headers)
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401).json({
        msg: req.headers,
        status: "HI"
    })

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    });
}

router.post('/', [authenticateToken], (req, res) => {
    const wordArr = req.body.wordArr;
    let sum = 0;
    for (var i = 0; i < wordArr.length; i++) {
        sum += (wordArr[i].length * 2)
    }
    res.status(200).json({
        message: "Successfully updated",
        score: sum
    });
});


module.exports = router;