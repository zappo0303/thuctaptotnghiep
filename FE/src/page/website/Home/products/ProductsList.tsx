import { Link } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import { IdProducts } from "@/interfaces/Products";
import { formatCurrencyVND } from "../../../../services/VND/vnd";
import NotFound from "../NotFound/NotFound";
import useProductQuerry from "../../../../hook/useProductQuerry";

const ProductList = () => {
    const { data, isLoading } = useProductQuerry();

    if (!data) return <NotFound />;

    if (isLoading)
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin border-t-4 border-blue-500 border-solid rounded-full w-12 h-12"></div>
            </div>
        );

    return (
        <div className="container mx-auto px-4 ">
            <div className=" grid grid-cols-4 gap-6  ">
                {data.map((product: IdProducts) => (
                    <div key={product._id} className="bg-gray-100 p-5 relative rounded-3xl transition-colors duration-300 hover:bg-black hover:text-white ">
                        <div className="absolute top-10 left-7 bg-gray-200 p-1 rounded-3xl flex items-center">
                            <StarIcon style={{ color: "#FFD700" }} />
                            <span className="ml-1 font-semibold text-black">4.5</span>
                        </div>
                        <div className="py-3 bg-white rounded-lg ">
                            <Link to={`product/${product._id}`}>
                                <img
                                    src={product.img}
                                    alt={product.name}
                                    className="w-full h-auto transform rotate-[-35deg]"
                                />
                            </Link>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                            <h3 className="text-lg font-semibold">
                                <Link to={`product/${product._id}`} className="text-black no-underline hover:underline">
                                    {product.name}
                                </Link>
                            </h3>
                            <Link
                                to={`product/${product._id}`}
                                className="text-black font-semibold bg-white px-3 py-2 rounded-lg hover:bg-gray-200"
                            >
                                View
                            </Link>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                            <span className="text-gray-600 line-through font-semibold">
                                {formatCurrencyVND(product.price)}
                            </span>
                            <span className="text-red-500 font-semibold">
                                {product.discount > 0
                                    ? formatCurrencyVND(product.price * (1 - product.discount / 100))
                                    : formatCurrencyVND(product.price)}
                            </span>
                        </div>
                    </div>

                ))}
            </div>
        </div>

    );
};

export default ProductList;
