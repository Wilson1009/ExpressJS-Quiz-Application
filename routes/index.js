// necessary variables 
var express = require("express");
var router = express.Router();
const { getCollection } = require("../models/db");

// redirects the user to the homepage
router.get("/", function (req, res, next) {
  res.redirect("/homePage");
});
// renders the homePage
router.get("/homePage", function(req, res) {
  res.render("homePage");
});
// renders the signIn
router.get("/signIn", function (req, res, next) {
  res.render("signIn");
});
// renders the signUp
router.get("/signUp", function (req, res, next) {
  res.render("signUp");
});

// post method to add new user to the database
router.post("/signUp", async (req, res) => {
  //try-catch
  try {
    // gets accesss to the database
    let conn = await getCollection("users");
    // tries to find if there is an existing username
    let usernameExists = await conn.findOne({ username: req.body.username });
    // tries to find if there is an existing email
    let emailExists = await conn.findOne({ email: req.body.email });

    // prompt if the username is already taken
    if (usernameExists) {
      console.log("Username already exists");
      res.render("signUp", { message: "Username already exists" });
    } 
    // prompt if the email is already taken
    else if (emailExists) {
      console.log("Email already exists");
      res.render("signUp", { message: "Email already exists" });
    } 
    // else adds the new account to the database
    else {
      await conn.insertOne(req.body);
      // debugger checker
      console.log("Account Added");
      // redirects the user to the signIn so they can sign in with their new account
      res.redirect("/signIn");
    }
  } catch (error) {
    console.log(error);
    res.status(500).render("signUp", { message: "Error during signup" });
  }
});
// post method that handles the signin
router.post("/signIn", async (req, res) => {
  // takes the email and password of the user from the input box
  const { email, password } = req.body;
  //try-catch
  try {
    // connects to the database
    let conn = await getCollection("users");
    // finds the user's email
    let user = await conn.findOne({ email: email });
    // checks if the password matches the username
    if (user && password === user.password) {
      console.log("Login successful");
      // redirects to questionPage if password matches
      res.redirect("/questionPage");
    } 
    // else prompts the user if their password or email is incorrect
    else {
      console.log("Invalid email or password");
      res.render("signIn", { message: "Invalid email or password" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).render("signIn", { error: "Internal Server Error" });
  }
});
// get method that renders the questionPage
router.get("/questionPage", async (req, res, next) => {
  res.render("questionPage");
});
// get method that renders the resultPage 
// sends the score and time to the resultPage as well
router.get("/results", async (req, res) => {
  const { score, time } = req.query;
  res.render("resultPage", { score: score, time: time });
});
// post method that redirects the user to displayResult with the user's informtion
router.post("/submitScore", async (req, res) => {
  // gets teh username, password, and score from the body
  const { username, password, score } = req.body;
  //try-catch
  try {
    // connects to the database
    let conn = await getCollection("users");
    // finds the entered username
    let user = await conn.findOne({ username: username });
    // checks if the username or password is incorrect
    if (!user || user.password !== password) {
      res.status(401).render("signIn", { message: "Authentication failed." });
      return;
    }
    // enters the user's score and finds their highscore
    await conn.updateOne(
      { username: username },
      {
        $push: { attempts: parseInt(score) },
        $max: { highscore: parseInt(score) },
      }
    );
    
    res.redirect(`/displayResults?username=${encodeURIComponent(username)}`);
  } catch (error) {
    console.error("Error updating score:", error);
    res
      .status(500)
      .render("errorPage", {
        message: "Failed to update score. Please try again.",
      });
  }
});

module.exports = router;
