import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, TextInput, FlatList, Alert } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import API_BASE_URL from "../localhost/localhost";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { styles } from "./styles";

const Checkout = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { cartItems } = route.params;
    const [address, setAddress] = useState("");
    const [userName, setUserName] = useState("");

    // Tính tổng tiền
    const subtotal = cartItems.length > 0 ? cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) : 0;
    const shippingCost = cartItems.length > 0 ? 30000 : 0;
    const total = subtotal + shippingCost;

    // Lấy tên người dùng từ AsyncStorage
    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const storedUserId = await AsyncStorage.getItem("userId");
                console.log("Stored userId:", storedUserId);

                if (storedUserId) {
                    const response = await axios.get(`${API_BASE_URL}/api/users/profile/${storedUserId}`);
                    console.log("User data:", response.data);
                    setUserName(response.data.name || "Unknown User");
                } else {
                    setUserName("Unknown User");
                }
            } catch (error) {
                console.error("Lỗi khi lấy thông tin tài khoản:", error);
                setUserName("Unknown User");
            }
        };
        getUserInfo();
    }, []);

    // Xử lý thanh toán
    const handlePayment = async () => {
        if (!address.trim()) {
            Alert.alert("Lỗi", "Vui lòng nhập địa chỉ giao hàng!");
            return;
        }

        const orderData = {
            userName,
            address,
            products: cartItems.map(item => ({
                productId: item.productId._id || item.productId,
                name: item.name,
                image: item.image,
                size: item.size,
                quantity: item.quantity,
                price: item.price,
            })),
            total,
        };

        try {
            await axios.post(`${API_BASE_URL}/api/orders/create`, orderData);
            Alert.alert("Thành công", "Đơn hàng của bạn đã được đặt!");
            navigation.navigate("Tabs");
        } catch (error) {
            Alert.alert("Lỗi", "Không thể thực hiện thanh toán!");
            console.error("Lỗi khi đặt hàng:", error);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>

            <FlatList
                data={cartItems}
                keyExtractor={(item) => `${item.productId._id || item.productId}-${item.size}`}
                renderItem={({ item }) => (
                    <View style={styles.productContainer}>
                        <Image
                            source={{ uri: item.image.startsWith("http") ? item.image : `${API_BASE_URL}${item.image}` }}
                            style={styles.image}
                        />
                        <View>
                            <Text style={styles.title}>{item.name}</Text>
                            <Text style={styles.text}>Size: {item.size}</Text>
                            <Text style={styles.text}>Quantity: {item.quantity}</Text>
                            <Text style={styles.text}>Price: {item.price * item.quantity} VND</Text>
                        </View>
                    </View>
                )}
            />

            <Text style={styles.text}>Người dùng: {userName}</Text>
            <TextInput
                style={styles.input}
                placeholder="Nhập địa chỉ giao hàng"
                value={address}
                onChangeText={setAddress}
            />

            {/* Hiển thị tổng tiền */}
            <View style={styles.priceDetails}>
                <Text>Sản phẩm: {subtotal.toLocaleString()} VND</Text>
                <Text>Phí ship: {shippingCost.toLocaleString()} VND</Text>
                <Text style={styles.boldText}>Tổng: {total.toLocaleString()} VND</Text>
            </View>

            <TouchableOpacity style={styles.paymentButton} onPress={handlePayment}>
                <Text style={styles.paymentButtonText}>Thanh Toán</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Checkout;
