import { Outlet } from "react-router";
import "../css/AppLayout.css";

function AppLayout() {
  return (
    <div className="app-layout-container">
      <div className="app-layout-content">
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
