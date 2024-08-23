import { Link, useParams } from "react-router-dom";
import { formatCurrencyVND } from "../../../../services/VND/vnd";
import NotFound from "../NotFound/NotFound";
import Category from "./Category";
import { IdProducts } from "@/interfaces/Products";
import UseCategory from "../../../../hook/useCategory";
import StarIcon from "@mui/icons-material/Star";

const CategoryList = () => {
    const { id } = useParams();
    const { data, isLoading } = UseCategory(id);

    if (!data) return <NotFound />;
    if (isLoading)
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-transparent border-gray-500"></div>
            </div>
        );

    return (
        <>
            <Category />
            <div className="container mx-auto max-w-screen-xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {data &&
                        data.product.map((product: IdProducts) => (
                            <div
                                key={product._id}
                                className="bg-gray-200 p-5 relative rounded-3xl transition-all duration-300 hover:bg-black hover:text-white"
                            >
                                <div className="flex items-center absolute top-10 left-7 bg-gray-100 p-1 rounded-3xl">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="#FFD700"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5 h-5"

                                    >
                                        <StarIcon fontSize="small" style={{ color: "#FFD700" }} />
                                    </svg>
                                    <span className="ml-2 text-black font-semibold">4.5</span>
                                </div>
                                <div className="py-12 rounded-lg bg-white">
                                    <Link to={`product/${product._id}`}>
                                        <img
                                            src={product.img}
                                            alt={product.name}
                                            className="w-full h-auto transform -rotate-12"
                                        />
                                    </Link>
                                </div>
                                <div className="flex justify-between items-center mt-4">
                                    <h3 className="text-lg font-semibold">
                                        <Link
                                            to={`product/${product._id}`}
                                            className="text-inherit no-underline hover:underline"
                                        >
                                            {product.name}
                                        </Link>
                                    </h3>
                                    <Link
                                        to={`product/${product._id}`}
                                        className="bg-white text-black font-semibold py-2 px-4 rounded-full hover:bg-gray-200"
                                    >
                                        View
                                    </Link>
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-lg text-gray-600 font-semibold">
                                        colorful
                                    </span>
                                    <span className="text-lg text-red-600 font-semibold">
                                        {formatCurrencyVND(product.price)}
                                    </span>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
};

export default CategoryList;
