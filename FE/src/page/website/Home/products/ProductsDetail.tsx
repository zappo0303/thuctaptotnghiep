import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ImgProductDetail from "./ImgProductsDetail";
import { formatCurrencyVND } from "../../../../services/VND/vnd";
import useProductQuerry from "../../../../hook/useProductQuerry";
import NotFound from "../NotFound/NotFound";
import { FaPlus, FaMinus } from "react-icons/fa";  // Import icons
import StarIcon from "@mui/icons-material/Star";
import { IconButton, Rating } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { toast } from "react-toastify";
import { updateProductFeaturedStatus } from "../../../../services/Products";

const labels = {
    0.5: "Useless",
    1: "Useless+",
    1.5: "Poor",
    2: "Poor+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Good",
    4: "Good+",
    4.5: "Excellent",
    5: "Excellent+",
};

const value = 4.5; // Giá trị đánh giá mặc định

const ProductDetail = () => {
    const [isFeatured, setIsFeatured] = useState(false);
    const { id } = useParams();
    const { data: product, isLoading, refetch } = useProductQuerry(id);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (product) {
            setIsFeatured(product.featured);
        }
    }, [product]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="loader">Loading...</div>
            </div>
        );
    }

    if (!product) {
        return <NotFound />;
    }

    const increaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decreaseQuantity = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(1, Number(e.target.value));
        setQuantity(value);
    };

    const productId = product._id;

    const toggleFeatured = async () => {
        try {
            const updatedProduct = await updateProductFeaturedStatus(productId, !isFeatured);
            setIsFeatured(updatedProduct.featured);
            // Làm mới dữ liệu sản phẩm để đảm bảo dữ liệu là mới nhất
            await refetch();
        } catch (error) {
            toast.error('Cập nhật trạng thái sản phẩm thất bại!');
        }
    };

    return (
        <div className=" max-w-7xl mx-auto mt-5 ">
            <form>
                <div className="grid grid-cols-2 gap-20 p-5">
                    <div className="flex justify-between items-center ">
                        <div className="w-1/4">
                            <ImgProductDetail product={product} />
                        </div>
                        <div className="w-3/4 bg-gray-200 rounded-3xl h-96 flex justify-center items-center relative">
                            <button className="absolute left-1 bg-white p-2 rounded-3xl transform -translate-y-1/2 z-10 top-1/2">
                                &lt;
                            </button>
                            <img
                                src={product.img}
                                alt={product.name}
                                className="max-w-full ml-[-90px] h-auto transform rotate-[-35deg]"
                            />
                            <button className="absolute right-1 bg-white p-2 rounded-full transform -translate-y-1/2 top-1/2">
                                &gt;
                            </button>
                        </div>
                    </div>
                    <div>
                        <div className="text-4xl font-light flex items-center mb-4"> {/* Thêm mb-4 để tạo khoảng cách dưới */}
                            {product.name}
                            <IconButton
                                onClick={toggleFeatured}
                                sx={{ color: isFeatured ? "red" : "gray", ml: 2 }}
                            >
                                {isFeatured ? <Favorite /> : <FavoriteBorder />}
                            </IconButton>
                        </div>
                        <div className="text-2xl font-medium text-black my-4"> {/* Thêm my-4 để tạo khoảng cách trên và dưới */}
                            {product.discount > 0
                                ? formatCurrencyVND(product.price * (1 - product.discount / 100))
                                : formatCurrencyVND(product.price)}
                        </div>
                        <div className="flex items-center w-[230px] mb-4"> {/* Thêm mb-4 để tạo khoảng cách dưới */}
                            <div className="flex items-center">
                                <Rating
                                    name="text-feedback"
                                    value={value}
                                    readOnly
                                    precision={0.5}
                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                />
                            </div>
                            <div className="text-lg text-black ml-2">{labels[value]}</div>
                        </div>
                        <div className="text-lg font-light my-4 w-[500px] text-black"> {/* Thêm my-4 để tạo khoảng cách trên và dưới */}
                            {product.description}
                        </div>
                        <div className="text-lg font-light text-gray-500 mt-4"> {/* Thêm mt-4 để tạo khoảng cách trên */}
                            {product.size}
                        </div>
                        <div className="flex items-center mt-4"> {/* Thêm mt-4 để tạo khoảng cách trên */}
                            <div className="text-lg font-light my-2">Quantity:</div>
                            <button
                                type="button"
                                onClick={decreaseQuantity}
                                className="bg-gray-200 px-3 py-1 rounded-lg mx-2 flex items-center justify-center"
                            >
                                <FaMinus />
                            </button>
                            <input
                                type="number"
                                value={quantity}
                                onChange={handleChange}
                                min={1}
                                className="text-center w-[60px] border border-gray-300 rounded-lg"
                            />
                            <button
                                type="button"
                                onClick={increaseQuantity}
                                className="bg-gray-200 px-3 py-1 rounded-lg mx-2 flex items-center justify-center"
                            >
                                <FaPlus />
                            </button>
                        </div>
                        <div className="pt-4 pb-6 border-b border-gray-300 grid grid-cols-3 gap-2 mt-4"> {/* Thêm mt-4 để tạo khoảng cách trên */}
                            <button
                                type="submit"
                                className="w-[250px] h-16 text-lg font-medium rounded-xl border border-black bg-blue-500 text-white"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>

                </div>
            </form>
        </div>
    );
};

export default ProductDetail;
