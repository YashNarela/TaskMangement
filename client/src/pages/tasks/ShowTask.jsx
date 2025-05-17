

import { message, Modal } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import "../../css/ShowTask.css";
import Base_URL from "../../config/BaseUrl";

function ShowTask() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(5);

  const fetchAllTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${Base_URL}/tasks/getAllTasks`
      );
      setTasks(response.data.data.tasks);
    } catch (e) {
      message.error("Failed to fetch tasks");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  const handleEdit = (id) => navigate(`/admin/edit/${id}`);

  const deleteTask = (id) => {
    axios
      .delete(`${Base_URL}/tasks/deleteTask/${id}`)
      .then(() => {
        message.success("Task deleted successfully");
        fetchAllTasks();
      })
      .catch(() => {
        message.error("Error deleting task");
      });
  };

  const handleDeleteConfirm = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete);
      setIsModalVisible(false);
      setTaskToDelete(null);
    }
  };

  const showDeleteConfirm = (id) => {
    setTaskToDelete(id);
    setIsModalVisible(true);
  };

  const totalTasks = tasks.length;
  const totalPages = Math.ceil(totalTasks / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const goToPage = (page) => setCurrentPage(page);
  const goToNextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage((prev) => prev + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 0) setCurrentPage((prev) => prev - 1);
  };

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="task-container">
      <h1 className="task-title">
        All Tasks {tasks.length > 0 ? `(${tasks.length})` : " - No Tasks"}
      </h1>

      <div className="task-table-container">
        <table className="task-table">
          <thead className="task-table-header">
            <tr>
              {[
                "No.",
                "Title",
                "Description",
                "Priority",
                "Status",
                "Assigned To",
                "Completed",
                "Created Date",
                "Due Date",
                "Actions",
              ].map((header, i) => (
                <th key={i} className="table-header-cell">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tasks.slice(startIndex, endIndex).map((task, index) => (
              <tr key={task._id} className="table-row">
                <td className="table-cell">{index + 1}</td>
                <td className="table-cell bold">{task.title}</td>
                <td className="table-cell truncate">{task.description}</td>
                <td
                  className={`table-cell bold ${task.priority === "High"
                      ? "priority-high"
                      : task.priority === "Medium"
                        ? "priority-medium"
                        : "priority-low"
                    }`}
                >
                  {task.priority}
                </td>
                <td className="table-cell bold">{task.status}</td>
                <td className="table-cell">
                  {task.assignTo?.name ?? "Not Assigned"}
                </td>
                <td className="table-cell">{task.completed ? "✔" : "✖"}</td>
                <td className="table-cell">{task.createdAt?.split("T")[0]}</td>
                <td className="table-cell">{task.dueDate?.split("T")[0]}</td>
                <td className="table-cell action-buttons">
                  <button
                    onClick={() => handleEdit(task._id)}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => showDeleteConfirm(task._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 0}
            className="pagination-btn"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i)}
              className={`pagination-btn ${currentPage === i ? "active" : ""
                }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages - 1}
            className="pagination-btn"
          >
            Next
          </button>
        </div>
      )}

      <Modal
        title="Confirm Deletion"
        open={isModalVisible}
        onOk={handleDeleteConfirm}
        onCancel={() => setIsModalVisible(false)}
        okText="Yes"
        cancelText="No"
      >
        <p>Are you sure you want to delete this task?</p>
      </Modal>
    </div>
  );
}

export default ShowTask;
