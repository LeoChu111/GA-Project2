const db = require('../db/index.js')
function setCurrentUser(req, res, next) {
    res.locals.userId = req.session.userId
    if(!req.session.userId) {
        return next()
    }
    const sql = `SELECT * FROM users WHERE id = $1;`
    db.query(sql, [req.session.userId], (err, dbRes) => {
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