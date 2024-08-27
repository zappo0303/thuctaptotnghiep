import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { IFormInput } from "@/interfaces/Auth";
import { register } from "../../../services/Auth/Auth";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { ApiResponse } from "@/interfaces/Message";
import { useNavigate } from "react-router-dom";

const Singup = () => {
    const {
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm<IFormInput>();
    const password = watch("password");
    const Navigate = useNavigate();

    // =================  Submit ===============//
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
            await register(data);
            toast.success("Đăng ký thành công!");
            Navigate("/signin")
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                if (axiosError.response?.status === 400) {
                    const responseData = axiosError.response.data as ApiResponse;
                    if (responseData.messages && responseData.messages.length > 0) {
                        toast.error(responseData.messages[0]);
                    }
                }
            }
            toast.error("Đã xảy ra lỗi vui lòng thử lại !!");
        }
    };

    return (
        <div className=" flex flex-col items-center mt-12 py-10">
            <h1 className="text-4xl font-semibold mb-6">Register</h1>
            <form className="w-full max-w-md" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <Controller
                        name="name"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Name là bắt buộc" }}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="text"
                                placeholder="Name"
                                className={`w-full px-3 py-2 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            />
                        )}
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.name.message}
                        </p>
                    )}
                </div>
                <div className="mb-4">
                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: "Email là bắt buộc",
                            pattern: {
                                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                message: "Email không hợp lệ",
                            },
                        }}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="email"
                                placeholder="Email"
                                className={`w-full px-3 py-2 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            />
                        )}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.email.message}
                        </p>
                    )}
                </div>
                <div className="mb-4">
                    <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: "Password là bắt buộc",
                            minLength: {
                                value: 6,
                                message: "Password phải có ít nhất 6 ký tự",
                            },
                        }}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="password"
                                placeholder="Password"
                                className={`w-full px-3 py-2 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            />
                        )}
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.password.message}
                        </p>
                    )}
                </div>
                <div className="mb-4">
                    <Controller
                        name="confirmPassword"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: "Confirm Password là bắt buộc",
                            validate: (value) => value === password || "Passwords không khớp",
                        }}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="password"
                                placeholder="Confirm Password"
                                className={`w-full px-3 py-2 border ${errors.confirmPassword ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            />
                        )}
                    />
                    {errors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.confirmPassword.message}
                        </p>
                    )}
                </div>
                <div className="mb-4">
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 rounded-md hover:bg-opacity-80"
                    >
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Singup;
