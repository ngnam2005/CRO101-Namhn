import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, FlatList, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";
import API_BASE_URL from "../localhost/localhost";
import { styles } from "./styles";

const CategoryScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { categoryId } = route.params || {}; // Kiểm tra nếu categoryId tồn tại

    const [category, setCategory] = useState(null); // Lưu thông tin danh mục
    const [products, setProducts] = useState([]); // Lưu danh sách sản phẩm
    const [loading, setLoading] = useState(true);

    // Lấy danh mục từ API
    const fetchCategory = async () => {
        if (!categoryId) return; 
        try {
            const response = await fetch(`${API_BASE_URL}/api/categories/getByID/${categoryId}`);
            console.log("📥 Phản hồi API danh mục:", response.status);
    
            if (!response.ok) {
                throw new Error("Không thể lấy danh mục");
            }
    
            const data = await response.json();
            console.log("✅ Dữ liệu danh mục nhận được:", data);
            setCategory(data);
        } catch (error) {
            console.error("❌ Lỗi khi lấy danh mục:", error.message);
        }
    };
    
    const fetchProductsByCategory = async () => {
        if (!categoryId) return;
        try {
            const response = await fetch(`${API_BASE_URL}/api/products/category?categoryId=${categoryId}`);
            console.log("Phản hồi API sản phẩm:", response.status);
    
            if (!response.ok) {
                throw new Error("Không thể lấy sản phẩm");
            }
    
            const data = await response.json();
            console.log("Dữ liệu sản phẩm nhận được:", data);
            setProducts(data);
        } catch (error) {
            console.error("Lỗi khi lấy sản phẩm:", error.message);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        console.log("categoryId nhận được:", categoryId);
        fetchCategory();
        fetchProductsByCategory();
    }, [categoryId]);
    

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <View style={styles.titleContainer}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>

                {/* Hiển thị danh mục */}
                {category ? (
                    <Text style={styles.title}>{category.name}</Text>
                ) : (
                    <Text style={styles.title}>Đang tải danh mục...</Text>
                )}
            </View>
           

            {/* Hiển thị danh sách sản phẩm (Giới hạn 4 sản phẩm) */}
            {loading ? (
                <Text>Đang tải sản phẩm...</Text>
            ) : products.length > 0 ? (
                <FlatList
                    data={products.length % 2 === 1 ? [...products, { _id: "dummy" }] : products} 
                    keyExtractor={(item) => item._id.toString()}
                    numColumns={2}
                    columnWrapperStyle={styles.flatListContainer}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    renderItem={({ item }) =>
                        item._id === "dummy" ? ( // Kiểm tra nếu là item rỗng
                            <View style={[styles.productItem, { backgroundColor: "transparent", elevation: 0 }]} />
                        ) : (
                            <TouchableOpacity
                                style={styles.productItem}
                                onPress={() => navigation.navigate("DetailScreen", { product: item })}
                            >
                                <Image
                                    source={{ uri: `${API_BASE_URL}${item.image}` }}
                                    style={styles.productImage}
                                />
                                <Text style={styles.productName} numberOfLines={2}>
                                    {item.name}
                                </Text>
                                <Text style={styles.productPrice}>{item.price.toLocaleString()} VND</Text>
                            </TouchableOpacity>
                        )
                    }
                />

            ) : (
                <Text>Không có sản phẩm nào trong danh mục này.</Text>
            )}
        </View>

    );
};

export default CategoryScreen;
