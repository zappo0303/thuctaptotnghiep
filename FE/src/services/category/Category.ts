import { IdProducts } from "@/interfaces/Products";
import axiosInstance from "../../config/Axios";
export const getCategorys = async () => {
    try {
        const response = await axiosInstance.get("/api/v1/category");
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
export const getCategorysById = async (id?: number | string) => {
    try {
        const response = await axiosInstance.get(`/api/v1/category/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
export const addCategory = async (product: IdProducts) => {
    try {
        const response = await axiosInstance.post(`/api/v1/category`, product);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
export const deleteCategory = async (id?: number | string) => {
    try {
        const response = await axiosInstance.delete(`/api/v1/category/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
export const updateCategory = async (product: IdProducts) => {
    try {
        const response = await axiosInstance.put(
            `/api/v1/category/${product._id}`,
            product
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
