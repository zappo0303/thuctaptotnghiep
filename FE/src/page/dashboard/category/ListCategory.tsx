import React from "react";
import { Link } from "react-router-dom";
import useCategoriesQuery from "../../../hook/useCategory";
import useCategoryMutation from "../../../hook/UseCategoryMutation";
import NotFound from "../../../page/website/Home/NotFound/NotFound";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
interface Category {
    _id: string;
    name: string;
}

const AdminCategoryList = () => {
    const { data, isLoading } = useCategoriesQuery();
    const { mutate } = useCategoryMutation({ action: "DELETE" });

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(6);

    if (isLoading) return <div className="flex justify-center items-center"><div className="loader"></div></div>;
    if (!data) return <NotFound />;

    const handleDelete = async (category: Category) => {
        await mutate(category);
    };

    const handleChangePage = (newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">Danh Sách Danh Mục</h1>
                <Link to={`/admin/category/add`} className="inline-block">
                    <button className="bg-gradient-to-r from-purple-700 to-purple-400 text-white p-2 rounded-full hover:shadow-lg transition duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                    </button>
                </Link>
            </div>
            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-left">Tên danh mục</th>
                            <th className="px-4 py-2 text-center">Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((category: Category) => (
                            <tr key={category._id} className="border-b">
                                <td className="px-4 py-2">{category.name}</td>
                                <td className="px-4 py-2 text-center">
                                    <Link to={`/admin/category/edit/${category._id}`}>
                                        <button className="text-blue-500 hover:text-blue-700 transition duration-200">
                                            <EditIcon />
                                        </button>
                                    </Link>
                                    <button
                                        className="text-red-500 hover:text-red-700 transition duration-200 ml-4"
                                        onClick={() => handleDelete(category)}
                                    >
                                        <DeleteIcon />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-between items-center p-4">
                    <div>
                        <span className="text-sm">Rows per page:</span>
                        <select
                            value={rowsPerPage}
                            onChange={handleChangeRowsPerPage}
                            className="ml-2 p-1 border rounded"
                        >
                            <option value={6}>6</option>
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                        </select>
                    </div>
                    <div className="text-sm">
                        Page: {page + 1}
                        <button onClick={() => handleChangePage(page - 1)} disabled={page === 0} className="ml-2 px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">
                            Prev
                        </button>
                        <button onClick={() => handleChangePage(page + 1)} disabled={(page + 1) * rowsPerPage >= data.length} className="ml-2 px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminCategoryList;
