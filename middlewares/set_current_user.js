const db = require('../db/index.js')
function setCurrentUser(req, res, next) {
    res.locals.email = req.session.email
    if(!req.session.email) {
        return next()
    }
    const sql = `SELECT * FROM users WHERE email = $1;`
    db.query(sql, [req.session.email], (err, dbRes) => {
        if(err) {
            console.log(err)
            process.exit(1) //stop the process
        } else {
            //make it easy to access user everywhere
            const user = dbRes.rows[0]
            res.locals.user = user
        }
        next()
    })
}

module.exports = setCurrentUser