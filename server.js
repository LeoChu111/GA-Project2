require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const requestLogger = require('./middlewares/request_logger')
const expressEjsLayouts = require('express-ejs-layouts')
const requestMethodOverride = require('./middlewares/request_methodoverride')
const session = require('express-session')
const setCurrentUser = require('./middlewares/set_current_user')
const pagesRoutes = require('./routes/pages_routes')
const ensureLoggedIn = require('./middlewares/ensure_logged_in')

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(requestMethodOverride)
app.use(session({secret: process.env.SESSION_SECRET || "mistyrose", resave: false, saveUninitialized: true}))
app.use(setCurrentUser)
app.use(requestLogger)
app.use(expressEjsLayouts)

app.use('/', pagesRoutes)

app.listen(port, (req, res) => {
    console.log(`listening on port ${port}`)
})