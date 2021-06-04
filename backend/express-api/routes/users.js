// const mongoose = require("mongoose");
const router = require("express").Router();
const authmiddleware = require("../utils/authmiddleware").isAuth;
const passport = require("passport");

// Home Route
router.get("/", function (req, res) {
  res.render("home", { user: req.user });
});

// Login google
router.get(
  "/login/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
  (req, res, next) => {}
);

// It user autheticated Route or more user freindly content route
router.get("/protected", authmiddleware, (req, res, next) => {
  res.status(200).json({ status: true, msg: "it is running smoothly" });
});

// It is also athorized route for user about page
router.get("/About", (req, res, next) => {
  res.send({
    items: [
      { id: 1, username: "sourabh", price: "$2" },
      { id: 2, username: "sahu", price: "$5" },
    ],
  });

  // res.send("<h3>It is page for why we exist </h3>");
});

// callback route after client google authenticated
router.get(
  "/auth/google/callback",

  passport.authenticate("google"),
  function (req, res) {
    res.redirect("/profile");
    // res.render("profile", { user: req.user });
  }
);

// It is user profile route
router.get("/profile", authmiddleware, (req, res, next) => {
  passport.authenticate("google", {
    failureRedirect: "/",
    successRedirect: "/protected",
  }),
    res.render("profile", { user: req.user });
});

// Visiting this route logs the user out  --basically logout route
router.get("/logout", authmiddleware, (req, res, next) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
