function requestLogger(req, res, next) {
    console.log(`${new Date().toLocaleString()} ${req.method} ${req.path} `)
    next()
}

module.exports = requestLogger