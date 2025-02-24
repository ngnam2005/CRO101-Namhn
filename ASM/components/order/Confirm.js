import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import axios from "axios";
import API_BASE_URL from "../localhost/localhost";

const ConfirmScreen = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `${API_BASE_URL}/api/orders/status/Đang vận chuyển`
            );
            setOrders(response.data);
        } catch (error) {
            console.error("Lỗi khi tải đơn hàng:", error);

            if (error.response && error.response.status === 404) {
                setOrders([]); // Không có đơn hàng nào
            } else {
                Alert.alert("Lỗi", "Không thể tải đơn hàng!");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleConfirmOrder = async (orderId) => {
        try {
            const response = await axios.put(
                `${API_BASE_URL}/api/orders/update/${orderId}`,
                { status: "Đã giao" }
            );

            if (response.status === 200) {
                fetchOrders(); // 🔄 Cập nhật danh sách sau khi xác nhận
                Alert.alert("Thành công", "Đơn hàng đã được xác nhận!");
            } else {
                Alert.alert("Lỗi", "Xác nhận thất bại, thử lại!");
            }
        } catch (error) {
            console.error("Lỗi khi xác nhận đơn hàng:", error);
            Alert.alert("Lỗi", "Có lỗi xảy ra khi xác nhận đơn hàng!");
        }
    };

    return (
        <View style={{ flex: 1, padding: 20 }}>
            {loading ? (
                <ActivityIndicator size="large" color="blue" />
            ) : orders.length === 0 ? (
                <Text style={{ textAlign: "center", marginTop: 20 }}>Không có đơn hàng nào</Text>
            ) : (
                <FlatList
                    data={orders}
                    keyExtractor={(item) => item._id}
                    refreshing={loading}
                    onRefresh={fetchOrders}
                    renderItem={({ item }) => (
                        <View style={{ padding: 10, borderBottomWidth: 1 }}>
                            <Text>Người đặt: {item.userName}</Text>
                            <Text>Địa chỉ: {item.address}</Text>
                            <Text>Ngày đặt: {new Date(item.createdAt).toLocaleDateString()}</Text>
                            <Text>Tổng tiền: {item.total} VND</Text>

                            <Text style={{ fontWeight: "bold", marginTop: 5 }}>Sản phẩm:</Text>
                            {item.products.map((product, index) => (
                                <Text key={index}>- {product.name} (SL: {product.quantity})</Text>
                            ))}

                            <TouchableOpacity
                                onPress={() => handleConfirmOrder(item._id)}
                                style={{ backgroundColor: "blue", padding: 10, marginTop: 10 }}
                            >
                                <Text style={{ color: "white", textAlign: "center" }}>Xác nhận đơn hàng</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}
        </View>
    );
};

export default ConfirmScreen;
