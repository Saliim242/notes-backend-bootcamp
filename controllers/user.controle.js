// Import User Model
import { User } from "../modules/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// lets create new user
export const signup = async (req, res) => {
  // lets data that user passed in
  const { fullName, email, password } = req.body;

  try {
    // lets check if the user passesd if correct or not
    if (!fullName || !email || !password) {
      return res.status(400).json({
        status: false,
        message: "All fields must be provided in the body.",
      });
    }

    // lets check if the user already exists
    const isUserAlreadyExists = await User.findOne({ email });
    if (isUserAlreadyExists) {
      return res.status(400).json({
        status: false,
        message: "Email already in use by another user",
      });
    }
    // lets hash the user password
    const hashPassword = await bcrypt.hash(password, 10);

    // lets create a new user
    const user = new User({
      fullName,
      email,
      password: hashPassword,
    });

    await user.save();

    // lets give feedback to the user
    res
      .status(201)
      .json({ status: true, message: "User Created successfully", data: user });
  } catch (error) {
    // lets console the error with a message
    console.error("User creating failed", error);
    res.status(500).json({ status: false, message: error.message });
    // lets give feedback to the user
  }
};

// lets signIn a user with email and password

export const signin = async (req, res) => {
  // lets get the user to pass the email and password
  const { email, password } = req.body;

  //lets check if the user passed the email and password
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: false, message: "Email or password is required" });
    }

    // lets find the user by email
    const user = await User.findOne({ email });
    // if the user is find lets generate the user with token
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        {
          user: {
            ...user._doc,
            password: undefined,
          },
        },
        process.env.ACCESS_TOKEN,

        { expiresIn: "7d" },
      );
      // lets give the user feedback
      res.status(200).json({
        status: true,
        message: "User logged in successfully",
        user: {
          ...user._doc,
          password: undefined,
        },
        token: token,
      });
    } else {
      return res.status(401).json({
        status: false,
        message: "Invalid email address or password",
      });
    }
  } catch (error) {
    // log the error
    console.error("User Login error", error);
    res.status(500).json({ status: false, message: error.message });
  }
};

// lets get the current user who send to get information about the user

export const current = (req, res) => {
  res.status(200).json({
    status: true,
    message: "Current user Information",
    data: req.user,
  });
};
