import React, { useEffect, useState, useCallback } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { styles } from "./styles";
import API_BASE_URL from "../localhost/localhost";

const Profile = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  // Hàm lấy dữ liệu user từ API
  const fetchUser = async () => {
    try {
      const id = await AsyncStorage.getItem("userId");
      console.log("User ID từ AsyncStorage:", id);

      if (!id) {
        Alert.alert("Lỗi", "Không tìm thấy thông tin tài khoản!");
        navigation.replace("Login");
        return;
      }

      setUserId(id);
      const response = await axios.get(`${API_BASE_URL}/api/users/profile/${id}`);
      console.log("Dữ liệu người dùng:", response.data);
      
      setUser(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu người dùng:", error.response?.data || error);
      Alert.alert("Lỗi", "Không thể tải thông tin tài khoản.");
    } finally {
      setLoading(false);
    }
  };

  // Gọi fetchUser khi mở màn hình Profile
  useFocusEffect(
    useCallback(() => {
      fetchUser();
    }, [])
  );

  // Hàm đăng xuất
  const handleLogout = async () => {
    await AsyncStorage.removeItem("userId");
    navigation.replace("Login");
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity>
        <Image source={require("../../assets/rv_logo.png")} style={styles.profileImage} />
      </TouchableOpacity>
      <Text style={styles.nameText}>{user?.name}</Text>
      <Text style={styles.emailText}>{user?.email}</Text>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate("UpdateProfile", { userId, refreshProfile: fetchUser })}
      >
        <Text style={styles.buttonText}>Thay đổi thông tin tài khoản</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate("ChangePassword", { userId })}
      >
        <Text style={styles.buttonText}>Đổi mật khẩu</Text>
      </TouchableOpacity>

      <View style={styles.divider} />

      <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
        <Text style={styles.buttonText}>Đăng xuất</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Profile;
