const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function registerUser(req, res) {
  const { email, username, password } = req.body;

  const isEmailExixts = await userModel.findOne({ email });

  if (isEmailExixts) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const isUserExixts = await userModel.findOne({ username });

  if (isUserExixts) {
    return res.status(400).json({ message: "User already exists" });
  }
  const user = await userModel.create({
    email,
    username,
    password: await bcrypt.hash(password, 10),
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET
  );

  console.log("token before setting to cookies ",token);
  
  const flag = res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  console.log("token set to cookies ",flag);
  


  res.status(201).json({ message: "User registered", user });
}

async function loginUser(req, res) {
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

  console.log("token before setting to cookies ",token);


  await res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  })

  

  res.status(200).json({ message: "Login successful" });
}

async function verifyUser(req, res) {
  const token = await req.cookies?.token;
  console.log(token);
  
  if (token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const currentUser = await userModel
      .findById(decoded.id)
      .select("-password");

    if (token) {
      res.status(200).json({ valid: true, user: currentUser });
    } else {
      res.json({ valid: false });
    }
  } else {
    res.json({ valid: false, message: "no token" });
  }
}

async function logoutUser(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.status(200).json({ message: "Logout successful" });
}

module.exports = {
  registerUser,
  loginUser,
  verifyUser,
  logoutUser,
};
