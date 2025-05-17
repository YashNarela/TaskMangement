const express = require("express");
const router = express.Router();

const {
 addTask,
  getAllTasks,
  updateTask,
  deleteTask,
  getTaskById,
} = require("../controllers/tasksController");

router.post("/createTask",addTask);
router.get("/getAllTasks",getAllTasks);

router.delete("/deleteTask/:id", deleteTask);

router.put("/updateTask/:id",updateTask);

router.get("/getTaskById/:id", getTaskById);

module.exports = router;
