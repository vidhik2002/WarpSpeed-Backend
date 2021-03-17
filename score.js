const {uid} = require('rand-token')

const express = require("express");
const router = express.Router();
const db = require("./dbconnection.js")


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

router.post('/', async(req, res) => {
    const wordArr = req.body.wordArr;
    let sum = 0;
    for (var i = 0; i < wordArr.length; i++) {
        sum += (wordArr[i].length * 2)
    }
    const document = db.collection('leaderboard').where('email','==',req.body.email)
    if (document)
    {
        // let item = await document.get()
        // console.log('item: ', item)
        // let details = await item[0].data()
        // if (sum > details.score){
        //     await document.update({
        //     score: sum
        // });
        // }
        document.get().then(function(querySnapshot) {
        querySnapshot.forEach(async function(doc) {
        const details = doc.data()
        if (sum > details.score){
            await document.update({
            score: sum
        });
        }
    });
});
    }
    else
    {
        const id = uid(20)
        db.collection("leaderboard").doc(id).set({
        email: req.body.email,
        score: sum
        })
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
    }
    res.status(200).json({
        message: "Successfully updated",
        score: sum
    });
});


module.exports = router;