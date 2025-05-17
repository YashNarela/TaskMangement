


import axios from "axios";
import { message } from "antd";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import "../../css/EditTask.css"; 

import Base_URL from "../../config/BaseUrl";

function EditTask() {
  const { id } = useParams();
  const [input, setInput] = useState({});
  const [users, setUsers] = useState([]);

  const handleInput = (e) => {
    const nm = e.target.name;
    const val = e.target.value;
    setInput((values) => ({
      ...values,
      [nm]: val,
    }));
  };

  const fetchUserName = async () => {
    try {
      const response = await axios.get(
        `${Base_URL}/users/getAllUsers`
      );
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    const api = `${Base_URL}/tasks/getTaskById/${id}`;
    try {
      const response = await axios.get(api);
      const taskData = response.data.data.task;
      setInput({
        title: taskData.title,
        description: taskData.description,
        priority: taskData.priority,
        dueDate: taskData.dueDate,
        assignTo: taskData.assignTo?._id,
        status: taskData.status,
        completed: taskData.completed,
      });
    } catch (error) {
      console.error(error);
      message.error("Error fetching data", error.status);
    }
  };

  useEffect(() => {
    fetchData();
    fetchUserName();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const api = `${Base_URL}/tasks/updateTask/${id}`;
      axios
        .put(api, input)
        .then((res) => {
          console.log("Updated value ", res);
          message.success("Data successfully updated!");
          setInput({
            title: "",
            description: "",
            priority: "",
            dueDate: "",
            assignTo: "",
          });
        })
        .catch((error) => {
          console.error(error);
          message.error("Error updating data. Please try again.");
        });
    } catch (e) {
      console.error(e);
      message.error("An unexpected error occurred.", e);
    }
  };

  return (
    <div className="edit-container">
      <div className="edit-form-box">
        <h2 className="edit-title">Edit Task</h2>

        <form className="edit-form">
          <div className="form-group">
            <label htmlFor="title">Task Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={input.title || ""}
              onChange={handleInput}
              placeholder="Enter task title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={input.description || ""}
              onChange={handleInput}
              placeholder="Enter task description"
              rows="3"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={input.dueDate?.split("T")[0] || ""}
              onChange={handleInput}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              value={input.priority || ""}
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
            <label htmlFor="assignTo">Assign to</label>
            <select
              id="assignTo"
              name="assignTo"
              value={input.assignTo || ""}
              onChange={handleInput}
              required
            >
              <option value="">Select User</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={input.status || ""}
              onChange={handleInput}
              required
            >
              <option value="">Update Status</option>
              <option value="Pending">Pending</option>
              <option value="In-Progress">In-Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="completed">Completed</label>
            <select
              id="completed"
              name="completed"
              value={input.completed || ""}
              onChange={handleInput}
              required
            >
              <option value="">Completed?</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          <div className="form-button">
            <button type="submit" onClick={handleSubmit}>
              Update Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTask;
