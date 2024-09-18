// src/components/Checkout.tsx
import React, { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { formatCurrencyVND } from "../../../../services/VND/vnd";
import useCartsQuery from "../../../../hook/useCartQuery";
import { useMutation, useQueryClient } from "react-query";
import axiosInstance from "../../../../config/Axios";
import { useNavigate } from "react-router-dom";
import {
    PlusIcon,
    MinusIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";

interface Error {
    message: string;
}

export interface CartItem {
    _id: string;
    img: string;
    name: string;
    quantity?: number;
    price: number;
}

const Checkout: React.FC = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const userId = JSON.parse(localStorage.getItem("user") || "{}")._id;
    const { data, error } = useCartsQuery(userId);

    const [customerName, setCustomerName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [nameError, setNameError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [addressError, setAddressError] = useState("");

    const incrementQuantity = useMutation({
        mutationFn: async (productId: string) => {
            const { data } = await axiosInstance.post('/api/v1/carts/increase', {
                userId,
                productId,
            });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["CART_ORDER", userId]);
        },
        onError: (error: Error) => {
            toast.error(`Lỗi: ${error.message}`);
        },
    });

    const decrementQuantity = useMutation({
        mutationFn: async (productId: string) => {
            const { data } = await axiosInstance.post('/api/v1/carts/decrease', {
                userId,
                productId,
            });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["CART_ORDER", userId]);
        },
        onError: (error: Error) => {
            toast.error(`Lỗi: ${error.message}`);
        },
    });

    const removeQuantity = useMutation({
        mutationFn: async (productId: string) => {
            const { data } = await axiosInstance.post('/api/v1/carts/remove', {
                userId,
                productId,
            });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["CART_ORDER", userId]);
            toast.success("Xóa sản phẩm thành công");
        },
        onError: (error: Error) => {
            toast.error(`Lỗi: ${error.message}`);
        },
    });

    const clearCart = useMutation({
        mutationFn: async () => {
            await axiosInstance.post('/api/v1/carts/clear', { userId });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["CART_ORDER", userId]);
        },
        onError: (error: Error) => {
            toast.error(`Lỗi: ${error.message}`);
        },
    });

    const createOrder = useMutation({
        mutationFn: async () => {
            const orderData = {
                userId,
                items: data?.products.map((item: CartItem) => ({
                    _id: item._id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity || 1,
                })),
                totalPrice: calculateTotal(),
                customerInfo: {
                    name: customerName,
                    phone: phoneNumber,
                    email: email,
                    address: address,
                },
            };
            const response = await axiosInstance.post('/api/v1/orders', orderData);
            return response.data;
        },
        onSuccess: () => {
            toast.success("Đơn hàng đã được tạo thành công!");
            clearCart.mutate();
            navigate("/");
        },
        onError: (error: Error) => {
            toast.error(`Lỗi: ${error.message}`);
        },
    });

    if (!userId) {
        toast.error("Bạn chưa đăng nhập !!");
        return null;
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        let valid = true;
        if (!customerName) {
            setNameError("Họ và tên không được để trống.");
            valid = false;
        } else {
            setNameError("");
        }

        const phoneRegex = /^[0-9]{10,15}$/;
        if (!phoneNumber || !phoneRegex.test(phoneNumber)) {
            setPhoneError("Số điện thoại không hợp lệ.");
            valid = false;
        } else {
            setPhoneError("");
        }

        const emailRegex = /\S+@\S+\.\S+/;
        if (!email || !emailRegex.test(email)) {
            setEmailError("Email không hợp lệ.");
            valid = false;
        } else {
            setEmailError("");
        }

        if (!address) {
            setAddressError("Địa chỉ không được để trống.");
            valid = false;
        } else {
            setAddressError("");
        }

        if (!valid) {
            return;
        }

        await createOrder.mutate();
    };

    const calculateTotal = () => {
        return data?.products.reduce(
            (total: number, item: CartItem) => total + (item.price * (item.quantity || 1)),
            0
        );
    };

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-500">Lỗi: {(error as Error).message}</p>
            </div>
        );
    }

    if (!data || !data.products.length) {
        return (
            <div className="flex justify-center items-center h-1/2">
                <p className="text-red-500">Không có sản phẩm trong giỏ hàng.</p>
            </div>
        );
    }

    return (
        <section className="bg-white pt-12">
            <div className="container mx-auto px-4">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                        {/* Giỏ hàng */}
                        <div className="md:col-span-3">
                            <h2 className="text-xl font-semibold mb-4">
                                <a href="#!" className="text-gray-800 no-underline hover:underline flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 mr-2"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    Tiếp tục mua sắm
                                </a>
                            </h2>
                            <hr className="border-gray-300" />
                            <div className="mt-6">
                                <h3 className="text-lg font-medium mb-4">Giỏ hàng</h3>
                                {data.products.map((item: CartItem) => (
                                    <div key={item._id} className="bg-white shadow rounded p-4 mb-5">
                                        <div className="flex items-center space-x-4">
                                            <img src={item.img} alt={item.name} className="w-20 h-20 object-cover rounded" />
                                            <div className="flex-1">
                                                <h4 className="text-md font-medium">{item.name}</h4>
                                                <p className="text-sm text-gray-600">{formatCurrencyVND(item.price)}</p>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    type="button"
                                                    onClick={() => decrementQuantity.mutate(item._id)}
                                                    className="p-2 border rounded hover:bg-gray-100"
                                                >
                                                    <MinusIcon className="h-5 w-5 text-gray-600" />
                                                </button>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={item.quantity}
                                                    onChange={() => { }}
                                                    className="w-16 text-center border rounded"
                                                    readOnly
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => incrementQuantity.mutate(item._id)}
                                                    className="p-2 border rounded hover:bg-gray-100"
                                                >
                                                    <PlusIcon className="h-5 w-5 text-gray-600" />
                                                </button>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeQuantity.mutate(item._id)}
                                                className="p-2 text-red-500 hover:bg-red-100 rounded"
                                            >
                                                <TrashIcon className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Chi tiết thanh toán */}
                        <div className="md:col-span-1">
                            <div className="bg-black text-white p-5 rounded shadow mt-12 md:mt-0">
                                <h3 className="text-lg font-semibold mb-4">Chi tiết thanh toán</h3>
                                <div className="space-y-4">
                                    {/* Họ và tên */}
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Họ và tên</label>
                                        <input
                                            type="text"
                                            value={customerName}
                                            onChange={(e) => setCustomerName(e.target.value)}
                                            className={`w-full px-3 py-2 rounded border ${nameError ? "border-red-500" : "border-gray-300"
                                                } focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black`}
                                        />
                                        {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}
                                    </div>

                                    {/* Số điện thoại */}
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Số điện thoại</label>
                                        <input
                                            type="tel"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                            className={`w-full px-3 py-2 rounded border ${phoneError ? "border-red-500" : "border-gray-300"
                                                } focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black`}
                                        />
                                        {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Email</label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className={`w-full px-3 py-2 rounded border ${emailError ? "border-red-500" : "border-gray-300"
                                                } focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black`}
                                        />
                                        {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                                    </div>

                                    {/* Địa chỉ */}
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Địa chỉ</label>
                                        <input
                                            type="text"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            className={`w-full px-3 py-2 rounded border ${addressError ? "border-red-500" : "border-gray-300"
                                                } focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black`}
                                        />
                                        {addressError && <p className="text-red-500 text-sm mt-1">{addressError}</p>}
                                    </div>
                                </div>

                                {/* Tổng cộng */}
                                <div className="mt-6">
                                    <hr className="border-gray-300 mb-4" />
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-lg font-semibold">Tổng cộng</span>
                                        <span className="text-lg font-semibold">{formatCurrencyVND(calculateTotal())}</span>
                                    </div>
                                </div>

                                {/* Nút thanh toán */}
                                <button
                                    type="submit"
                                    className={`w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded ${createOrder.isLoading ? "opacity-50 cursor-not-allowed" : ""
                                        }`}
                                    disabled={createOrder.isLoading}
                                >
                                    {createOrder.isLoading ? "Đang xử lý..." : "Thanh toán"}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Checkout;
