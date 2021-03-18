const express = require("express");
const router = express.Router();

router.post('/', (req, res) => {
    res.json({ accessToken: null })
});
router.get('/', (req,res) =>{
    res.json({msg: "hi"})
})

module.exports = router;