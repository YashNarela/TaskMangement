import { message, Modal } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import "../../css/ShowUser.css"; // custom CSS file
import Base_URL from "../../config/BaseUrl";

function ShowUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(7);

  const fetchAllUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${Base_URL}/users/getAllUsers`);
      setUsers(response.data);
    } catch (e) {
      message.error("Failed to fetch users");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const deleteUser = (id) => {
    axios
      .delete(`${Base_URL}/users/deleteUser/${id}`)
      .then(() => {
        message.info("User deleted successfully");
        fetchAllUsers();
      })
      .catch(() => {
        message.error("Error while deleting user");
      });
  };

  const handleDeleteConfirm = () => {
    if (userToDelete) {
      deleteUser(userToDelete);
      setIsModalVisible(false);
      setUserToDelete(null);
    }
  };

  const showDeleteConfirm = (id) => {
    setUserToDelete(id);
    setIsModalVisible(true);
  };

  const totalUsers = users.length;
  const totalPages = Math.ceil(totalUsers / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const goToPage = (page) => setCurrentPage(page);
  const goToNextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage((prev) => prev + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 0) setCurrentPage((prev) => prev - 1);
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="showusercontainer">
      <h1 className="title">All Users ({totalUsers})</h1>

      <div className="table-wrapper">
        {users.length > 0 ? (
          <table className="user-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Tasks Assigned</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.slice(startIndex, endIndex).map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.tasksAssigned.length}</td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => showDeleteConfirm(user._id)}
                      disabled={user.role === "Admin"}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-users">No users found.</div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={goToPrevPage} disabled={currentPage === 0}>
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i)}
              className={currentPage === i ? "active" : ""}
            >
              {i + 1}
            </button>
          ))}
          <button onClick={goToNextPage} disabled={currentPage === totalPages - 1}>
            Next
          </button>
        </div>
      )}

      {/* Modal */}
      <Modal
        title="Confirm Deletion"
        open={isModalVisible}
        onOk={handleDeleteConfirm}
        onCancel={() => setIsModalVisible(false)}
        okText="Yes"
        cancelText="No"
        okButtonProps={{
          style: { backgroundColor: "#288b48", color: "white" },
        }}
        cancelButtonProps={{
          style: { backgroundColor: "#e0e0e0", color: "#000" },
        }}
      >
        <p>Are you sure you want to delete this user?</p>
      </Modal>
    </div>
  );
}

export default ShowUser;
