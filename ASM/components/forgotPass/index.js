import React, { useState } from "react";
import { styles } from "./styles";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import API_BASE_URL from "../localhost/localhost";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from "react-native";


const ForgotPass = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleForgotPass = async () => {
        if (!email.trim()) {
            Alert.alert("Lỗi", "Vui lòng nhập email của bạn ");
            return;

        }
        setLoading(true);
        setMessage("");
        try {
            const response = await axios.post(`${API_BASE_URL}/api/users/forgot-password`, { email });
            console.log("Phản hồi từ API: ", response.data);
            setMessage("Mật khẩu đã được gửi vào email của bạn");

        } catch (error) {
            console.error("Lỗi khi gửi email", error.response?.data || error);
            Alert.alert("Lỗi: ", error.response?.data?.message || "Có lỗi xảy ra khi gửi email.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Quên Mật Khẩu</Text>
            <TextInput
                style={styles.input}
                placeholder="Nhập email của bạn"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            >
            </TextInput>

            <TouchableOpacity style={styles.button} onPress={handleForgotPass} disabled={loading}>
                <Text style={styles.buttonText}>Gửi yêu cầu</Text>
            </TouchableOpacity>

            {loading && <ActivityIndicator size="large" color="#007BFF" style={{ marginTop: 20 }} />}

            {message ? <Text style={styles.successText}>{message}</Text> : null}

            <TouchableOpacity style={[styles.button, styles.backButton]} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Quay lại</Text>
            </TouchableOpacity>

        </View>
    );

}

export default ForgotPass;