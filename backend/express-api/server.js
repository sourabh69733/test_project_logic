require("dotenv").config();
// const mongoose = require("mongoose");
var express = require("express");
var passport = require("passport");
const session = require("express-session");

// var GoogleStrategy = require("passport-google-oauth20").Strategy;

var app = express();
const connection = require("./config/database");

const MongoStore = require("connect-mongo");

var accessCode, refreshCode, token;

require("./config/database");

// Must first load the models
require("./models/user");

require("./config/passport");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dbString = "mongodb://localhost:27017/tutorial_db";
const sessionStore = new MongoStore({
  mongoUrl: dbString,
  mongooseConnection: connection,
  collection: "sessions",
});

app.use(
  session({
    secret: "it is secret and now",
    cookie: {
      maxAge: 100 * 60 * 24 * 60 * 60, // 1 week
    },
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(require("./routes"));

function helper() {
  var jwt = token;
  return jwt;
}
module.exports.helper = helper;

// Configure view engine to render EJS templates.
app.set("views", __dirname + "/routes/views");
app.set("view engine", "ejs");

app.listen(8080 || 8080, () => {
  console.log("Server running on port: 8080");
});
