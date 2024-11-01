import { Outlet } from "react-router-dom";
import SideBar from "../components/Dashboard/SideBar/SideBar";


const Dashboard = () => {
    return (
        <div className="relative md:flex min-h-screen">
            <div>
                <SideBar/>
            </div>
            <div className="flex-1 md:ml-64">
                <div className="p-5">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;