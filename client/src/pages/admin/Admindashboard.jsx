import { Outlet } from "react-router";
import SideNav from "./SideNav";
import TopHeader from "./TopHeader";

function Admindashboard() {
  return (
    <div className="flex">
      <SideNav />
      <div className="flex flex-1 flex-col">
        <TopHeader />
        <Outlet />
      </div>
    </div>
  );
}

export default Admindashboard;
