import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import UseCategoryMutation from "../../../hook/UseCategoryMutation";
import { useNavigate, useParams } from "react-router-dom";
import UseCategory from "../../../hook/useCategory";

interface FormValues {
    name: string;
}

const EditCategory = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>();
    const { data, isLoading } = UseCategory(id);

    useEffect(() => {
        if (!isLoading && data) {
            reset({ name: data.category.name });
        }
    }, [data, isLoading, reset]);

    const { mutate } = UseCategoryMutation({
        action: "UPDATE"
    });

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        await mutate({ _id: id!, name: data.name });
        setTimeout(() => {
            navigate("/admin/category");
        }, 500);
    };

    return (
        <div className="max-w-lg mx-auto mt-10">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold mb-6">Cập nhật danh mục sản phẩm</h1>
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
                        Cập nhật
                    </button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default EditCategory;
