import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { styles } from "./styles";
import API_BASE_URL from "../localhost/localhost";

const ChangePassword = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { userId } = route.params;

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const validatePassword = (newPassword) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(newPassword);

    const handleChangePassword = async () => {
        if (!oldPassword.trim() || !newPassword.trim() || !confirmPassword.trim()) {
            Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin!");
            return;
        }
    
        if (newPassword !== confirmPassword) {
            Alert.alert("Lỗi", "Mật khẩu mới và xác nhận không khớp!");
            return;
        }
    
        if (!validatePassword(newPassword)){
            Alert.alert("Lỗi", "Mật khẩu mới không hợp lệ! (Tối thiểu 6 ký tự, gồm chữ và số)");
            return;
        }
    
        try {
            console.log("Dữ liệu gửi lên:", { userId, oldPassword, newPassword });
    
            const response = await axios.put(
                `${API_BASE_URL}/api/users/change-password/${userId}`, 
                { oldPassword, newPassword }, 
                { headers: { "Content-Type": "application/json" } }
            );
    
            console.log("Phản hồi từ API:", response.data);
            Alert.alert("Thành công", "Đổi mật khẩu thành công!");
            navigation.goBack();
        } catch (error) {
            console.error("Lỗi đổi mật khẩu:", error.response?.data || error);
            Alert.alert("Lỗi", error.response?.data?.message || "Có lỗi xảy ra khi đổi mật khẩu");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Đổi mật khẩu</Text>
            <TextInput 
                style={styles.input} 
                placeholder="Mật khẩu cũ" 
                secureTextEntry 
                value={oldPassword} 
                onChangeText={setOldPassword} 
            />
            <TextInput 
                style={styles.input} 
                placeholder="Mật khẩu mới" 
                secureTextEntry 
                value={newPassword} 
                onChangeText={setNewPassword} 
            />
            <TextInput 
                style={styles.input} 
                placeholder="Xác nhận mật khẩu mới" 
                secureTextEntry 
                value={confirmPassword} 
                onChangeText={setConfirmPassword} 
            />

            <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
                <Text style={styles.buttonText}>Đổi mật khẩu</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.backButton]} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Quay lại</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ChangePassword;
