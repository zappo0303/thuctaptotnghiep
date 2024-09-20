import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useQuery } from "react-query";
import { formatCurrencyVND } from "../../../services/VND/vnd";

export interface OrderItem {
    name: string;
    price: number;
    quantity: number;
}

const OrderDetail = () => {
    const { userId, orderId } = useParams();
    const { data, isLoading, error } = useQuery({
        queryKey: ["order", userId, orderId],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:8080/api/v1/orders/${userId}/${orderId}`);
            return data;
        },
    });

    if (isLoading) return <div className="flex justify-center items-center h-screen"><div className="loader"></div></div>;
    if (error) return <p className="text-red-500 text-center">Có lỗi xảy ra!</p>;

    return (
        <>
            <div className="p-6">
                <div className="bg-white shadow-md rounded p-4">
                    <h2 className="text-lg font-semibold mb-4">Chi tiết đơn hàng</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left table-auto">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="px-4 py-2 font-semibold">STT</th>
                                    <th className="px-4 py-2 font-semibold">Tên sản phẩm</th>
                                    <th className="px-4 py-2 font-semibold">Giá</th>
                                    <th className="px-4 py-2 font-semibold">Số lượng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.items?.map((item: OrderItem, index: number) => (
                                    <tr key={index} className="border-t">
                                        <td className="px-4 py-2">{index + 1}</td>
                                        <td className="px-4 py-2">{item.name}</td>
                                        <td className="px-4 py-2">{formatCurrencyVND(item.price)}</td>
                                        <td className="px-4 py-2">{item.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    );
};

export default OrderDetail;
