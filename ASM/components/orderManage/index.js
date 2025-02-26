import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import styles from "../orderManage/styles";
import API_BASE_URL from "../localhost/localhost";
import { useNavigation } from "@react-navigation/native"; // ✅ Import navigation

const OrderManage = () => {
    const navigation = useNavigation(); // ✅ Lấy navigation để quay lại màn trước
    const [orders, setOrders] = useState([]);
    const [revenue, setRevenue] = useState(0);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false); // ✅ State làm mới danh sách

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/api/orders/status/Đã hoàn thành`);
            setOrders(response.data);

            // ✅ Tính tổng doanh thu
            const totalRevenue = response.data.reduce((sum, order) => sum + order.total, 0);
            setRevenue(totalRevenue);
        } catch (error) {
            console.error("Lỗi khi tải đơn hàng:", error);
            Alert.alert("Lỗi", "Không thể tải đơn hàng!");
        } finally {
            setLoading(false);
            setRefreshing(false); 
        }
    };

    return (
        <View style={styles.container}>
            
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={30} color="black" />
            </TouchableOpacity>

            <Text style={styles.title}>Quản lý & Thống kê</Text>

            <Text style={styles.subtitle}>Danh sách đơn hàng thành công:</Text>
            {loading ? (
                <Text style={styles.loadingText}>Đang tải...</Text>
            ) : (
                <FlatList
                    data={orders}
                    keyExtractor={(item) => item._id}
                    refreshing={refreshing}
                    onRefresh={() => {
                        setRefreshing(true);
                        fetchOrders();
                    }}
                    renderItem={({ item }) => (
                        <View style={styles.orderItem}>
                            <Text>Người đặt: {item.userName}</Text>
                            <Text>Địa chỉ: {item.address}</Text>
                            <Text>Ngày đặt: {new Date(item.createdAt).toLocaleDateString()}</Text>
                            <Text>Tổng tiền: {item.total.toLocaleString()} VND</Text>

                            <Text style={styles.productTitle}>Sản phẩm:</Text>
                            {item.products.map((product, index) => (
                                <Text key={index}>- {product.name} (SL: {product.quantity})</Text>
                            ))}

                            <TouchableOpacity
                                style={styles.deliverButton}
                            >
                                <Text style={styles.deliverButtonText}>Đã hoàn thành</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}

            <View style={styles.revenueContainer}>
                <Text style={styles.subtitle}>Doanh thu:</Text>
                <Text style={styles.revenue}>{revenue.toLocaleString()} VND</Text>
            </View>
        </View>
    );
};

export default OrderManage;
