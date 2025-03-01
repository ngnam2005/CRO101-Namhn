import {
    Text, Image, View, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Alert
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./stylesLogin";
import React, { useState, useEffect } from "react";
import Input from "../../components/inputText";
import CheckBox from "../../components/checkBox";
import axios from "axios";
import API_BASE_URL from "../localhost/localhost";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession();

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checked, setCheck] = useState(false);



    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: "879610147658-sghin3of1q3nlddq92rndk8561bt8551.apps.googleusercontent.com",
        iosClientId: "879610147658-8ivf4d5he6ksgv6l2l1f1jq84ng3foak.apps.googleusercontent.com", // iOS Client ID
        androidClientId: "879610147658-sghin3of1q3nlddq92rndk8561bt8551.apps.googleusercontent.com", // Android Client ID
        redirectUri: "https://auth.expo.io/@hngnam04/ASM", // Đúng định dạng Expo
        scopes: ["profile", "email"],
        useProxy: true,  // ✅ Cần cho thiết bị thật
    });

    useEffect(() => {
        checkLogin();
    }, []);

    useEffect(() => {
        console.log("Google Auth Response:", response); // In response để kiểm tra

        if (response?.type === "success") {
            const { idToken } = response.authentication;
            if (idToken) {
                handleGoogleLogin(idToken);
            } else {
                Alert.alert("Lỗi", "Không thể lấy ID Token từ Google.");
            }
        } else if (response?.type === "error") {
            Alert.alert("Lỗi Google", response.error?.message || "Đăng nhập thất bại.");
            console.error("Lỗi Google Auth:", response);
        }
    }, [response]);


    const checkLogin = async () => {
        const storedUserId = await AsyncStorage.getItem("userId");
        if (storedUserId) {
            navigation.replace("Tabs"); // Nếu có userId -> vào thẳng Tabs
        }
    };

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Lỗi", "Vui lòng nhập email và mật khẩu!");
            return;
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/api/users/login`, { email, password });
            const user = response.data.user;
            if (user) {
                if (checked) {
                    await AsyncStorage.setItem("userId", user._id);
                }
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

    const handleGoogleLogin = async (idToken) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/users/google-login`, { token: idToken });
            const user = response.data.user;

            if (user) {
                await AsyncStorage.setItem("userId", user._id);
                Alert.alert("Thành công", `Chào mừng, ${user.name}!`);
                navigation.replace("Tabs");
            } else {
                Alert.alert("Lỗi", "Đăng nhập Google thất bại. Vui lòng thử lại!");
            }
        } catch (error) {
            Alert.alert("Lỗi", error.response?.data?.message || "Đăng nhập Google thất bại!");
            console.error("Lỗi đăng nhập Google:", error);
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
                    <View style={{ flexDirection: 'row' }}>
                        <CheckBox checked={checked} onCheck={setCheck} />
                        <Text style={styles.checkText}>Remember me?</Text>
                    </View>

                    <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
                        <Text style={styles.forgotText}>Forgot password</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.welcomeText}>Login</Text>
                </TouchableOpacity>

                {/* Google Login Button */}
                <View style={styles.socialContainer}>
                    <TouchableOpacity style={styles.socialButton} onPress={() => promptAsync()}>
                        <Image source={require('../../assets/google.png')} style={styles.socialIcon} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.socialButton}>
                        <Image source={require('../../assets/facebook.png')} style={styles.socialIcon} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.socialButton}>
                        <Image source={require('../../assets/apple-logo.png')} style={styles.socialIcon} />
                    </TouchableOpacity>
                </View>

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
