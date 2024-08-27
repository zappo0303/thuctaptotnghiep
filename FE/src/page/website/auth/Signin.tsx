import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { LoginForm } from "@/interfaces/Auth";
import { Login } from "../../../services/Auth/Auth";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { ApiResponse } from "@/interfaces/Message";
import { useNavigate } from "react-router-dom";

const Singin = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<LoginForm>();
    const Navigate = useNavigate();

    // =================  Submit ===============//
    const onSubmit: SubmitHandler<LoginForm> = async (data) => {
        try {
            await Login(data);
            toast.success("Đăng nhập thành công!");
            Navigate("/");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                const responseData = axiosError.response?.data as ApiResponse;
                if (responseData?.messages && responseData.messages.length > 0) {
                    toast.error(responseData.messages[0]);
                }
            }
            toast.error("Đã xảy ra lỗi vui lòng thử lại !!");
        }
    };

    // =================  Submit ===============//

    return (
        <div className="mt-10 py-24 flex flex-col justify-between">
            <div className="flex flex-col items-center mt-12 ">
                <h1 className="text-4xl font-semibold mb-6">Login</h1>
                <form
                    className="w-full max-w-md"
                    onSubmit={handleSubmit(onSubmit)}
                >
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
                                    className={`w-full px-3 py-2 border ${errors.email ? "border-red-500" : "border-gray-300"
                                        } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
                                    className={`w-full px-3 py-2 border ${errors.password ? "border-red-500" : "border-gray-300"
                                        } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
                        <button
                            type="submit"
                            className="w-full bg-black text-white py-2 rounded-md hover:bg-opacity-80"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default Singin;
