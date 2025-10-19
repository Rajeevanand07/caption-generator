const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

async function registerUser(req, res){
  const { username, password } = req.body;
  
  const isUserExixts = await userModel.findOne({ username });
  
  if (isUserExixts) {
    return res.status(400).json({ message: "User already exists" });
  }
  const user = await userModel.create({ username, password: await bcrypt.hash(password, 10) });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET
  );
  res.cookie("token", token);
  res.status(201).json({ message: "User registered", user });
}

async function loginUser(req, res){
  const { username, password } = req.body;

  const isUserExixts = await userModel.findOne({ username });

  if (!isUserExixts) {
    return res.status(401).json({ message: "user not found" });
  }

  const isPasswordMatch = await bcrypt.compare(password, isUserExixts.password);

  if (!isPasswordMatch) {
    return res.status(401).json({ message: "invalid password" });
  }

  const token = jwt.sign(
    {
      id: isUserExixts._id,
    },
    process.env.JWT_SECRET
  );
  res.cookie("token", token,{
    httpOnly: true,
  });

  res.status(200).json({ message: "Login successful" });
}

async function verifyUser(req, res) {
  const token = req.cookies.token;
  if (token) {
    res.status(200).json({ valid: true });
  } else {
    res.json({ valid: false });
  } 
}

async function logoutUser(req, res) {
  res.clearCookie("token",{
    httpOnly: true,
  });
  res.status(200).json({ message: "Logout successful" });
}

module.exports = {
  registerUser,
  loginUser,
  verifyUser,
  logoutUser
};