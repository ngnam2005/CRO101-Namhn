import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import axios from "axios";
import API_BASE_URL from "../localhost/localhost";

const ShippingScreen = () => {
    const [orders, setOrders] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setRefreshing(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/api/orders/status/Đang vận chuyển`);
            setOrders(response.data);
        } catch (error) {
            console.error("Lỗi khi tải đơn hàng:", error);
            setOrders([]);
            Alert.alert("Lỗi", "Không thể tải đơn hàng. Vui lòng thử lại!");
        } finally {
            setRefreshing(false);
        }
    };

    const handleDeliverOrder = async (orderId) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/api/orders/update/${orderId}`, { status: "Đã giao" });

            if (response.status === 200) {
                fetchOrders(); // 🔹 Cập nhật danh sách ngay lập tức
                Alert.alert("Thành công", "Đơn hàng đã được giao!");
            } else {
                Alert.alert("Lỗi", "Không thể giao đơn hàng, thử lại!");
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật đơn hàng:", error);
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi giao đơn hàng!");
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

                            <Text style={{ fontWeight: "bold", marginTop: 5 }}>Sản phẩm:</Text>
                            {item.products.map((product, index) => (
                                <Text key={index}>- {product.name} (SL: {product.quantity})</Text>
                            ))}

                            <TouchableOpacity
                                onPress={() => handleDeliverOrder(item._id)}
                                style={{ backgroundColor: "red", padding: 10, marginTop: 10 }}
                            >
                                <Text style={{ color: "white", textAlign: "center" }}>Giao hàng</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}
        </View>
    );
};

export default ShippingScreen;
