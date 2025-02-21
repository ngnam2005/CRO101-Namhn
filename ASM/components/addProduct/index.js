import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator } from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import API_BASE_URL from "../localhost/localhost";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";

const sizeOptions = ["S", "M", "L", "XL", "XXL"]; // Kích thước mặc định

const AddProduct = ({ navigation }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [sizes, setSizes] = useState(sizeOptions[0]);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Gọi API lấy danh mục sản phẩm
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/categories/get`);
        setCategories(response.data);
  
        // Nếu category chưa có giá trị, gán danh mục đầu tiên
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
    if (!name || !category || !stock || !sizes || !description || !image) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("stock", stock);
    formData.append("sizes", sizes);
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
    <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Thêm Sản Phẩm</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <>
          <TextInput placeholder="Tên sản phẩm" value={name} onChangeText={setName} style={styles.input} />

          {/* Picker chọn danh mục từ API */}
          <Text style={styles.label}>Loại sản phẩm:</Text>
          <Picker
  selectedValue={category}
  onValueChange={(itemValue) => {
    console.log("Chọn danh mục:", itemValue); // Debug giá trị chọn
    setCategory(itemValue); // Đảm bảo itemValue là chuỗi
  }}
  style={styles.picker}
>
  {categories.length > 0 ? (
    categories.map((cat) => (
      <Picker.Item key={cat._id} label={cat.name} value={cat._id} />
    ))
  ) : (
    <Picker.Item label="Đang tải danh mục..." value="" />
  )}
</Picker>

            <TextInput
            placeholder="Số lượng"
            value={stock}
            onChangeText={(text) => {
                const numericValue = text.replace(/[^0-9]/g, ""); // Chỉ cho nhập số
                setStock(numericValue);
            }}
            keyboardType="numeric"
            style={styles.input}
            />

          {/* Picker chọn size */}
          <Text style={styles.label}>Kích thước:</Text>
          <Picker selectedValue={sizes} onValueChange={(itemValue) => setSizes(itemValue)} style={styles.picker}>
            {sizeOptions.map((size, index) => (
              <Picker.Item key={index} label={size} value={size} />
            ))}
          </Picker>

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
    </View>
  );
};

export default AddProduct;
