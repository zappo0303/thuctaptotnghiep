import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "src/assets/logo_MUI-removebg.png";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { logout } from "../services/Auth/Auth";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    const handleLogout = () => {
        logout();
        handleClose();
    };

    const handleClick = () => {
        setMenuOpen(prev => !prev);
    };

    const handleClose = () => {
        setMenuOpen(false);
    };

    return (
        <header className="bg-black text-white">
            <div className="container mx-auto ">
                <div className="flex items-center justify-between ">
                    <Link to="/">
                        <img className="w-28" src={logo} alt="Logo" />
                    </Link>
                    <Link to="/" className="text-white text-xl font-semibold">
                        SoleStyle Footwear
                    </Link>
                    <nav className="flex-1 flex items-center justify-center space-x-8 text-lg">
                        <Link className="hover:text-gray-300" to="#">
                            Home
                        </Link>
                        <Link className="hover:text-gray-300" to="#">
                            About
                        </Link>
                        <Link className="hover:text-gray-300" to="#">
                            Services
                        </Link>
                        <Link className="hover:text-gray-300" to="#">
                            Contact
                        </Link>
                    </nav>
                    <div className="flex items-center space-x-10">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search…"
                                className="p-2 rounded bg-gray-800 text-white placeholder-gray-500 opacity-70 hover:opacity-100 transition-opacity duration-300"
                            />
                            <SearchIcon />
                        </div>

                        <button className="relative">
                            <ShoppingCartIcon />
                        </button>

                        <button className="relative">
                            <NotificationsIcon />
                        </button>

                        <div className="relative">
                            {user ? (
                                <div>
                                    <button
                                        className="focus:outline-none"
                                        aria-label="account of current user"
                                        onClick={handleClick}
                                    >
                                        <img
                                            className=" border-gray-400"
                                            alt={user?.name}
                                            src={user?.avatar}
                                        />
                                    </button>
                                    {menuOpen && (
                                        <div
                                            className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-50"
                                        >
                                            <div className="p-4 text-center">

                                                <h3 className="mt-2 text-lg font-semibold">{user?.name}</h3>
                                                <p className="text-sm text-gray-600">{user?.email}</p>
                                                <Link to="/signin">
                                                    <button
                                                        className="w-full mt-4 bg-black text-white py-2 rounded-md hover:bg-opacity-80"
                                                        onClick={handleLogout}
                                                    >
                                                        Log out
                                                    </button>
                                                </Link>
                                                <Link to="/products/liked">
                                                    <button
                                                        className="w-full mt-2 bg-black text-white py-2 rounded-md hover:bg-opacity-80"
                                                    >
                                                        Liked
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div>
                                    <button
                                        className="focus:outline-none"
                                        aria-label="account of current user"
                                        onClick={handleClick}
                                    >
                                        <AccountCircleIcon className="text-white" />
                                    </button>
                                    {menuOpen && (
                                        <div
                                            className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50"
                                        >
                                            <div className="py-1">
                                                <Link
                                                    to="/signin"
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                    onClick={handleClose}
                                                >
                                                    Login
                                                </Link>
                                                <Link
                                                    to="/signup"
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                    onClick={handleClose}
                                                >
                                                    Register
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
