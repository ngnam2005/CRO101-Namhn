import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { styles } from "./styles";
import API_BASE_URL from "../localhost/localhost";
import { Ionicons } from "@expo/vector-icons";

const UpdateProfile = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { userId, refreshProfile } = route.params;

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/users/profile/${userId}`);
                
                console.log("Dữ liệu user:", response.data); // Kiểm tra dữ liệu API trả về

                if (response.data) {
                    setName(response.data.name || ""); 
                    setEmail(response.data.email || ""); 
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu người dùng:", error);
            }
        };

        fetchUser();
    }, [userId]); 

    const handleUpdateProfile = async () => {
        if (!password.trim()) {
            Alert.alert("Lỗi", "Vui lòng nhập mật khẩu để xác nhận!");
            return;
        }
    
        try {
            console.log("Dữ liệu gửi lên:", { userId, email, name, password });
    
            const response = await axios.put( 
                `${API_BASE_URL}/api/users/update-profile`,  
                { userId, email, name, password },
                { headers: { "Content-Type": "application/json" } }
            );
    
            console.log("Phản hồi từ API:", response.data);
            Alert.alert("Thành công", response.data.message);
            if (refreshProfile) refreshProfile();
            navigation.goBack();
        } catch (error) {
            console.error("Lỗi cập nhật:", error.response?.data || error);
            Alert.alert("Lỗi", error.response?.data?.message || "Có lỗi xảy ra khi cập nhật");
        }
    };
    

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.title}>Cập nhật thông tin</Text>
            <TextInput 
                style={styles.input} 
                placeholder="Tên mới" 
                value={name} 
                onChangeText={setName} 
            />
            <TextInput 
                style={styles.input} 
                placeholder="Email" 
                value={email} 
                editable={false} 
            />
            <TextInput 
                style={styles.input} 
                placeholder="Mật khẩu để xác nhận" 
                secureTextEntry 
                value={password} 
                onChangeText={setPassword} 
            />

            <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
                <Text style={styles.buttonText}>Cập nhật</Text>
            </TouchableOpacity>
        </View>
    );
};

export default UpdateProfile;
