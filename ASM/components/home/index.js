import React from "react";
import { styles } from "./styles";
import { ScrollView, View, Text, Image, FlatList, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const categories = [
  { id: 1, name: "Hoodies", image: "https://via.placeholder.com/50" },
  { id: 2, name: "Shorts", image: "https://via.placeholder.com/50" },
  { id: 3, name: "Shoes", image: "https://via.placeholder.com/50" },
  { id: 4, name: "Bag", image: "https://via.placeholder.com/50" },
  { id: 5, name: "Accessories", image: "https://via.placeholder.com/50" },
];

const products = [
  { id: 1, name: "Men's Harrington Jacket", price: "$148.00", image: "https://via.placeholder.com/100" },
  { id: 2, name: "Max Cirro Men's Slides", price: "$55.00", image: "https://via.placeholder.com/100" },
];

function Home() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Image source={require('../../assets/rv_logo.png')} style={styles.logo} />
        </TouchableOpacity>
        <Text style={{ fontSize: 16 }}>Men ▼</Text>
        <TouchableOpacity>
          <Ionicons name="person-circle" size={40} color="purple" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#aaa" style={styles.searchIcon} />
        <TextInput placeholder="Search" style={{ flex: 1 }} />
      </View>

      <Text style={{ fontWeight: "bold", fontSize: 18 }}>Categories</Text>
      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.categoryItem}>
            <Image source={{ uri: item.image }} style={styles.categoryImage} />
            <Text>{item.name}</Text>
          </View>
        )}
      />

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
    </ScrollView>
  );
}

export default Home;
