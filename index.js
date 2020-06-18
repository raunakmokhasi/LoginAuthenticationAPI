const express = require("express");
const app = express();
const bodyParser = require("body-parser");  //Used to parse incoming requests in a middleware before your handlers
const InitiateMongoServer = require("./db");

InitiateMongoServer();

const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "The API has started working!" });
});

app.listen(PORT, (req, res) => {
  console.log(`The server has been initiated at PORT ${PORT}`);
});


const jwt = require("jsonwebtoken"); //Secure way to transmit information between parties as a JSON object with a Digital Signature
const { check, validationResult } = require("express-validator"); // Prevents request that includes invalid username or password
const bcrypt = require("bcryptjs"); //Secure way to store passwords in Database using Encryption Techniques (Generating salt and hashing)
const auth = require("./auth");
const User = require("./UserSchema");


const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger.json');

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/", (req, res) => {
  res.json({ message: "The API has started working!" });
});


app.post(
  "/signup",
  [
    check("username", "Please enter a valid Username").not().isEmpty(),
    check("email", "Please enter a valid Email").isEmail(),
    check("password", "Please enter a valid Password").isLength({ min: 5 })
  ],
  async (req, res) => {
    const errors = validationResult(req); //Extracts the validation errors from the Express request and makes them available in a Result object.
    if (!errors.isEmpty()) {
      return res.status(300).json({
        errors: errors.array()
      });
    }

    const { username, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          msg: "User Already Exists"
        });
      }

      user = new User({ username, email, password });

      const saltValue = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, saltValue);
      await user.save();

      const payload = {
        user: { id: user.id }
      };

      jwt.sign(
        payload, "raunakMokhasi", { expiresIn: 10000 },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({ token });
        }
      );
    } 
    catch (err) {
      console.log(err.message);
      res.status(500).send("Error while Saving Data");
    }
  }
);


app.post(
  "/login",
  [
    check("email", "Please enter a valid Email").isEmail(),
    check("password", "Please enter a valid Password").isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user)
        return res.status(400).json({ message: "User does NOT Exist" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ message: "Incorrect Password Entered!"});

      const payload = {
        user: { id: user.id }
      };

      jwt.sign( payload, "raunakMokhasi", { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({ token });
        }
      );
    } 
    catch (e) {
      console.error(e);
      res.status(500).json({ message: "Server Error" });
    }
  }
);


app.get("/getUserInfo", auth, async (req, res) => { //Retrieve the logged in user using the token
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } 
  catch (e) {
    res.send({ message: "Error in Fetching user" });
    //res.status(411).json({ message: "Error in Fetching user" });
  }
});

//module.exports = app;