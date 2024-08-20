import { Link } from "react-router-dom";

import logo from "src/assets/logo_MUI-removebg.png";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Header = () => {

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
                        <div className="relative ">
                            <input
                                type="text"
                                placeholder="Search…"
                                className="p-2 rounded bg-gray-800 text-white placeholder-gray-500 opacity-70 hover:opacity-100 transition-opacity duration-300 "
                            />

                            <SearchIcon />
                        </div>

                        <button className="relative">
                            <ShoppingCartIcon />
                        </button>

                        <button className="relative">
                            <NotificationsIcon />
                        </button>

                        <button className="relative">
                            <AccountCircleIcon />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
