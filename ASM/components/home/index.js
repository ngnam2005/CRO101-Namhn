import React, { useEffect, useState, useCallback } from "react";
import {
  View, Text, Image, FlatList, TextInput, TouchableOpacity,
  ActivityIndicator, ScrollView, RefreshControl
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./styles";
import API_BASE_URL from "../localhost/localhost";


function Home() {
  const navigation = useNavigation();
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [randomProducts, setRandomProducts] = useState([]);


  // Top Selling 
  const fetchRandomProducts = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/products/random`);
        setRandomProducts(response.data);
    } catch (error) {
        console.error("Lỗi khi lấy sản phẩm ngẫu nhiên:", error);
    }
};
  // Lấy danh mục sản phẩm
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/categories/get`);
      setCategories(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh mục:", error);
    }
  };

  // Lấy danh sách sản phẩm
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/products/get`);
      setProduct(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm:", error);
    }
  };

  // Lấy số lượng sản phẩm trong giỏ hàng
  const fetchCartCount = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) {
        console.warn("UserId không tồn tại trong AsyncStorage");
        setCartCount(0);
        return;
      }

      if (!/^[0-9a-fA-F]{24}$/.test(userId)) {
        console.warn("UserId không hợp lệ!");
        setCartCount(0);
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/api/carts/${userId}/count`);
      setCartCount(response.data.count);
    } catch (error) {
      console.error("Lỗi khi lấy số lượng giỏ hàng:", error);
      setCartCount(0);
    }
  };

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

      await axios.post(`${API_BASE_URL}/api/carts/add`, cartItem);

      // Tăng số lượng giỏ hàng ngay lập tức thay vì gọi lại API
      setCartCount((prevCount) => prevCount + 1);

      Alert.alert("Thành công", "Sản phẩm đã được thêm vào giỏ hàng!");

    } catch (error) {
      Alert.alert("Lỗi", "Không thể thêm vào giỏ hàng!");
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
    }
  };
  // Load dữ liệu khi vào màn hình
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchCategories();
      await fetchProducts();
      await fetchCartCount();
      await fetchRandomProducts();
      setLoading(false);
    };
    loadData();
  }, []);

  // Cập nhật giỏ hàng khi quay lại màn hình
  useFocusEffect(
    useCallback(() => {
      fetchCartCount();
    }, [])
  );

  // Hàm xử lý kéo để làm mới dữ liệu
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchCategories();
    await fetchProducts();
    await fetchCartCount();
    await addToCart();
    setRefreshing(false);
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Image source={require('../../assets/rv_logo.png')} style={styles.logo} />
        </TouchableOpacity>
        <Text style={{ fontSize: 16 }}>Men </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
          <View>
            <Ionicons name="bag" size={40} color="black" />
            {cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartCount}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>

      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={() => {
          if (searchQuery.trim() !== "") {
            navigation.navigate("SearchResults", { keyword: searchQuery });
          }
        }}>
          <Ionicons name="search" size={20} color="#aaa" style={styles.searchIcon} />
        </TouchableOpacity>

        <TextInput
          placeholder="Search"
          style={{ flex: 1 }}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={() => {
            if (searchQuery.trim() !== "") {
              navigation.navigate("SearchResults", { keyword: searchQuery });
            }
          }}
        />
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
                <TouchableOpacity onPress={() => navigation.navigate("categoryScreen", { categoryId: item._id })}>
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
            data={randomProducts} // Sử dụng danh sách sản phẩm ngẫu nhiên
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item }) => (
                <View style={styles.productContainer}>
                    <TouchableOpacity
                     onPress={() => navigation.navigate("Detail", { product: item })}
                    >
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
                onPress={() => navigation.navigate("Detail", { product: item })}
              >
                <Image source={{ uri: `${API_BASE_URL}${item.image}` }} style={styles.productGridImage} />
                <Text style={styles.productName}>
                  {item.name.length > 15 ? item.name.substring(0, 14) + "..." : item.name}
                </Text>
                <Text style={styles.productGridPrice}>{item.price.toLocaleString()} VND</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.addToCartButton} onPress={() => addToCart(item)}>
                <Ionicons name="add-circle" size={24} color="#FF5733" />
              </TouchableOpacity>
            </View>
          )}
          extraData={cartCount} 
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
