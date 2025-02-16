
const session = require('express-session')
const path = require('path')
const morgan = require('morgan')
const cors = require('cors')
const express = require('express')
const passport = require('../middlewares/passport')
const { configureHandlebars } = require('./handlebars')

module.exports = (app) => {
    configureHandlebars(app)
    // const corsOptions = {
    //     origin: ["http://localhost:5173", "https://zivshabiapplicationfront.onrender.com"],
    //     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    //     credentials: true
    // }
    // app.use(cors(corsOptions))
    app.use(cors())

    app.use(express.json())
    app.use(morgan('dev'))

    app.use(express.static('uploads'))
    app.use(express.static(path.join(__dirname, '../public')))


    app.use(session({
        secret: process.env.SESSION_SECRET || 'default_session_secret',
        resave: false,
        saveUninitialized: true
    }));

    app.use(passport.initialize())
    app.use(passport.session())
}