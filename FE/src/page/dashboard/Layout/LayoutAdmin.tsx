import { Outlet } from "react-router-dom";
import HeaderAdmin from "../HeaderAdmin";
import SidebarAdmin from "../SidebarAdmin";

const LayoutAdmin = () => {
    return (
        <div className="flex flex-col h-screen">
            <HeaderAdmin />
            <div className="flex flex-1">
                <div className="w-1/5 bg-black text-white border-r border-gray-300">
                    <SidebarAdmin />
                </div>
                <div className="w-4/5 p-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default LayoutAdmin;
