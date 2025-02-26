import React, { useEffect, useState } from "react";
import {
    View, Text, TextInput, FlatList, Image, TouchableOpacity, ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import { styles } from "./styles";
import API_BASE_URL from "../localhost/localhost";

const SearchResults = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { keyword } = route.params;

    const [searchQuery, setSearchQuery] = useState(keyword);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        fetchSearchResults();
    }, [searchQuery]);

    const fetchSearchResults = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/api/products/search`, {
                params: { name: searchQuery }
            });
            setProducts(response.data);
            setFilteredProducts(response.data); // Mặc định hiển thị tất cả sản phẩm
        } catch (error) {
            console.error("Lỗi khi tìm kiếm sản phẩm:", error);
        }
        setLoading(false);
    };

    const sortByPriceAscending = () => {
        const sorted = [...filteredProducts].sort((a, b) => a.price - b.price);
        setFilteredProducts(sorted);
    };


    const sortByPriceDescending = () => {
        const sorted = [...filteredProducts].sort((a, b) => b.price - a.price);
        setFilteredProducts(sorted);
    };

    const filterByLowPrice = () => {
        const filtered = products.filter((item) => item.price < 200000);
        setFilteredProducts(filtered);
    };

    const filterByHighPrice = () => {
        const filtered = products.filter((item) => item.price >= 200000);
        setFilteredProducts(filtered);
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.searchHeader}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={30} color="black" />
                </TouchableOpacity>
                <TextInput
                    style={styles.searchInput}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    onSubmitEditing={fetchSearchResults}
                />
                <TouchableOpacity onPress={fetchSearchResults}>
                    <Ionicons name="search" size={25} color="black" />
                </TouchableOpacity>
            </View>

            {/* Bộ lọc sản phẩm */}
            <View style={styles.filterContainer}>
                <TouchableOpacity style={styles.filterButton} onPress={sortByPriceAscending}>
                    <Text>Giá ↑</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterButton} onPress={sortByPriceDescending}>
                    <Text>Giá ↓</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterButton} onPress={filterByLowPrice}>
                    <Text>Giá &lt; 200K</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterButton} onPress={filterByHighPrice}>
                    <Text>Giá ≥ 200K</Text>
                </TouchableOpacity>
            </View>

            {/* Danh sách sản phẩm */}
            {loading ? (
                <ActivityIndicator size="large" color="blue" style={{ marginTop: 20 }} />
            ) : (
                <FlatList
                    data={filteredProducts}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.productItem}
                            onPress={() => navigation.navigate("Detail", { product: item })}
                        >
                            <Image source={{ uri: `${API_BASE_URL}${item.image}` }} style={styles.productImage} />
                            <View>
                                <Text style={styles.productName}>{item.name}</Text>
                                <Text style={styles.productPrice}>{item.price.toLocaleString()} VND</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
};

export default SearchResults;
