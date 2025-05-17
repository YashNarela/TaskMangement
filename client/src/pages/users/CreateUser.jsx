
import { useState } from "react";
import axios from "axios";
import { message } from "antd";
import "../../css/CreateUser.css";
import Base_URL from "../../config/BaseUrl";

function CreateUser() {
  const [input, setInput] = useState({});

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInput((values) => ({ ...values, [name]: value }));
    console.log(input);
  };

  const createUser = () => {
    let api = `${Base_URL}/users/createUser`;
    axios
      .post(api, input)
      .then((res) => {
        console.log(res);
        message.success("New User Created Successfully");
        if (res.status === 201) {
          setInput({
            name: "",
            email: "",
            password: "",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Unable to create User");
      });
  };

  return (
    <>
      <div className="containerPage">
        <div className="card">
          <h2 className="title">Create a new user</h2>

          <div className="form-group">
            <label htmlFor="name" className="label">
              Enter Username
            </label>
            <input
              type="text"
              placeholder="Ant Man"
              className="input"
              name="name"
              value={input.name || ""}
              onChange={handleInput}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="label">
              Enter Email
            </label>
            <input
              type="email"
              placeholder="ant@example.com"
              className="input"
              name="email"
              value={input.email || ""}
              onChange={handleInput}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="label">
              Enter Password
            </label>
            <input
              type="password"
              placeholder="ee23d1$@"
              className="input"
              name="password"
              value={input.password || ""}
              onChange={handleInput}
            />
          </div>

          <button onClick={createUser} className="button">
            Create User
          </button>
        </div>
      </div>
    </>
  );
}

export default CreateUser;
