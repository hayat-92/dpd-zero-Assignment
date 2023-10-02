const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("../config/jwt");
const {
  genderCheck,
  ageCheck,
  checkBodyForRegister,
  checkPassword,
} = require("../service/service");

// User Registration

let register = async (req, res) => {
  try {
    const missingKeys = checkBodyForRegister(req.body);
    if (missingKeys.length > 0) {
      return res.status(400).json({
        status: "error",
        code: "INVALID_REQUEST",
        message:
          "Invalid request. Please provide all required fields: " +
          missingKeys.join(", "),
      });
    }

    const {
      username,
      email,
      password,
      full_name,
      age = null,
      gender = null,
    } = req.body;
    let passwordCheck = checkPassword(password);
    if (passwordCheck) {
      return res.status(400).json({ ...passwordCheck });
    }

    let check = ageCheck(age);
    if (check) {
      return res.status(400).json({ ...check });
    }

    check = genderCheck(gender);
    if (check) {
      return res.status(400).json({ ...check });
    }

    // Check if the username or email is already taken
    let existingUser = await User.findOne({
      where: { username },
    });
    if (!existingUser) {
      existingUser = await User.findOne({
        where: { email },
      });
    }

    if (existingUser) {
      const errorCode =
        existingUser.username === username ? "USERNAME_EXISTS" : "EMAIL_EXISTS";
      return res.status(400).json({
        status: "error",
        code: errorCode,
        message: `The provided ${
          existingUser.username === username ? "username" : "email"
        } is already taken. Please choose a different one.`,
      });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      full_name,
      age,
      gender,
    });

    // Generate an access token
    const token = jwt.sign({ userId: newUser.id }, config.secret, {
      expiresIn: config.expiresIn,
    });

    res.status(200).json({
      status: "success",
      message: "User successfully registered!",
      data: {
        user_id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        full_name: newUser.full_name,
        age: newUser.age,
        gender: newUser.gender,
      },
      access_token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      code: "INTERNAL_SERVER_ERROR",
      message: "An internal server error occurred. Please try again later.",
    });
  }
};

// Generate Token
let login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({
        status: "error",
        code: "INVALID_CREDENTIALS",
        message: "Invalid credentials. The provided username is incorrect.",
      });
    }

    // Verify the password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        status: "error",
        code: "INVALID_CREDENTIALS",
        message: "Invalid credentials. The provided password is incorrect.",
      });
    }

    // Generate an access token
    const token = jwt.sign({ userId: user.id }, config.secret, {
      expiresIn: config.expiresIn,
    });

    res.status(200).json({
      status: "success",
      message: "Access token generated successfully.",
      data: {
        access_token: token,
        expires_in: config.expiresIn,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      code: "INTERNAL_SERVER_ERROR",
      message: "An internal server error occurred. Please try again later.",
    });
  }
};

module.exports = {
  register,
  login,
};
