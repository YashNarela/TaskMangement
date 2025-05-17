import { NavLink, useNavigate } from "react-router";
import { useState } from "react";
import { Modal } from "antd";
import { RiDashboard2Line } from "react-icons/ri";
import { FaUserFriends } from "react-icons/fa";
import { TbReportSearch } from "react-icons/tb";
import { BsDatabaseAdd } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { SlLogout } from "react-icons/sl";

import "../../css/SideNav.css"; 

function SideNav() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    window.localStorage.removeItem("name");
    window.localStorage.removeItem("email");
    navigate("/");
    console.log("Logged Out");
  };

  const showLogoutConfirm = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    logout();
    setIsModalVisible(false);
  };

  return (
<>
    
  

    <nav className="sidenav">
      <h2 className="sidenav-title">Hi, Admin</h2>
      <ul className="sidenav-list">
        <li className="sidenav-item">
          <NavLink className="sidenav-link" to="create-user">
       
            <FaRegUserCircle className="icon" />
            Create User
          </NavLink>
        </li>
        <li className="sidenav-item">
          <NavLink className="sidenav-link" to="add-task">
            <TbReportSearch className="icon" />
            Create Tasks
          </NavLink>
        </li>
        <li className="sidenav-item">
          <NavLink className="sidenav-link" to="show-task">
            <BsDatabaseAdd className="icon" />
            Show Tasks
          </NavLink>
        </li>
        <li className="sidenav-item">
          <NavLink className="sidenav-link" to="show-users">
            <RiDashboard2Line className="icon" />
            Show Users
          </NavLink>
        </li>
        <li className="sidenav-item">
          <NavLink className="sidenav-link" onClick={showLogoutConfirm} to="#">
            <SlLogout className="icon logout-icon" />
            Logout
          </NavLink>
        </li>
      </ul>

      <Modal
        title="Confirm Logout"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Yes"
        cancelText="No"
        okButtonProps={{
          style: {
            backgroundColor: "#e43434",
            borderColor: "#e43434",
            color: "white",
          },
        }}
        cancelButtonProps={{
          style: {
            backgroundColor: "#e0e0e0",
            borderColor: "#e0e0e0",
            color: "#000",
          },
        }}
      >
        <p>Are you sure you want to logout?</p>
      </Modal>
    </nav>

    </>
  );
}

export default SideNav;
