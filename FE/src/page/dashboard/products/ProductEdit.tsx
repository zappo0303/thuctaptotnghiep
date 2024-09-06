import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import useProductMutation from "../../../hook/useProductMutation";
import { useEffect } from "react";
import { FormProductAdd } from "@/interfaces/formdata";
import { CategoryFace } from "@/interfaces/Category";
import useProductQuerry from "../../../hook/useProductQuerry";
import UseCategory from "../../../hook/useCategory";

const ProductEdit = () => {
    const navigate = useNavigate();
    const { mutate } = useProductMutation({ action: "UPDATE" });
    const { id } = useParams();
    const { data: category, isLoading: loadingCategory } = UseCategory();
    const { data, isLoading } = useProductQuerry(id);


    const uploadFile = async (file: File) => {
        const CLOUD_NAME = "dzafnopsc";
        const PRESET_NAME = "nthShop";
        const FOLDER_NAME = "NTHSHOP";
        const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
        const formData = new FormData();
        formData.append("upload_preset", PRESET_NAME);
        formData.append("folder", FOLDER_NAME);
        formData.append("file", file);

        const response = await axios.post(api, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data.secure_url;
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormProductAdd>();

    useEffect(() => {
        if (!isLoading && data) {
            const productById = {
                ...data,
                category: data.category,
            };
            reset(productById);
        }
    }, [data, isLoading, reset]);

    const onSubmit = async (formData: FormProductAdd) => {
        try {
            const imageUrl = formData.img[0] ? await uploadFile(formData.img[0]) : data.img;
            const imgCategoryUrls = formData.imgCategory.length
                ? await Promise.all(Array.from(formData.imgCategory).map(uploadFile))
                : data.imgCategory;

            await mutate({
                ...formData,
                img: imageUrl,
                imgCategory: imgCategoryUrls,
            });
            setTimeout(() => {
                navigate("/admin/products");
            }, 2000);
        } catch (error) {
            toast.error("Lỗi khi sửa sản phẩm");
        }
    };

    if (isLoading || loadingCategory) return <div className="flex justify-center"><div className="spinner"></div></div>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl mb-6">Sửa sản phẩm</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <input
                        {...register("name", { required: true })}
                        type="text"
                        className={`border p-2 w-full ${errors.name ? 'border-red-500' : ''}`}
                        placeholder="Tên sản phẩm"
                    />
                    {errors.name && <p className="text-red-500">Không được để trống</p>}
                </div>
                <div className="mb-4">
                    <input
                        {...register("price", {
                            required: true,
                            validate: (value) => !isNaN(Number(value)),
                        })}
                        type="text"
                        className={`border p-2 w-full ${errors.price ? 'border-red-500' : ''}`}
                        placeholder="Giá sản phẩm"
                    />
                    {errors.price && (
                        <p className="text-red-500">
                            {errors.price.type === "required" ? "Không được để trống" : "Giá sản phẩm phải là số"}
                        </p>
                    )}
                </div>
                <div className="mb-4">
                    <input
                        {...register("img")}
                        type="file"
                        className="border p-2 w-full"
                    />
                    {errors.img && <p className="text-red-500">Không được để trống</p>}
                    {data?.img && (
                        <div className="mt-2">
                            <img src={data.img} alt="Current Product" className="w-24 h-auto" />
                        </div>
                    )}
                </div>
                <div className="mb-4">
                    <input
                        {...register("imgCategory")}
                        type="file"
                        className="border p-2 w-full"
                        multiple
                    />
                    {errors.imgCategory && <p className="text-red-500">Không được để trống</p>}
                    {data?.imgCategory && (
                        <div className="flex gap-2 mt-2">
                            {data.imgCategory.map((img: string, index: number) => (
                                <img key={index} src={img} alt={`Current Category ${index}`} className="w-20 h-20" />
                            ))}
                        </div>
                    )}
                </div>
                <div className="mb-4">
                    <input
                        {...register("discount", {
                            required: true,
                            validate: (value) => !isNaN(Number(value)),
                        })}
                        type="text"
                        className={`border p-2 w-full ${errors.discount ? 'border-red-500' : ''}`}
                        placeholder="Sale"
                    />
                    {errors.discount && (
                        <p className="text-red-500">
                            {errors.discount.type === "required" ? "Không được để trống" : "Sale phải là số"}
                        </p>
                    )}
                </div>
                <div className="mb-4">
                    <input
                        {...register("coutInStock", {
                            required: true,
                            validate: (value) => !isNaN(Number(value)),
                        })}
                        type="text"
                        className={`border p-2 w-full ${errors.coutInStock ? 'border-red-500' : ''}`}
                        placeholder="Số lượng trong kho"
                    />
                    {errors.coutInStock && (
                        <p className="text-red-500">
                            {errors.coutInStock.type === "required" ? "Không được để trống" : "Số lượng trong kho phải là số"}
                        </p>
                    )}
                </div>
                <div className="mb-4">
                    <select
                        {...register("category", { required: true })}
                        defaultValue={data?.category || ""}
                        className={`border p-2 w-full ${errors.category ? 'border-red-500' : ''}`}
                    >
                        <option value="">Chọn danh mục</option>
                        {category &&
                            category.map((item: CategoryFace, index: number) => (
                                <option key={index} value={item._id}>
                                    {item.name}
                                </option>
                            ))}
                    </select>
                    {errors.category && <p className="text-red-500">Không được để trống</p>}
                </div>
                <div className="mb-4">
                    <textarea
                        {...register("description", { required: true })}
                        className={`border p-2 w-full ${errors.description ? 'border-red-500' : ''}`}
                        placeholder="Mô tả sản phẩm"
                        rows={4}
                    />
                    {errors.description && <p className="text-red-500">Không được để trống</p>}
                </div>
                <button
                    type="submit"
                    className="bg-black text-white p-2 w-full mt-4"
                >
                    Submit
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default ProductEdit;
