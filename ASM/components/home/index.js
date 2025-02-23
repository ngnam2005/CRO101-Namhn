import React, { useEffect, useState, useCallback } from "react";
import { 
  View, Text, Image, FlatList, TextInput, TouchableOpacity, 
  ActivityIndicator, ScrollView, RefreshControl 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import API_BASE_URL from "../localhost/localhost";

function Home() {
  const navigation = useNavigation();
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // Thêm state để kiểm soát refresh

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/categories/get`);
      setCategories(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh mục:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/products/get`);
      setProduct(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm:", error);
    }
  };

  // Load dữ liệu khi vào màn hình
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchCategories();
      await fetchProducts();
      setLoading(false);
    };
    loadData();
  }, []);

  // Hàm xử lý kéo để làm mới dữ liệu
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchCategories();
    await fetchProducts();
    setRefreshing(false);
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Image source={require('../../assets/rv_logo.png')} style={styles.logo} />
        </TouchableOpacity>
        <Text style={{ fontSize: 16 }}>Men ▼</Text>
        <TouchableOpacity>
          <Ionicons name="cart" size={40} color="black" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#aaa" style={styles.searchIcon} />
        <TextInput placeholder="Search" style={{ flex: 1 }} />
      </View>

      {/* Nội dung có thể làm mới */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Categories */}
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>Categories</Text>
        {loading ? (
          <ActivityIndicator size="large" color="blue" />
        ) : (
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item }) => (
              <View style={styles.categoryItem}>
                <TouchableOpacity>
                  <Image source={{ uri: `${API_BASE_URL}${item.image}` }} style={styles.categoryImage} />
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}

        {/* Top Selling */}
        <Text style={{ fontWeight: "bold", fontSize: 18, marginTop: 16 }}>Top Selling</Text>
        {loading ? (
          <ActivityIndicator size="large" color="blue" />
        ) : (
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={product}
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item }) => (
              <View style={styles.productContainer}>
                <TouchableOpacity>
                  <Image source={{ uri: `${API_BASE_URL}${item.image}` }} style={styles.productImage} />
                  <Text style={styles.productName}>
                    {item.name.length > 15 ? item.name.substring(0, 12) + "..." : item.name}
                  </Text>
                  <Text style={styles.productPrice}>{item.price.toLocaleString()} VND</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}

        {/* Home Products */}
        <Text style={{ fontWeight: "bold", fontSize: 18, marginTop: 16 }}>Home</Text>
        {loading ? (
          <ActivityIndicator size="large" color="blue" />
        ) : (
          <FlatList
            data={product}
            keyExtractor={(item) => item._id.toString()}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            contentContainerStyle={{ paddingHorizontal: 10 }}
            renderItem={({ item }) => (
              <View style={styles.productGrid}>
                <TouchableOpacity 
                  style={styles.productCard} 
                  onPress={() => navigation.navigate("Detail", { product: item })}>
                  <Image source={{ uri: `${API_BASE_URL}${item.image}` }} style={styles.productGridImage} />
                  <Text style={styles.productName}>
                    {item.name.length > 15 ? item.name.substring(0, 14) + "..." : item.name}
                  </Text>
                  <Text style={styles.productGridPrice}>{item.price.toLocaleString()} VND</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </ScrollView>

      
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("AddProduct")}>
        <Ionicons name="add" size={40} color="white" />
      </TouchableOpacity>
    </View>
  );
}

export default Home;
