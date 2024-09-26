import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import { useQuery, useMutation, useQueryClient } from 'react-query';

type Order = {
    _id: string;
    orderNumber: string;
    totalPrice: number;
    status: "pending" | "confirmed" | "shipped" | "delivered";
    createdAt: string;
    customerInfo: {
        name: string;
        phone: string;
        email: string;
        address: string;
    };
};

const OrderList = () => {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const userId = user?._id;
    const queryClient = useQueryClient();

    const { data, isLoading, error } = useQuery<Order[]>({
        queryKey: ["order"],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:8080/api/v1/orders`);
            return data;
        },
    });

    const updateOrderStatus = useMutation({
        mutationFn: async ({ orderId, status }: { orderId: string; status: string }) => {
            await axios.patch(`http://localhost:8080/api/v1/orders/${orderId}/status`, { status });
            queryClient.invalidateQueries(["order"]);
        },
        onSuccess: () => {
            toast.success("Order status updated successfully!");
        },
        onError: () => {
            toast.error("Failed to update order status");
        }
    });

    const handleStatusChange = (orderId: string, newStatus: string) => {
        updateOrderStatus.mutate({ orderId, status: newStatus });
    };

    const getDisabledStatuses = (currentStatus: string) => {
        const statusOrder = ["pending", "confirmed", "shipped", "delivered"];
        const index = statusOrder.indexOf(currentStatus);
        return statusOrder.slice(0, index + 1);
    };

    if (isLoading) return <div className="flex justify-center items-center h-screen"><div className="loader"></div></div>;
    if (error) return <p className="text-red-500 text-center">Có lỗi xảy ra!</p>;
    if (!data || data.length === 0) {
        return (
            <div className="h-48 flex justify-center items-center">
                <p className="text-red-500">Không có đơn hàng nào.</p>
            </div>
        );
    }

    // Sắp xếp đơn hàng theo ngày tạo (createdAt) giảm dần
    const sortedData = [...data].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return (
        <div className="p-6">
            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Danh sách đơn hàng</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto text-left">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="px-4 py-2">STT</th>
                                <th className="px-4 py-2">Mã đơn hàng</th>
                                <th className="px-4 py-2">Tổng cộng</th>
                                <th className="px-4 py-2">Trạng thái</th>
                                <th className="px-4 py-2">Chức năng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(sortedData) && sortedData.map((order, index) => (
                                <tr key={order._id} className="border-t">
                                    <td className="px-4 py-2">{index + 1}</td>
                                    <td className="px-4 py-2">{order.orderNumber}</td>
                                    <td className="px-4 py-2">{order.totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                    <td className="px-4 py-2">
                                        <select
                                            className="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                            disabled={order.status === "delivered"}
                                        >
                                            {["pending", "confirmed", "shipped", "delivered"].map((status) => (
                                                <option
                                                    key={status}
                                                    value={status}
                                                    disabled={getDisabledStatuses(order.status).includes(status)}
                                                >
                                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="px-4 py-2">
                                        <div className="flex space-x-2">
                                            <Link to={`/admin/orders/${userId}/${order._id}`} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                                                Chi tiết
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default OrderList;
