import React, { useEffect, useState } from "react";
import { styles } from "./styles";
import { ScrollView, View, Text, Image, FlatList, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import API_BASE_URL from "../localhost/localhost";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";


const products = [
  { id: 1, name: "Men's Harrington Jacket", price: "$148.00", image: "https://via.placeholder.com/100" },
  { id: 2, name: "Max Cirro Men's Slides", price: "$55.00", image: "https://via.placeholder.com/100" },
];

function Home() {

  const navigation = useNavigation();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/categories/get`);
        setCategories(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Image source={require('../../assets/rv_logo.png')} style={styles.logo} />
        </TouchableOpacity>
        <Text style={{ fontSize: 16 }}>Men ▼</Text>
        <TouchableOpacity>
          <Ionicons name="cart" size={40} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#aaa" style={styles.searchIcon} />
        <TextInput placeholder="Search" style={{ flex: 1 }} />
      </View>

      <Text style={{ fontWeight: "bold", fontSize: 18 }}>Categories</Text>

      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <FlatList
          horizontal
          data={categories}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <View style={styles.categoryItem}>
                <Image source={{ uri: `${API_BASE_URL}${item.image}` }} style={styles.categoryImage} />
                <Text>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
      <Text style={{ fontWeight: "bold", fontSize: 18, marginTop: 16 }}>Top Selling</Text>
      <FlatList
        horizontal
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text>{item.name}</Text>
            <Text style={{ fontWeight: "bold" }}>{item.price}</Text>
          </View>
        )}
      />

      <Text style={{ fontWeight: "bold", fontSize: 18, marginTop: 16 }}>Home</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between", paddingHorizontal: 10 }}
        renderItem={({ item }) => (
          <View style={styles.productGrid}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text>{item.name}</Text>
            <Text style={{ fontWeight: "bold" }}>{item.price}</Text>
          </View>
        )}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("AddProduct")}>
        <Ionicons name="add" size={40} color="white" />
      </TouchableOpacity>
    </View>
  );
}

export default Home;
