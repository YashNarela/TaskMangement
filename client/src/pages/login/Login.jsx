import { useState } from "react";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router";

import "../../css/Login.css";

import Base_URL from "../../config/BaseUrl";

function Login() {
  const [toggleLogin, setToggleLogin] = useState(false);
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });
  const [signUpInput, setSignUpInput] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleLoginInput = (e) => {
    const { name, value } = e.target;
    setLoginInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUpInput = (e) => {
    const { name, value } = e.target;
    setSignUpInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${Base_URL}/users/login`,
        loginInput
      );
      const userId = response?.data.data._id;
      window.localStorage.setItem("name", response.data.data?.name);
      window.localStorage.setItem("email", response.data.data?.email);
      message.success(response.data.msg || "Login successful!");
      if (response.data.data?.role === "Teammate") {
        navigate(`/userdashboard/${userId}`);
      } else if (response.data.data?.role === "Admin") {
        navigate("/admin");
      }
    } catch (err) {
      message.error("Invalid credentials! Please try again.");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${Base_URL}/users/createUser`, signUpInput);
      message.success("Sign Up form submitted. Implement API call.");
      setToggleLogin(false);
    } catch (err) {
      message.error("Failed to sign up. Try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="title">Task Management System</h1>
        {!toggleLogin ? (
          <form onSubmit={handleLogin} className="form">
            <h2 className="form-heading">Login to Continue</h2>
            <input
              type="email"
              placeholder="Enter Email"
              className="input"
              name="email"
              value={loginInput.email}
              onChange={handleLoginInput}
              required
            />
            <input
              type="password"
              placeholder="Enter password"
              className="input"
              name="password"
              value={loginInput.password}
              onChange={handleLoginInput}
              required
            />
            <p className="forgot">Forgot Password?</p>
            <button type="submit" className="btn">
              Login
            </button>
            <p className="toggle-msg">
              Don’t have an account?{" "}
              <button type="button" className="toggle-btn" onClick={() => setToggleLogin(true)}>
                Sign Up
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleSignUp} className="form">
            <h2 className="form-heading">Create an Account</h2>
            <label className="label">Enter Username</label>
            <input
              type="text"
              placeholder="Iron Man"
              className="input"
              name="name"
              value={signUpInput.name}
              onChange={handleSignUpInput}
              required
            />
            <label className="label">Enter Email</label>
            <input
              type="email"
              placeholder="iron@example.com"
              className="input"
              name="email"
              value={signUpInput.email}
              onChange={handleSignUpInput}
              required
            />
            <label className="label">Enter Password</label>
            <input
              type="password"
              placeholder="@3232yds"
              className="input"
              name="password"
              value={signUpInput.password}
              onChange={handleSignUpInput}
              required
            />
            <button type="submit" className="btn">
              Sign Up
            </button>
            <p className="toggle-msg">
              Already have an account?{" "}
              <button type="button" className="toggle-btn" onClick={() => setToggleLogin(false)}>
                Login
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
