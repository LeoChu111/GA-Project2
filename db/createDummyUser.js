const pg = require('pg')
const bcrypt = require('bcrypt')
const db = new pg.Pool({
    database: 'posty'
})
const email = 'leo@gmail.com';
const username = 'reo';
const password = 'pudding';
const saltRounds = 10;

const sql = `
INSERT INTO users (email, username,password_digest)
VALUES ($1,$2,$3);
`
bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
        // Store hash in your password DB.
        db.query(sql, [email, username, hash], (err, dbRes) => {
            if (err) {
                console.log(err);
            } else {
                console.log('user created');
            }
        })
    });
});

