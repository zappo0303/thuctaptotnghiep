import { Facebook, Twitter, Instagram } from "@mui/icons-material";
import { Link } from "react-router-dom"; // Sử dụng React Router nếu cần

const Footer = () => {
    return (
        <footer className="bg-black text-white mt-10 py-6">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <h6 className="text-lg font-semibold mb-3">Liên hệ</h6>
                        <p className="mb-1">Địa chỉ: 123 Đường ABC, Quận 1, TP. Hồ Chí Minh</p>
                        <p className="mb-1">Điện thoại: (123) 456-7890</p>
                        <p className="mb-1">Email: info@yourstore.com</p>
                    </div>
                    <div>
                        <h6 className="text-lg font-semibold mb-3">Dịch vụ khách hàng</h6>
                        <ul>
                            <li className="mb-1">
                                <Link to="#" className="text-white hover:underline">Trợ giúp</Link>
                            </li>
                            <li className="mb-1">
                                <Link to="#" className="text-white hover:underline">Chính sách bảo hành</Link>
                            </li>
                            <li className="mb-1">
                                <Link to="#" className="text-white hover:underline">Chính sách đổi trả</Link>
                            </li>
                            <li className="mb-1">
                                <Link to="#" className="text-white hover:underline">Liên hệ</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h6 className="text-lg font-semibold mb-3">Thông tin</h6>
                        <ul>
                            <li className="mb-1">
                                <Link to="#" className="text-white hover:underline">Về chúng tôi</Link>
                            </li>
                            <li className="mb-1">
                                <Link to="#" className="text-white hover:underline">Điều khoản sử dụng</Link>
                            </li>
                            <li className="mb-1">
                                <Link to="#" className="text-white hover:underline">Chính sách bảo mật</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h6 className="text-lg font-semibold mb-3">Theo dõi chúng tôi</h6>
                        <div className="flex gap-2">
                            <a href="#" className="text-white hover:text-gray-400">
                                <Facebook />
                            </a>
                            <a href="#" className="text-white hover:text-gray-400">
                                <Twitter />
                            </a>
                            <a href="#" className="text-white hover:text-gray-400">
                                <Instagram />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-4">
                    <p>&copy; 2024 Your Store. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
