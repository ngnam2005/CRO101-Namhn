import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import API_BASE_URL from "../localhost/localhost";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import CheckBox from "../checkBox/index"; // Import CheckBox

const sizeOptions = ["S", "M", "L", "XL", "XXL"]; // Danh sách kích thước

const AddProduct = ({ navigation }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState(""); 
  const [sizes, setSizes] = useState([]); // Mảng chứa size được chọn
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lấy danh mục sản phẩm từ API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/categories/get`);
        setCategories(response.data);
        if (!category && response.data.length > 0) {
          setCategory(response.data[0]._id);
        }
      } catch (error) {
        Alert.alert("Lỗi", "Không thể tải danh mục sản phẩm!");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Chọn ảnh từ thư viện
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Gửi dữ liệu sản phẩm lên API
  const handleSubmit = async () => {
    if (!name || !category || !stock || !price || sizes.length === 0 || !description || !image) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("stock", stock);
    formData.append("price", price);
    formData.append("sizes", JSON.stringify(sizes.map(size => size.replace(/["[\]]/g, ''))));// 🔥 Lưu sizes dưới dạng JSON chuẩn
    formData.append("description", description);
    formData.append("image", {
      uri: image,
      type: "image/jpeg",
      name: "product.jpg",
    });

    try {
      await axios.post(`${API_BASE_URL}/api/products/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      Alert.alert("Thành công", "Sản phẩm đã được thêm!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Lỗi", "Không thể thêm sản phẩm!");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Thêm Sản Phẩm</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <>
          <TextInput placeholder="Tên sản phẩm" value={name} onChangeText={setName} style={styles.input} />

          <Text style={styles.label}>Loại sản phẩm:</Text>
          <Picker selectedValue={category} onValueChange={(itemValue) => setCategory(itemValue)} style={styles.picker}>
            {categories.length > 0 ? (
              categories.map((cat) => (
                <Picker.Item key={cat._id} label={cat.name} value={cat._id} />
              ))
            ) : (
              <Picker.Item label="Đang tải danh mục..." value="" />
            )}
          </Picker>

          <TextInput placeholder="Số lượng" value={stock} onChangeText={(text) => setStock(text.replace(/[^0-9]/g, ""))} keyboardType="numeric" style={styles.input} />
          <TextInput placeholder="Giá sản phẩm" value={price} onChangeText={(text) => setPrice(text.replace(/[^0-9]/g, ""))} keyboardType="numeric" style={styles.input} />

          {/* CheckBox chọn nhiều kích thước */}
          <Text style={styles.label}>Kích thước:</Text>
          <View style={styles.checkboxContainer}>
            {sizeOptions.map((size, index) => (
              <View key={index} style={styles.checkboxItem}>
                <CheckBox 
                    checked={sizes.includes(size)} 
                    onCheck={(isChecked) => {
                      setSizes((prevSizes) => isChecked ? [...prevSizes, size] : prevSizes.filter(s => s !== size));
                    }} 
                  />
                <Text style={styles.checkboxLabel}>{size}</Text>
              </View>
            ))}
          </View>

          <TextInput placeholder="Mô tả" value={description} onChangeText={setDescription} style={styles.input} />

          <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
            <Text>Chọn Ảnh</Text>
          </TouchableOpacity>
          {image && <Image source={{ uri: image }} style={styles.image} />}

          <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Thêm</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};

export default AddProduct;
