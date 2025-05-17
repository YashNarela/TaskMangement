const UserModel = require("../models/usersModel");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

  
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ status: "fail", message: "User not found" });
    }


    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res
        .status(400)
        .json({ status: "fail", message: "Invalid password" });
    }
 
    const tokenData = {
      id: user._id,
      email: user.email,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.status(200).json({
      status: "success",
      message: "Logged in successfully",
      data: user,
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(404).json({ status: "fail", message: err });
  }
};

module.exports = {
  login,
};
