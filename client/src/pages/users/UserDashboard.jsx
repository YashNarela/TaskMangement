import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router";
import { Modal, message } from "antd";
import { BiTask } from "react-icons/bi";
import { SlLogout } from "react-icons/sl";
import "../../css/UserDashboard.css"; 
import Base_URL from "../../config/BaseUrl";

function UserDashboard() {
  const [tasks, setTasks] = useState([]);
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const navigate = useNavigate();
  const { userId } = useParams();

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        `${Base_URL}/users/getTasksByUser/${userId}`
      );
      const fetchedTasks = response.data.data.userTasks.tasksAssigned;
      const updatedTasks = fetchedTasks.map((task) => ({
        ...task,
        selectedStatus: task.status,
      }));
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await axios.put(
        `${Base_URL}/tasks/updateTask/${taskId}`,
        { status: newStatus }
      );
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, status: newStatus } : task
        )
      );
      message.success("Task status successfully updated!");
    } catch (error) {
      console.error(error);
      message.error("Error updating task status. Please try again.");
    }
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, selectedStatus: newStatus } : task
      )
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "status-pending";
      case "In-Progress":
        return "status-inprogress";
      case "Completed":
        return "status-completed";
      default:
        return "status-default";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "priority-high";
      case "Medium":
        return "priority-medium";
      case "Low":
        return "priority-low";
      default:
        return "priority-default";
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2 className="sidebar-title">Welcome {localStorage.getItem("name")} </h2>
        <nav>
          <ul className="nav-links">
            <li>
              <NavLink className="nav-link">
                <BiTask className="icon" />
                My Tasks
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={() => setIsLogoutModalVisible(true)}
                to="#"
                className="nav-link"
              >
                <SlLogout className="icon" />
                Logout
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="main-section">
        <header className="main-header">
          <h1>Your Assigned Tasks</h1>
        </header>

        <section className="task-list">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div key={task._id} className="task-card">
                <h3 className="task-title">{task.title}</h3>
                <p className="task-desc">{task.description}</p>
                <div className="task-meta">
                  <span className={`task-priority ${getPriorityColor(task.priority)}`}>
                    Priority: {task.priority}
                  </span>
                  <span className={`task-status ${getStatusColor(task.status)}`}>
                    Status: {task.status}
                  </span>
                  <span className="task-date">
                    Created: {new Date(task.createdAt).toLocaleDateString("en-GB")}
                  </span>
                  <span className="task-date">
                    Due: {new Date(task.dueDate).toLocaleDateString("en-GB")}
                  </span>
                </div>

                <div className="task-action">
                  <label htmlFor={`status-${task._id}`}>Update Task Status</label>
                  <select
                    id={`status-${task._id}`}
                    value={task.selectedStatus}
                    onChange={(e) =>
                      handleStatusChange(task._id, e.target.value)
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="In-Progress">In-Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                  <button onClick={() => updateTaskStatus(task._id, task.selectedStatus)}>
                    Update Status
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-tasks">No tasks available.</p>
          )}
        </section>
      </main>

      <Modal
        title="Confirm Logout"
        open={isLogoutModalVisible}
        onOk={() => {
          navigate("/login");
          window.localStorage.removeItem("name");
          window.localStorage.removeItem("email");
          setIsLogoutModalVisible(false);
        }}
        onCancel={() => setIsLogoutModalVisible(false)}
        okText="Yes"
        cancelText="No"
      >
        <p>Are you sure you want to logout?</p>
      </Modal>
    </div>
  );
}

export default UserDashboard;
