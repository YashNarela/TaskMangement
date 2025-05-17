const TaskModel = require("../models/tasksModel");
const UserModel = require("../models/usersModel");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
  
    const { name, email, password, role } = req.body;

 
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User with this email already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
 
    res.status(201).send("User created successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getTasksByUser = async (req, res) => {
  try {

    const userTasks = await UserModel.findById(req.params.userId)
      .populate("tasksAssigned")
      .select("tasksAssigned");


    
    if (!userTasks) {
      return res.status(404).json({
        status: "fail",
        message: "No tasks found for the given user ID",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        userTasks,
      },
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid Data sent!",
    });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  getTasksByUser,
  deleteUser,
};
