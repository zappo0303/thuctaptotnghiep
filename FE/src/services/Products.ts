import { toast } from "react-toastify";
import axiosInstance from "../config/Axios";

export const getAllProducts = async () => {
    try {
        const response = await axiosInstance.get("/api/products");
        return response.data;
    } catch (error) {
        toast.error("Lỗi khi lấy danh sách sản phẩm từ server");
        console.log(error);
    }
};

export const getProductById = async (id?: number | string) => {
    try {
        const response = await axiosInstance.get(`/api/products/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        toast.error("Lỗi khi lấy thông tin sản phẩm từ server");
    }
};