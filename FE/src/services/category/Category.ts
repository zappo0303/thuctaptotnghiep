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