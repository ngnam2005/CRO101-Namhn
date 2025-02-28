import React, { useState, useEffect } from "react";
import { 
    View, Text, TextInput, TouchableOpacity, FlatList, Alert 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { styles } from "./styles";
import API_BASE_URL from "../localhost/localhost";

const API_URL = `${API_BASE_URL}/api/address`;

const AddressScreen = () => {
    const navigation = useNavigation();
    const [addresses, setAddresses] = useState([]);
    const [userId, setUserId] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [newAddress, setNewAddress] = useState({
        name: "",
        phone: "",
        province: "",
        district: "",
        ward: "",
        village: "",
        specific: "",
    });

    // 🟢 Lấy danh sách địa chỉ & giỏ hàng từ AsyncStorage
    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedUserId = await AsyncStorage.getItem("userId");
                const storedCart = await AsyncStorage.getItem("cartItems");

                if (storedUserId) setUserId(storedUserId);
                if (storedCart) setCartItems(JSON.parse(storedCart));

                if (storedUserId) {
                    const response = await axios.get(`${API_URL}?userId=${storedUserId}`);
                    setAddresses(response.data);
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
            }
        };

        fetchData();
    }, []);

    // 🟢 Chọn địa chỉ và quay về Checkout
    const selectAddress = async (address) => {
        try {
            await AsyncStorage.setItem("selectedAddress", JSON.stringify(address));
            navigation.navigate("Checkout", { cartItems });
        } catch (error) {
            console.error("Lỗi khi chọn địa chỉ:", error);
        }
    };

    // 🟢 Xóa địa chỉ
    const deleteAddress = async (addressId) => {
        Alert.alert(
            "Xác nhận xóa",
            "Bạn có chắc muốn xóa địa chỉ này không?",
            [
                { text: "Hủy", style: "cancel" },
                {
                    text: "Xóa",
                    onPress: async () => {
                        try {
                            await axios.delete(`${API_URL}/${addressId}`);
                            setAddresses(addresses.filter(addr => addr._id !== addressId));
                            Alert.alert("Thành công", "Địa chỉ đã được xóa!");
                        } catch (error) {
                            console.error("Lỗi khi xóa địa chỉ:", error);
                            Alert.alert("Lỗi", "Không thể xóa địa chỉ!");
                        }
                    },
                },
            ]
        );
    };

    // 🟢 Thêm địa chỉ mới
    const addAddress = async () => {
        if (!newAddress.nameAddress || !newAddress.phone || !newAddress.specific) {
            Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin!");
            return;
        }
    
        try {
            console.log("Dữ liệu gửi lên API:", { ...newAddress, userId }); // Debug dữ liệu
    
            const response = await axios.post(`${API_URL}/add`, {
                ...newAddress,
                userId,
            });
    
            setAddresses([...addresses, response.data]); // Cập nhật danh sách địa chỉ mới
            setNewAddress({
                nameAddress: "",
                phone: "",
                province: "",
                district: "",
                ward: "",
                village: "",
                specific: "",
            });
    
            Alert.alert("Thành công", "Địa chỉ đã được thêm!");
        } catch (error) {
            console.error("Lỗi khi thêm địa chỉ:", error.response?.data || error.message);
            Alert.alert("Lỗi", error.response?.data?.error || "Không thể thêm địa chỉ!");
        }
    };
    
    

    return (
        <View style={styles.container}>
            {/* 🔹 Nút quay lại */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
             {/* 🔹 Danh sách địa chỉ đã lưu */}
             
             <FlatList
                data={addresses}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => selectAddress(item)} style={styles.addressItem}>
                        <View style={styles.addressContent}>
                            <Text style={styles.boldText}>{item.nameAddress} - {item.phone}</Text>
                            <Text>{`${item.specific}, ${item.village}, ${item.ward}, ${item.district}, ${item.province}`}</Text>
                        </View>
                        <TouchableOpacity onPress={() => deleteAddress(item._id)} style={styles.deleteButton}>
                            <Ionicons name="trash" size={20} color="red" />
                        </TouchableOpacity>
                    </TouchableOpacity>
                )}
            />
            {/* 🔹 Form nhập địa chỉ mới */}
            <View style={styles.inputContainer}>
                 <TextInput 
                    placeholder="Họ và tên" 
                    value={newAddress.nameAddress}  // Sửa từ name => nameAddress
                    onChangeText={(text) => setNewAddress({ ...newAddress, nameAddress: text })} 
                    style={styles.input}
                />

                <TextInput 
                    placeholder="Số điện thoại" 
                    value={newAddress.phone} 
                    onChangeText={(text) => setNewAddress({ ...newAddress, phone: text })} 
                    keyboardType="phone-pad"
                    style={styles.input}
                />
                <TextInput 
                    placeholder="Tỉnh / Thành phố" 
                    value={newAddress.province} 
                    onChangeText={(text) => setNewAddress({ ...newAddress, province: text })} 
                    style={styles.input}
                />
                <TextInput 
                    placeholder="Quận / Huyện" 
                    value={newAddress.district} 
                    onChangeText={(text) => setNewAddress({ ...newAddress, district: text })} 
                    style={styles.input}
                />
                <TextInput 
                    placeholder="Phường / Xã" 
                    value={newAddress.ward} 
                    onChangeText={(text) => setNewAddress({ ...newAddress, ward: text })} 
                    style={styles.input}
                />
                <TextInput 
                    placeholder="Thôn / Xóm" 
                    value={newAddress.village} 
                    onChangeText={(text) => setNewAddress({ ...newAddress, village: text })} 
                    style={styles.input}
                />
                <TextInput 
                    placeholder="Số nhà, đường" 
                    value={newAddress.specific} 
                    onChangeText={(text) => setNewAddress({ ...newAddress, specific: text })} 
                    style={styles.input}
                />

                <TouchableOpacity onPress={addAddress} style={styles.button}>
                    <Text style={styles.buttonText}>Thêm địa chỉ</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AddressScreen;
