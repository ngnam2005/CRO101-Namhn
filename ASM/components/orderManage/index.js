import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import styles from "../orderManage/styles";
import API_BASE_URL from "../localhost/localhost";
import { useNavigation } from "@react-navigation/native";

const OrderManage = () => {
    const navigation = useNavigation();
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [revenue, setRevenue] = useState(0);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [filter, setFilter] = useState("all"); // ✅ State lưu khoảng thời gian lọc

    useEffect(() => {
        fetchOrders();
    }, []);

    useEffect(() => {
        filterOrders(filter);
    }, [orders, filter]);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/api/orders/status/Đã hoàn thành`);
            setOrders(response.data);
        } catch (error) {
            console.error("Lỗi khi tải đơn hàng:", error);
            Alert.alert("Lỗi", "Không thể tải đơn hàng!");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    // Hàm lọc đơn hàng theo thời gian
    const filterOrders = (timeRange) => {
        const now = new Date();
        let filtered = orders;

        if (timeRange !== "all") {
            const monthsAgo = new Date();
            monthsAgo.setMonth(now.getMonth() - (timeRange === "1m" ? 1 : timeRange === "3m" ? 3 : 6));

            filtered = orders.filter((order) => new Date(order.createdAt) >= monthsAgo);
        }

        setFilteredOrders(filtered);
        setRevenue(filtered.reduce((sum, order) => sum + order.total, 0));
    };

    return (
        <View style={styles.container}>
            {/* Nút quay lại */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={30} color="black" />
            </TouchableOpacity>

            <Text style={styles.title}>Quản lý & Thống kê</Text>

            <Text style={styles.subtitle}>Danh sách đơn hàng thành công:</Text>

            {loading ? (
                <Text style={styles.loadingText}>Đang tải...</Text>
            ) : (
                <FlatList
                    data={filteredOrders}
                    keyExtractor={(item) => item._id}
                    refreshing={refreshing}
                    onRefresh={() => {
                        setRefreshing(true);
                        fetchOrders();
                    }}
                    renderItem={({ item }) => (
                        <View style={styles.orderItem}>
                            <Text>👤 Người đặt: {item.userId?.name}</Text>
                            <Text>📞 Số điện thoại: {item.addressId?.phone}</Text>
                            <Text>📍 Địa chỉ: {item.addressId?.street}, {item.addressId?.district}, {item.addressId?.city}</Text>
                            <Text>📅 Ngày đặt: {new Date(item.createdAt).toLocaleDateString()}</Text>
                            <Text>💰 Tổng tiền: {item.total.toLocaleString()} VND</Text>

                            <Text style={styles.productTitle}>Sản phẩm:</Text>
                            {item.products.map((product, index) => (
                                <Text key={index}>- {product.name} (SL: {product.quantity})</Text>
                            ))}

                            <TouchableOpacity style={styles.deliverButton}>
                                <Text style={styles.deliverButtonText}>Đã hoàn thành</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}

            {/* Hiển thị tổng doanh thu */}
            <View style={styles.filterContainer}>
                {[
                    { label: "1 Tháng", value: "1m" },
                    { label: "3 Tháng", value: "3m" },
                    { label: "6 Tháng", value: "6m" },
                    { label: "Tất cả", value: "all" },
                ].map((item) => (
                    <TouchableOpacity
                        key={item.value}
                        style={[styles.filterButton, filter === item.value && styles.filterButtonActive]}
                        onPress={() => setFilter(item.value)}
                    >
                        <Text style={styles.filterButtonText}>{item.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.revenueContainer}>
                <Text style={styles.subtitle}>💸 Doanh thu:</Text>
                <Text style={styles.revenue}>{revenue.toLocaleString()} VND</Text>
            </View>
        </View>
    );
};

export default OrderManage;
