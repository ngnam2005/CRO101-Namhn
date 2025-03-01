import React, { useState, useCallback } from "react";
import {
    View, Text, FlatList, Image, TouchableOpacity, Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import API_BASE_URL from "../localhost/localhost";
import { styles } from "./styles";

function FavoriteScreen() {
    const [favorites, setFavorites] = useState([]);
    const [cartCount, setCartCount] = useState(0); // Đếm số lượng trong giỏ
    const navigation = useNavigation();

    // Load danh sách yêu thích khi vào lại màn hình
    useFocusEffect(
        useCallback(() => {
            const loadFavorites = async () => {
                try {
                    const storedFavorites = await AsyncStorage.getItem("favorites");
                    if (storedFavorites) {
                        setFavorites(JSON.parse(storedFavorites));
                    }
                } catch (error) {
                    console.error("Lỗi khi lấy danh sách yêu thích:", error);
                }
            };
            loadFavorites();
        }, [])
    );

    // Hàm xóa sản phẩm khỏi danh sách yêu thích
    const removeFavorite = async (productId) => {
        try {
            const updatedFavorites = favorites.filter(item => item._id !== productId);
            setFavorites(updatedFavorites);
            await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        } catch (error) {
            console.error("Lỗi khi xóa sản phẩm khỏi danh sách yêu thích:", error);
        }
    };

    // Hàm thêm vào giỏ hàng
    const addToCart = async (item) => {
        try {
            const userId = await AsyncStorage.getItem("userId");
            if (!userId) {
                Alert.alert("Lỗi", "Bạn cần đăng nhập để thêm vào giỏ hàng!");
                return;
            }
    
            const cartItem = {
                userId,
                productId: item._id,
                name: item.name,
                image: item.image,
                price: item.price,
                size: "M",
                quantity: 1,
            };
    
            console.log("Dữ liệu gửi lên API:", cartItem);
    
            const response = await axios.post(`${API_BASE_URL}/api/carts/add`, cartItem);
    
            console.log("Phản hồi từ API:", response.data); // Debug response
    
            if (response?.data?.success) {
                setCartCount((prevCount) => prevCount + 1);
                Alert.alert("Thành công", "Sản phẩm đã được thêm vào giỏ hàng!");
            } else {
                Alert.alert("Thành công", response?.data?.message || "Không thể thêm vào giỏ hàng!");
            }
        } catch (error) {
            console.error("Lỗi khi thêm vào giỏ hàng:", error);
    
            // Kiểm tra có phản hồi từ server hay không
            if (error.response) {
                console.error("Lỗi từ server:", error.response.data);
                Alert.alert("Lỗi", `Server: ${error.response.data.message || "Có lỗi xảy ra!"}`);
            } else {
                Alert.alert("Lỗi", "Không thể kết nối đến server!");
            }
        }
    };
    

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Favorite Products</Text>

            {favorites.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Ionicons name="heart-dislike-outline" size={50} color="gray" />
                    <Text style={styles.emptyText}>Your favorite list is empty</Text>
                </View>
            ) : (
                <FlatList
                    data={favorites}
                    keyExtractor={(item) => item._id.toString()}
                    contentContainerStyle={styles.listContainer}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("Detail", { product: item })}
                                style={styles.imageContainer}
                            >
                                <Image
                                    source={{ uri: `${API_BASE_URL}${item.image}` }}
                                    style={styles.image}
                                />
                            </TouchableOpacity>

                            <View style={styles.infoContainer}>
                                <Text style={styles.productName}>{item.name}</Text>
                                <Text style={styles.price}>{item.price.toLocaleString()} VND</Text>
                            </View>

                            {/* Nút xóa sản phẩm khỏi danh sách yêu thích */}
                            <TouchableOpacity
                                onPress={() => removeFavorite(item._id)}
                                style={styles.heartButton}
                            >
                                <Ionicons name="heart" size={24} color="red" />
                            </TouchableOpacity>

                            {/* Nút thêm vào giỏ hàng */}
                            <TouchableOpacity
                                onPress={() => addToCart(item)}
                                style={styles.cartButton}
                            >
                                <Ionicons name="cart" size={24} color="green" />
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}
        </View>
    );
}

export default FavoriteScreen;
