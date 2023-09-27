const express = require('express')
const router = express.Router()
const db = require('../db')
const bcrypt = require('bcrypt')

router.get('/signup', (req,res) => {
    let prompt = ''
    res.render('signup', {prompt: prompt})
})

router.post('/users', (req, res) => {
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    const saltRounds = 10;
    const sql = `
    INSERT INTO users (email, username, password_digest)
    VALUES ($1, $2, $3);`
    db.query(`SELECT * FROM users WHERE email= '${email}';`, (err, dbRes) => {
        if (err) {
            console.log(err);
        } else if (dbRes.rows.length === 1) {
            let prompt = 'email already exist'
            res.render('signup', {prompt: prompt})
        } else {
            bcrypt.genSalt(saltRounds, function(err, salt) {
                bcrypt.hash(password, salt, function(err, hash) {
                    // Store hash in your password DB.
                    db.query(sql, [email, username, hash], (err, dbRes) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('user created');
                            res.redirect('/login')
                        }
                    })
                });
            });
        }
    })
})
module.exports = router