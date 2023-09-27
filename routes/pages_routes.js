const express = require('express')
const router = express.Router()
const db = require('../db')

router.get('/', (req, res) => {
    db.query('SELECT * FROM posts order by user_email;', (err, result) => {
        if(err) {
            console.log(err);
        }
        let posts = result.rows;
        res.render('home', {posts: posts});
    })
})

module.exports = router