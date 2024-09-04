import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import useProductMutation from "../../../hook/useProductMutation";
import UseCategory from "../../../hook/useCategory";
import useProductQuerry from "../../../hook/useProductQuerry";
import { CategoryFace } from "@/interfaces/Category";
import { FormProductAdd } from "@/interfaces/formdata";

const ProductAdd = () => {
    const navigate = useNavigate();
    const { mutate } = useProductMutation({ action: "CREATE" });
    const { id } = useParams();
    const { data: category, isLoading: loadingCategory } = UseCategory();
    const { data, isLoading } = useProductQuerry(id);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imgURL, setImgURL] = useState<string | null>(null);
    const [imgCategoryURLs, setImgCategoryURLs] = useState<string[]>([]);

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

    const handleImgChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const url = await uploadFile(files[0]);
            setImgURL(url);
        }
    };

    const handleImgCategoryChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const urls = await Promise.all(Array.from(files).map(uploadFile));
            setImgCategoryURLs(urls);
        }
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormProductAdd>();

    const onSubmit = async (formData: FormProductAdd) => {
        try {
            setIsSubmitting(true);
            await mutate({
                ...formData,
                img: imgURL || data?.img,
                imgCategory: imgCategoryURLs.length ? imgCategoryURLs : data?.imgCategory,
            });
            setTimeout(() => {
                navigate("/admin/products");
            }, 2000);
        } catch (error) {
            toast.error("Lỗi khi Thêm sản phẩm");
        }
    };

    if (isLoading || loadingCategory) return <div className="flex justify-center items-center"><div className="loader"></div></div>;

    return (
        <div className="container mx-auto max-w-4xl">
            <h1 className="text-4xl mb-8 pt-6">Thêm sản phẩm</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-6">
                    <input
                        {...register("name", { required: true })}
                        placeholder="Tên sản phẩm"
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    {errors.name && <p className="text-red-600">Không được để trống</p>}
                </div>
                <div className="mb-6">
                    <input
                        {...register("price", {
                            required: true,
                            validate: (value) => !isNaN(Number(value)),
                        })}
                        placeholder="Giá sản phẩm"
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    {errors.price && (
                        <p className="text-red-600">
                            {errors.price.type === "required"
                                ? "Không được để trống"
                                : "Giá sản phẩm phải là số"}
                        </p>
                    )}
                </div>
                <div className="mb-6">
                    <input
                        type="file"
                        onChange={handleImgChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    {imgURL && (
                        <div className="mt-2">
                            <img
                                src={imgURL}
                                alt="Uploaded Product"
                                className="w-24 h-auto"
                            />
                        </div>
                    )}
                </div>
                <div className="mb-6">
                    <input
                        type="file"
                        onChange={handleImgCategoryChange}
                        multiple
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    {imgCategoryURLs.length > 0 && (
                        <div className="mt-2 flex gap-2">
                            {imgCategoryURLs.map((img, index) => (
                                <div key={index}>
                                    <img
                                        src={img}
                                        alt={`Uploaded Category ${index}`}
                                        className="w-20 h-20 object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="mb-6">
                    <input
                        {...register("discount", {
                            required: true,
                            validate: (value) => !isNaN(Number(value)),
                        })}
                        placeholder="Sale"
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    {errors.discount && (
                        <p className="text-red-600">
                            {errors.discount.type === "required"
                                ? "Không được để trống"
                                : "Sale phải là số"}
                        </p>
                    )}
                </div>
                <div className="mb-6">
                    <input
                        {...register("coutInStock", {
                            required: true,
                            validate: (value) => !isNaN(Number(value)),
                        })}
                        placeholder="Số lượng trong kho"
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    {errors.coutInStock && (
                        <p className="text-red-600">
                            {errors.coutInStock.type === "required"
                                ? "Không được để trống"
                                : "Số lượng trong kho phải là số"}
                        </p>
                    )}
                </div>
                <div className="mb-6">
                    <select
                        {...register("category", { required: true })}
                        defaultValue={data?.category || ""}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    >
                        {category &&
                            category.map((item: CategoryFace, index: number) => (
                                <option key={index} value={item._id}>
                                    {item.name}
                                </option>
                            ))}
                    </select>
                    {errors.category && (
                        <p className="text-red-600">Không được để trống</p>
                    )}
                </div>
                <div className="mb-6">
                    <textarea
                        {...register("description", { required: true })}
                        placeholder="Mô tả sản phẩm"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        rows={4}
                    />
                    {errors.description && (
                        <p className="text-red-600">Không được để trống</p>
                    )}
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-black text-white px-4 py-2 rounded-md mt-4"
                >
                    Submit
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default ProductAdd;
