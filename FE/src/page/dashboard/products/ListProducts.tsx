import { Link } from "react-router-dom";
import { useState } from "react";
import useProductQuerry from "../../../hook/useProductQuerry";
import useProductMutation from "../../../hook/useProductMutation";
import UseCategory from "../../../hook/useCategory";
import { formatCurrencyVND } from "../../../services/VND/vnd";
import NotFound from "../../../page/website/Home/NotFound/NotFound";
import { IdProducts } from "@/interfaces/Products";
import React from "react";
import { CircularProgress } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SortIcon from "@mui/icons-material/Sort";
interface Category {
    _id: string;
    name: string;
}

const AdminProductList = () => {
    const { data, isLoading } = useProductQuerry();
    const { mutate } = useProductMutation({ action: "DELETE" });
    const { data: categories, isLoading: loadingCategory } = UseCategory();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(6);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    if (isLoading || loadingCategory) return <CircularProgress />;
    if (!data) return <NotFound />;

    const handleDelete = async (id: number | string) => {
        await mutate({ _id: id } as IdProducts);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSort = (order: 'asc' | 'desc') => {
        setSortOrder(order);
    };

    const sortedData = [...data].sort((a, b) => {
        const priceA = a.discount > 0 ? a.price * (1 - a.discount / 100) : a.price;
        const priceB = b.discount > 0 ? b.price * (1 - b.discount / 100) : b.price;

        return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
    });

    const paginatedData = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold">Danh Sách Sản Phẩm</h1>
                <div className="flex space-x-4">
                    <button
                        onClick={() => handleSort('asc')}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-4 rounded-md flex items-center"
                    >
                        <SortIcon className="mr-2" />
                        Giá tăng dần
                    </button>
                    <button
                        onClick={() => handleSort('desc')}
                        className="bg-red-500 hover:bg-red-600 text-white px-6 py-4 rounded-md flex items-center"
                    >
                        <SortIcon className="mr-2" />
                        Giá giảm dần
                    </button>
                    <Link to={`/admin/productAdd`}>
                        <button
                            className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-md flex items-center"
                        >
                            <AddIcon />
                        </button>
                    </Link>
                </div>
            </div>

            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                <table className="min-w-full text-left">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-4 px-6">Tên</th>
                            <th className="py-4 px-6">Ảnh</th>
                            <th className="py-4 px-6">Giá</th>
                            <th className="py-4 px-6">Mô tả</th>
                            <th className="py-4 px-6">Giảm giá</th>
                            <th className="py-4 px-6">Danh mục</th>
                            <th className="py-4 px-6">Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((product: IdProducts) => (
                            <tr key={product._id} className="border-b hover:bg-gray-100">
                                <td className="py-4 px-6">{product.name}</td>
                                <td className="py-4 px-6">
                                    <img
                                        src={product.img}
                                        alt={product.name}
                                        className="w-12 h-12 object-cover"
                                    />
                                </td>
                                <td className="py-4 px-6">
                                    {product.discount > 0
                                        ? formatCurrencyVND(
                                            product.price * (1 - product.discount / 100)
                                        )
                                        : formatCurrencyVND(product.price)}
                                </td>
                                <td className="py-4 px-6">
                                    <div className="w-56 h-12 overflow-hidden overflow-ellipsis">
                                        {product.description}
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    {product.discount > 0 ? `${product.discount}%` : "Không có"}
                                </td>
                                <td className="py-4 px-6">
                                    {categories?.find(
                                        (cat: Category) => cat._id === product.category
                                    )?.name || "Không có"}
                                </td>
                                <td className="py-4 px-6">
                                    <div className="flex space-x-2">
                                        <Link to={`/admin/product/edit/${product._id}`}>
                                            <button className="text-blue-500 hover:text-blue-700">
                                                <EditIcon />
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => product._id && handleDelete(product._id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <DeleteIcon />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-end mt-4">
                <button
                    onClick={() => handleChangePage(null, page - 1)}
                    disabled={page === 0}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-3 rounded-md mx-1"
                >
                    Previous
                </button>
                <button
                    onClick={() => handleChangePage(null, page + 1)}
                    disabled={page >= Math.ceil(data.length / rowsPerPage) - 1}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-3 rounded-md mx-1"
                >
                    Next
                </button>
                <select
                    value={rowsPerPage}
                    onChange={handleChangeRowsPerPage}
                    className="bg-white border border-gray-300 rounded-md py-1 px-2 mx-1"
                >
                    <option value={6}>6</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                </select>
            </div>
        </div>
    );
};

export default AdminProductList;
