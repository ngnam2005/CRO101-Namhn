import React, { useState } from "react";
import {
  View, Text, TextInput, Modal, TouchableOpacity, Image, Alert, ActivityIndicator
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import API_BASE_URL from "../localhost/localhost";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";

function AddCategory({ visible, onClose, onCategoryAdded }) {
  const [categoryName, setCategoryName] = useState("");
  const [categoryCode, setCategoryCode] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false);

  // Chọn ảnh từ thư viện
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  // Chụp ảnh từ camera
  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  // Xử lý thêm danh mục
  const handleAddCategory = async () => {
    if (!categoryName || !categoryCode || !imageUri) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    setLoading(true);

    try {
      // Chuyển ảnh thành dạng base64 để gửi lên server (nếu cần)
      const formData = new FormData();
      formData.append("name", categoryName);
      formData.append("code", categoryCode);
      formData.append("image", {
        uri: imageUri,
        type: "image/jpeg",
        name: "category.jpg",
      });

      const response = await axios.post(`${API_BASE_URL}/api/categories/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Alert.alert("Thành công", "Danh mục đã được thêm!");
      onCategoryAdded();
      onClose();
    } catch (error) {
      console.error("Lỗi khi thêm danh mục:", error);
      Alert.alert("Lỗi", "Không thể thêm danh mục!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Thêm danh mục</Text>

          {/* Nhập tên danh mục */}
          <TextInput
            placeholder="Tên danh mục"
            style={styles.input}
            value={categoryName}
            onChangeText={setCategoryName}
          />

          {/* Nhập mã danh mục */}
          <TextInput
            placeholder="Mã danh mục"
            style={styles.input}
            value={categoryCode}
            onChangeText={setCategoryCode}
          />

          {/* Chọn ảnh */}
          <View style={styles.imagePickerContainer}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.imagePreview} />
            ) : (
              <Text style={styles.imagePlaceholder}>Chưa chọn ảnh</Text>
            )}
            <View style={styles.imageButtons}>
              <TouchableOpacity onPress={pickImage} style={styles.imageButton}>
                <Ionicons name="image" size={24} color="blue" />
              </TouchableOpacity>
              <TouchableOpacity onPress={takePhoto} style={styles.imageButton}>
                <Ionicons name="camera" size={24} color="green" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Nút thêm */}
          <TouchableOpacity style={styles.addButton} onPress={handleAddCategory}>
            {loading ? <ActivityIndicator color="white" /> : <Text style={styles.addButtonText}>Thêm</Text>}
          </TouchableOpacity>

          {/* Nút đóng */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default AddCategory;
