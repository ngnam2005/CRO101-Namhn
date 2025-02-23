import { Text, Image, View, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./stylesLogin";
import React, { useState } from "react";
import Input from "../../components/inputText";
import CheckBox from "../../components/checkBox";
import axios from "axios";
import API_BASE_URL from "../localhost/localhost";

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checked, setCheck] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Lỗi", "Vui lòng nhập email và mật khẩu!");
            return;
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/api/users/login`, { email, password });
            const user = response.data.user;
            if (user) {
                await AsyncStorage.setItem("userId", user._id); 
                Alert.alert("Thành công", `Chào mừng, ${user.name}!`);
                navigation.replace("Tabs");
            } else {
                Alert.alert("Lỗi", "Đăng nhập thất bại. Vui lòng thử lại!");
            }
        } catch (error) {
            Alert.alert("Lỗi", error.response?.data?.message || "Đăng nhập thất bại!");
            console.error("Lỗi đăng nhập:", error);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView style={styles.scrollView}>
                <Text style={styles.welcomeText}>Hi Welcome back!🖐️</Text>
                <Text style={styles.subText}>Hello again you have been missed!</Text>
                <Image style={styles.image} source={require('../../assets/rv_logo.png')} />
                <Input label="Email Address" placeholder="Enter your email" value={email} onChangeText={setEmail} />
                <Input label="Password" placeholder="*********" isPassword={true} value={password} onChangeText={setPassword} />
                
                <View style={styles.checkRow}>
                    <CheckBox checked={checked} onCheck={setCheck} />
                    <Text style={styles.checkText}>I agree with Terms & Privacy</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
                        <Text style={styles.forgotText}>Forgot password</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.welcomeText}>Login</Text>
                </TouchableOpacity>

                <View style={styles.registerContainer}>
                    <Text style={styles.registerText}>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                        <Text style={styles.registerLink}>Register</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default Login;
