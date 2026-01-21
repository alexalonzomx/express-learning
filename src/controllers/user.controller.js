import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const useralreadyExists = await User.findOne({
      email: email.toLowerCase(),
    });
    if (useralreadyExists) {
      return res
        .status(409)
        .json({ message: "User with this email already exists" });
    }

    const user = await User.create({
      username: username,
      email: email.toLowerCase(),
      password: password,
    });
    res.status(201).json({
      message: "User registered successfully",
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Internal server error - ${error.message}` });
  }
};

const loginUser = async (req, res) => {
  try {
    //check if the user already exists
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      console.log("User not found with email:", email);
      return res.status(400).json({ message: "User not found" });
    }

    //compare the password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log(`Invalid password attempt for email:${email}`);
      return res.status(400).json({ message: "invalid credentials" });
    }

    res.status(200).json({
      message: "Login succcessful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const logoutUser = async (req, res) => {
  try {
    
    const {email} = req.body;
    const user = await User.findOne({email: email.toLowerCase()});
    
    if(!user){
      return res.status(400).json({'message' : 'User not found'});
    }

    res.status(200).json({ 'message' : `User with ${email} Logged out successfully`});

  } catch (error) {
    res.status(500).json({ message: "LougoutUser - Internal server error" });
  }
};

export { registerUser, loginUser, logoutUser };
