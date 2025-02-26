import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import axios from "axios";
import API_BASE_URL from "../localhost/localhost";

const DoneOrderScreen = () => {
    const [orders, setOrders] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [confirmedOrders, setConfirmedOrders] = useState([]); // Danh sách đơn hàng đã xác nhận

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setRefreshing(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/api/orders/status/Đã giao`);
            setOrders(response.data);
        } catch (error) {
            console.error("Lỗi khi tải đơn hàng:", error);
        }
        setRefreshing(false);
    };

    const handleConfirmReceived = async (orderId) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/api/orders/update/${orderId}`, { status: "Đã hoàn thành" });

            if (response.status === 200) {
                Alert.alert("Thành công", "Đơn hàng đã hoàn thành!");
                setConfirmedOrders([...confirmedOrders, orderId]);
            }
        } catch (error) {
            console.error("Lỗi khi xác nhận đơn hàng:", error);
            Alert.alert("Lỗi", "Không thể cập nhật trạng thái. Vui lòng thử lại!");
        }
    };

    return (
        <View>
            {orders.length === 0 ? (
                <Text style={{ textAlign: "center", marginTop: 20 }}>Không có đơn hàng nào</Text>
            ) : (
                <FlatList
                    data={orders}
                    keyExtractor={(item) => item._id}
                    refreshing={refreshing}
                    onRefresh={fetchOrders}
                    renderItem={({ item }) => (
                        <View style={{ padding: 10, borderBottomWidth: 1 }}>
                            <Text>Người đặt: {item.userName}</Text>
                            <Text>Địa chỉ: {item.address}</Text>
                            <Text>Ngày đặt: {new Date(item.createdAt).toLocaleDateString()}</Text>
                            <Text>Tổng tiền: {item.total} VND</Text>

                            {/* Danh sách sản phẩm */}
                            <Text style={{ fontWeight: "bold", marginTop: 5 }}>Sản phẩm:</Text>
                            {item.products.map((product, index) => (
                                <Text key={index}>- {product.name} (SL: {product.quantity})</Text>
                            ))}

                            {/* Kiểm tra nếu đơn hàng đã được xác nhận thì hiển thị nút đã nhận hàng */}
                            {confirmedOrders.includes(item._id) ? (
                                <TouchableOpacity
                                    style={{ backgroundColor: "gray", padding: 10, marginTop: 10 }}
                                    disabled={true}
                                >
                                    <Text style={{ color: "white", textAlign: "center" }}>Nhận hàng thành công</Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity
                                    onPress={() => handleConfirmReceived(item._id)}
                                    style={{ backgroundColor: "orange", padding: 10, marginTop: 10 }}
                                >
                                    <Text style={{ color: "white", textAlign: "center" }}>Xác nhận đã nhận hàng</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    )}
                />
            )}
        </View>
    );
};

export default DoneOrderScreen;
