import axiosInstance from "../../config/Axios";
import { IFormInput, LoginForm } from "@/interfaces/Auth";
export const register = async (data: IFormInput) => {
    const response = await axiosInstance.post(`api/v1/singup`, data);
    return response.data;

}
export const Login = async (data: LoginForm) => {
    const response = await axiosInstance.post(`api/v1/singin`, data);
    const { user, token } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    return user;
}
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}
