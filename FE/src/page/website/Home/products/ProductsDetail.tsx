import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ImgProductDetail from "./ImgProductsDetail";
import { formatCurrencyVND } from "../../../../services/VND/vnd";
import useProductQuerry from "../../../../hook/useProductQuerry";
import NotFound from "../NotFound/NotFound";
import { FaPlus, FaMinus, FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import { updateProductFeaturedStatus } from "../../../../services/Products";
import useCartMutation from "../../../../hook/useCartMutation";
import { Button, styled } from "@mui/material";

const AddCartButton = styled(Button)({
    width: 250,
    height: 64,
    fontSize: 20,
    fontWeight: 400,
    borderRadius: 15,
    border: "1px solid black",
});

const ProductDetail = () => {
    const [isFeatured, setIsFeatured] = useState(false);
    const { id } = useParams();
    const { data: product, isLoading, refetch } = useProductQuerry(id);
    const [quantity, setQuantity] = useState(1);
    const { mutate } = useCartMutation({ action: "CREATE" });

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

    const userId = JSON.parse(localStorage.getItem("user") || "{}")._id;
    if (!userId) return toast.error("Bạn chưa đăng nhập !!");

    const productId = product._id;

    // Không muốn hiển thị thông báo khi toggle yêu thích
    const toggleFeatured = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();  // Ngăn việc form bị submit khi nhấn vào nút yêu thích
        try {
            const updatedProduct = await updateProductFeaturedStatus(productId, !isFeatured);
            setIsFeatured(updatedProduct.featured);
            await refetch();
        } catch (error) {
            toast.error('Cập nhật trạng thái sản phẩm thất bại!');
        }
    };

    const handleAddToCart = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await mutate({ userId, productId, quantity });
    };

    return (
        <div className=" max-w-7xl mx-auto mt-5 ">
            <form onSubmit={handleAddToCart}>
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
                        <div className="text-4xl font-light flex items-center mb-4">
                            {product.name}
                            <button
                                onClick={toggleFeatured}  // Không kích hoạt form submit
                                className="ml-4"
                            >
                                {isFeatured ? (
                                    <FaHeart className="text-red-500" />
                                ) : (
                                    <FaRegHeart className="text-gray-500" />
                                )}
                            </button>
                        </div>
                        <div className="text-2xl font-medium text-black my-4">
                            {product.discount > 0
                                ? formatCurrencyVND(product.price * (1 - product.discount / 100))
                                : formatCurrencyVND(product.price)}
                        </div>
                        <div className="flex items-center w-[230px] mb-4">
                            <div className="flex items-center">
                                <FaStar className="text-yellow-400" />
                                <span className="ml-2">4.5/5</span>
                            </div>
                        </div>
                        <div className="text-lg font-light my-4 w-[500px] text-black">
                            {product.description}
                        </div>
                        <div className="text-lg font-light text-gray-500 mt-4">
                            {product.size}
                        </div>
                        <div className="flex items-center mt-4">
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
                        <AddCartButton type="submit" variant="contained">
                            Add to Cart
                        </AddCartButton>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ProductDetail;
