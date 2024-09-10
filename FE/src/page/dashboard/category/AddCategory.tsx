import { useForm, SubmitHandler } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import UseCategoryMutation from "../../../hook/UseCategoryMutation";
import { useNavigate } from "react-router-dom";

interface FormValues {
    _id: string;
    name: string;
}

const AddCategory = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const { mutate } = UseCategoryMutation({ action: "CREATE" });

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        await mutate(data);
        setTimeout(() => {
            navigate("/admin/category");
        }, 500);
    };

    return (
        <div className="max-w-lg mx-auto mt-10">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold mb-6">Thêm danh mục sản phẩm</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tên Danh mục
                        </label>
                        <input
                            className={`w-full p-2 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-md`}
                            {...register("name", { required: "Không được để trống" })}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.name.message}
                            </p>
                        )}
                    </div>
                    <button
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default AddCategory;
