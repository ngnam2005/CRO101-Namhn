import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, Alert } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { styles } from "./styles";
import API_BASE_URL from "../localhost/localhost";

const Checkout = () => {
    const route = useRoute();
    const navigation = useNavigation();

    const [cartItems, setCartItems] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);

    // 🔹 Lấy danh sách giỏ hàng từ route hoặc AsyncStorage
    useEffect(() => {
        if (route.params?.cartItems) {
            setCartItems(route.params.cartItems);
        } else {
            const loadCart = async () => {
                try {
                    const storedCart = await AsyncStorage.getItem("cartItems");
                    if (storedCart) {
                        setCartItems(JSON.parse(storedCart));
                    }
                } catch (error) {
                    console.error("Lỗi khi lấy giỏ hàng:", error);
                }
            };
            loadCart();
        }

        const loadSelectedAddress = async () => {
            try {
                const storedAddress = await AsyncStorage.getItem("selectedAddress");
                if (storedAddress) {
                    setSelectedAddress(JSON.parse(storedAddress));
                }
            } catch (error) {
                console.error("Lỗi khi lấy địa chỉ:", error);
            }
        };

        loadSelectedAddress();
    }, [route.params]);


    // 🔹 Tính tổng tiền
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingCost = subtotal > 0 ? 30000 : 0;
    const total = subtotal + shippingCost;

    // 🔹 Xử lý thanh toán
    const handlePayment = async () => {
        if (!selectedAddress) {
            Alert.alert("Lỗi", "Vui lòng chọn địa chỉ giao hàng!");
            return;
        }

        try {
            // Lấy userId từ AsyncStorage
            const userId = await AsyncStorage.getItem("userId");
            if (!userId) {
                Alert.alert("Lỗi", "Không tìm thấy thông tin người dùng!");
                return;
            }

            const orderData = {
                userId, // ✅ Thêm userId
                addressId: selectedAddress._id, // ✅ Thêm addressId
                products: cartItems.map(item => ({
                    productId: item.productId?._id || item.productId,
                    name: item.name,
                    image: item.image.startsWith("http") ? item.image : `${API_BASE_URL}${item.image}`,
                    size: item.size,
                    quantity: item.quantity,
                    price: item.price,
                })),
                total,
            };

            const response = await axios.post(`${API_BASE_URL}/api/orders/create`, orderData);
            if (response.status === 201) {
                Alert.alert("Thành công", "Đơn hàng của bạn đã được đặt!");
                await AsyncStorage.removeItem("cartItems"); // ✅ Xóa giỏ hàng sau khi thanh toán
                navigation.navigate("Tabs");
            } else {
                Alert.alert("Lỗi", "Không thể thực hiện thanh toán!");
            }
        } catch (error) {
            console.error("Lỗi khi đặt hàng:", error.response?.data || error);
            Alert.alert("Lỗi", "Không thể thực hiện thanh toán!");
        }
    };


    return (
        <View style={styles.container}>
            {/* 🔹 Nút quay lại */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>

            {/* 🔹 Danh sách sản phẩm */}
            <FlatList
                data={cartItems}
                keyExtractor={(item, index) => `${item.productId?._id || item.productId || index}-${item.size || "N/A"}`}
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
                ListEmptyComponent={() => <Text style={styles.emptyCartText}>Giỏ hàng của bạn đang trống!</Text>}
            />


            {/* 🔹 Chọn địa chỉ giao hàng */}
            <TouchableOpacity
                onPress={async () => {
                    await AsyncStorage.setItem("cartItems", JSON.stringify(cartItems)); // Lưu giỏ hàng trước khi chuyển màn hình
                    navigation.navigate("AddressScreen");
                }}
                style={styles.addressSelection}
            >
                {selectedAddress ? (
                    <>
                        <Text style={styles.boldText}>Giao đến:</Text>
                        <Text>{`${selectedAddress.specific}, ${selectedAddress.village}, ${selectedAddress.ward}, ${selectedAddress.district}, ${selectedAddress.province}`}</Text>
                        <Text>{selectedAddress.nameAddress} - {selectedAddress.phone}</Text>
                    </>
                ) : (
                    <Text>Chọn địa chỉ giao hàng</Text>
                )}
            </TouchableOpacity>

            {/* 🔹 Hiển thị tổng tiền */}
            <View style={styles.priceDetails}>
                <Text>Sản phẩm: {subtotal.toLocaleString()} VND</Text>
                <Text>Phí ship: {shippingCost.toLocaleString()} VND</Text>
                <Text style={styles.boldText}>Tổng: {total.toLocaleString()} VND</Text>
            </View>

            {/* 🔹 Nút Thanh Toán */}
            <TouchableOpacity style={styles.paymentButton} onPress={handlePayment} disabled={cartItems.length === 0}>
                <Text style={styles.paymentButtonText}>
                    {cartItems.length > 0 ? "Thanh Toán" : "Giỏ hàng trống"}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default Checkout;
