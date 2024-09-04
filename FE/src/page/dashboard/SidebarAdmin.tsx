import { Link } from 'react-router-dom';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
const SidebarAdmin = () => {
    return (
        <ul className="px-9 space-y-2 mt-5">
            <li>
                <Link
                    to="/admin/dashboard"
                    className="flex items-center p-2 text-white rounded hover:bg-gray-700"
                >
                    <HomeIcon className="mr-3" />
                    <span>Dashboard</span>
                </Link>
            </li>
            <li>
                <Link
                    to="/admin/products"
                    className="flex items-center p-2 text-white rounded hover:bg-gray-700"
                >
                    <ShoppingCartIcon className="mr-3" />
                    <span>Products</span>
                </Link>
            </li>
            <li>
                <Link
                    to="/admin/category"
                    className="flex items-center p-2 text-white rounded hover:bg-gray-700"
                >
                    <InboxIcon className="mr-3" />
                    <span>Category</span>
                </Link>
            </li>
            <li>
                <Link
                    to="/admin/order"
                    className="flex items-center p-2 text-white rounded hover:bg-gray-700"
                >
                    <PeopleIcon className="mr-3" />
                    <span>Order</span>
                </Link>
            </li>
            <li>
                <Link
                    to="/admin/messages"
                    className="flex items-center p-2 text-white rounded hover:bg-gray-700"
                >
                    <DraftsIcon className="mr-3" />
                    <span>Messages</span>
                </Link>
            </li>
        </ul>
    );
};

export default SidebarAdmin;
