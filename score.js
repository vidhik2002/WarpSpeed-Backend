const express = require("express");
const router = express.Router();
const db = require("./dbconnection.js");
var jwt = require("jsonwebtoken");
const words = require("./words.json");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  console.log(req.headers);
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null)
    return res.status(401).json({
      msg: req.headers,
      status: "HI",
    });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    console.log("authenticate token");
    console.log(user);
    next();
  });
}

router.post("/", [authenticateToken], async (req, res) => {
  const wordArr = req.body.wordArr;
  console.log("from router");
  console.log(req.user);

  let sum = 0;
  for (var i = 0; i < wordArr.length; i++) {
    if (words.wordlist.indexOf(wordArr[i]) !== -1) {
      sum += wordArr[i].length * 2;
    }
    }

  console.log("sum:",sum);
  let field = {
    email: req.user.email,
    score: sum,
  };

  const document = db
    .collection("leaderboard")
    .where("email", "==", req.user.email);
  if (document) {
    await db
      .collection("leaderboard")
      .doc(req.user.email)
      .set(field, { merge: true })
      .then(() => res.json({ email: req.user.email }))
      .catch((error) => res.status(500).send(error));
    document.get().then(function (querySnapshot) {
      querySnapshot.forEach(async function (doc) {
        const details = doc.data();
        console.log(details.score);
        if (sum > details.score) {
          await document.update({
            score: sum,
          });
        }
      });
    });
 }
});

module.exports = router;
