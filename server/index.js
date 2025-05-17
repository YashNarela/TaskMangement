const express = require("express");

const app = express();

const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());

const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());
const port = process.env.PORT || 3000;

mongoose.connect(process.env.DATABASE_LOCAL).then(() => {
  console.log("MongoDB Connect");
});

const taskRoutes = require("./routes/tasksRoute");
const userRoutes = require("./routes/usersRoute");
app.use("/api/v1/tasks", taskRoutes);
app.use("/api/v1/users", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
