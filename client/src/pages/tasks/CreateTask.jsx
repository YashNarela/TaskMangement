
import { useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";
import "../../css/CreateTask.css";

import Base_URL from "../../config/BaseUrl";

function CreateTask() {
  const [taskInput, setTaskInput] = useState({});
  const [users, setUsers] = useState([]);

  const fetchUserName = async () => {
    try {
      const response = await axios.get(
        `${Base_URL}/users/getAllUsers`
      );
      const userNames = response.data.map((user) => user.name);
      setUsers(userNames);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserName();
  }, []);

  const handleInput = (e) => {
    setTaskInput((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${Base_URL}/tasks/createTask`,
        taskInput
      );
      message.success("Task created successfully!");
      setTaskInput({
        title: "",
        description: "",
        priority: "",
        dueDate: "",
        assignTo: "",
      });
    } catch (e) {
      message.error("Failed to create task.");
      console.error(e);
    }
  };

  return (
    <div className="create-task-container">
      <div className="create-task-box">
        <h2 className="create-task-title">Create a New Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="title">
              Task Title
            </label>
            <input
              className="form-input"
              type="text"
              id="title"
              name="title"
              value={taskInput.title || ""}
              onChange={handleInput}
              placeholder="Enter task title"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="description">
              Description
            </label>
            <textarea
              className="form-textarea"
              id="description"
              name="description"
              value={taskInput.description || ""}
              onChange={handleInput}
              placeholder="Enter task description"
              rows="3"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="dueDate">
              Due Date
            </label>
            <input
              className="form-input"
              type="date"
              id="dueDate"
              name="dueDate"
              value={taskInput.dueDate || ""}
              min={new Date().toISOString().split("T")[0]}
              onChange={handleInput}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="priority">
              Priority
            </label>
            <select
              className="form-select"
              id="priority"
              name="priority"
              value={taskInput.priority || ""}
              onChange={handleInput}
              required
            >
              <option value="">Select Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="assignTo">
              Assign to
            </label>
            <select
              className="form-select"
              id="assignTo"
              name="assignTo"
              value={taskInput.assignTo || ""}
              onChange={handleInput}
              required
            >
              <option value="">Select User task should be assigned to</option>
              {users.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="status">
              Status
            </label>
            <input
              className="form-input"
              type="text"
              id="status"
              name="status"
              value="Pending"
              disabled
            />
          </div>

          <div className="text-center">
            <button type="submit" className="submit-button">
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTask;
