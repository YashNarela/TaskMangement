import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";

import AppLayout from "./layout/Layout";
import Admindashboard from "./pages/admin/Admindashboard";
import CreateTask from "./pages/tasks/CreateTask";
import ShowTask from "./pages/tasks/ShowTask";
import EditTask from "./pages/tasks/EditTask";
import CreateUser from "./pages/users/CreateUser";
import Login from "./pages/login/Login";
import UserDashboard from "./pages/users/UserDashboard";
import ShowUser from "./pages/users/ShowUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userdashboard/:userId" element={<UserDashboard />} />
        </Route>
      </Routes>
      <Routes>

       
        <Route path="/admin" element={<Admindashboard />}>
          <Route index element={<CreateTask />} />
          <Route path="add-task" element={<CreateTask />} />
          <Route path="create-user" element={<CreateUser />} />
          <Route path="show-task" element={<ShowTask />} />
          <Route path="show-users" element={<ShowUser />} />
          <Route path="edit/:id" element={<EditTask />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
