const session = require("express-session")

module.exports = function() {
    return session({
        secret: "protonodejs7secret",
        resave: false,
        saveUninitialized: true
    })
}