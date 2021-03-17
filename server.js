require('dotenv').config()
const express = require('express');
const app = express()
const jwt = require('jsonwebtoken')
app.use(express.json())

const posts = [
    {
        username:'hi',
        title:'post1',

    },
    {
        username:'hii',
        title:'post2',

    }
]
app.get('/posts',[authenticateToken],(req, res) => {
    res.json(posts.filter(post => post.username === req.user.name))
});
app.post('/login',(req, res) => {
    const username = req.body.username
    const user = {name: username}
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({ accessToken })
})
app.post('/logout',(req,res) =>{
    res.json({accessToken: null})
})
function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    console.log(req.headers)
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401).json({
        msg: req.headers,
        status: "HI"
    })

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>{
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    });
}
app.listen(3000);