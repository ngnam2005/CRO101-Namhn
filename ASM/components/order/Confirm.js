import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator, Image , ScrollView, RefreshControl} from "react-native";
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
            const response = await axios.get(`${API_BASE_URL}/api/orders/status/Chờ xác nhận`);
            setOrders(response.data);
        } catch (error) {
            console.error("Lỗi khi tải đơn hàng:", error);
            setOrders([]);
            Alert.alert("Lỗi", "Không thể tải đơn hàng!");
        } finally {
            setLoading(false);
        }
    };

    const handleConfirmOrder = async (orderId) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/api/orders/update/${orderId}`, { status: "Đang vận chuyển" });

            if (response.status === 200) {
                fetchOrders();
                Alert.alert("Thành công", "Đơn hàng đã chuyển sang trạng thái 'Đang vận chuyển'!");
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
                <ScrollView 
                contentContainerStyle={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={fetchOrders} />
                }
            >
                <Text style={{ textAlign: "center", fontSize: 16 }}>Không có đơn hàng nào</Text>
            </ScrollView>
            ) : (
                <FlatList
                    data={orders}
                    keyExtractor={(item) => item._id}
                    refreshing={loading}
                    onRefresh={fetchOrders}
                    renderItem={({ item }) => (
                        console.log(item.addressId),
                        <View style={{ padding: 15, borderBottomWidth: 1, borderColor: "#ddd", marginBottom: 10 }}>
                            <Text style={{ fontWeight: "bold", fontSize: 16 }}>Mã đơn hàng: {item._id}</Text>
                            <Text>🧑‍🦱 Account: {item.userId?.name}</Text>
                            <Text>👤 Người đặt: {item.userId?.name}</Text>
                            <Text>📞 Số điện thoại: {item.addressId?.phone}</Text>
                            <Text>📍 Địa chỉ: {item.addressId?.street}, {item.addressId?.district}, {item.addressId?.city}</Text>
                            <Text>📅 Ngày đặt: {new Date(item.createdAt).toLocaleDateString()}</Text>
                            <Text>💰 Tổng tiền: {item.total.toLocaleString()} VND</Text>
                            <Text>📦 Trạng thái: <Text style={{ fontWeight: "bold", color: "blue" }}>{item.status}</Text></Text>

                            <Text style={{ fontWeight: "bold", marginTop: 5 }}>🛒 Sản phẩm:</Text>
                            {item.products.map((product, index) => (
                                <View key={index} style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
                                    <View>
                                        <Text style={{ fontWeight: "bold" }}>{product.productId?.name}</Text>
                                        <Text>Size: {product.size} | SL: {product.quantity} | {product.price.toLocaleString()} VND</Text>
                                    </View>
                                </View>
                            ))}

                            <TouchableOpacity
                                onPress={() => handleConfirmOrder(item._id)}
                                style={{
                                    backgroundColor: "blue",
                                    padding: 10,
                                    marginTop: 10,
                                    borderRadius: 5,
                                }}
                            >
                                <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>✅ Xác nhận đơn hàng</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}
        </View>
    );
};

export default ConfirmScreen;
