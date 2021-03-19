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

const { uid } = require("rand-token");

router.post("/", [authenticateToken], async (req, res) => {
  
  const wordArr = req.body.wordArr;
  let sum = 0;
  for (var i = 0; i < wordArr.length; i++) {
    if (words.wordlist.indexOf(wordArr[i]) !== -1) {
      sum += wordArr[i].length * 2;
    }
  }

  let field = {
    "email": req.user.email,
    "score": sum,
    "username": req.user.username,
  };

  const document = db
    .collection("leaderboard").doc(req.user.email);
  console.log("Document:\n",document)
  
 const querySnapshot = await document.get();
 console.log(querySnapshot.exists) 
 if (querySnapshot.exists) {
    let details = querySnapshot.data();
    if (sum > details.score) {
      await db.collection("leaderboard").doc(req.user.email).update({
        score: sum,
      });
    }
    res.status(200).json({
      sum: sum,
    });
  } else {
    db.collection("leaderboard")
      .doc(req.user.email)
      .set({
        email: req.user.email,
        username: req.user.username,
        score: sum,
      })
      .then(() => {
        console.log("Document successfully written!");
        res.status(200).send("success");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
        res.status(400).send("failed to create new doc");
      });
  }
});
router.get("/", async (req, res) => {
  try {
    db.collection("leaderboard")
      .orderBy("score", "desc")
      .get()
      .then((querySnapshot) => {
        const documents = querySnapshot.docs.map((doc) => doc.data());
        res.status(200).send(documents);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
});


module.exports = router;
