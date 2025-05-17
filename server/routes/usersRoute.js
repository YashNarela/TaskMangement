const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const {
  createUser,
  getAllUsers,
  getUserById,
  getTasksByUser,
  deleteUser,
} = require("../controllers/usersController");

router.post("/login", authController.login);
router.post("/adminlogin", authController.login)

router.post("/createUser", createUser);
router.get("/getAllUsers", getAllUsers);
router.get("/getUserById/:id", getUserById);
router.get("/getTasksByUser/:userId", getTasksByUser);

router.delete("/deleteUser/:id", deleteUser);

module.exports = router;
