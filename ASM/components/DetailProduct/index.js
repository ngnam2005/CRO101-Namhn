import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import API_BASE_URL from "../localhost/localhost";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert } from "react-native";


const DetailProduct = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { product } = route.params || {};

    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");

    const increaseQuantity = () => setQuantity(quantity + 1);
    const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1);
    const sizes = product.sizes?.map(size => size.replace(/["[\]]/g, '')) || [];

    const addToCart = async () => {
        try {
            const userId = await AsyncStorage.getItem("userId");
            if (!userId) {
                Alert.alert("Lỗi", "Bạn cần đăng nhập để thêm vào giỏ hàng!");
                return;
            }
    
            const cartItem = {
                userId,
                productId: product._id,
                name: product.name,
                image: product.image,
                price: product.price,
                size: selectedSize,
                quantity,
            };
    
            console.log("Dữ liệu gửi lên API:", cartItem); 
    
            await axios.post(`${API_BASE_URL}/api/carts/add`, cartItem);
            navigation.navigate("Cart");
    
        } catch (error) {
            Alert.alert("Lỗi", "Không thể thêm vào giỏ hàng!");
            console.error("Lỗi khi thêm vào giỏ hàng:", error);
        }
    };
    



    return (
        <View style={styles.container}>
            {/* Nút Back */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <View>
                <Image source={{ uri: `${API_BASE_URL}${product.image}` }} style={styles.image} />
            </View>
            <Text style={styles.title}>{product.name}</Text>
            <View style={styles.priceContainer}>
                <Text style={styles.oldPrice}>${product.oldPrice}</Text>
                <View>
                    <Text style={styles.newPrice}>${product.price}</Text>
                    <Text >Count: {product.stock}</Text>
                </View>
            </View>


            <View style={styles.sizeContainer}>
                <Text style={styles.sizeText}>Size</Text>
                <View style={styles.sizeList}>
                    {sizes.map((size) => (
                        <TouchableOpacity
                            key={size}
                            style={[
                                styles.sizeButton,
                                selectedSize === size && styles.selectedSize
                            ]}
                            onPress={() => setSelectedSize(size)}
                        >
                            <Text style={[
                                styles.sizeButtonText,
                                selectedSize === size && styles.selectedSizeText
                            ]}>
                                {size}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>


            {/* Chọn số lượng */}
            <View style={styles.quantityContainer}>
                <Text style={styles.quantityText}>Quantity</Text>
                <View style={styles.quantityControls}>
                    <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
                        <Ionicons name="remove" size={20} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{quantity}</Text>
                    <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
                        <Ionicons name="add" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Mô tả sản phẩm */}
            <Text style={styles.description}>{product.description}</Text>

            {/* Nút Thêm vào giỏ hàng */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.addToCart} onPress={addToCart}>
                    <Text style={styles.addToCartText}>${product.price * quantity} | Add to Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buyNow}>
                    <Text style={styles.buyNowText}>${product.price * quantity} | Buy Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default DetailProduct;
