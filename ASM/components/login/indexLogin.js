import { Text, Image, View, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
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

    const handleLogin = () => {
        if (!email || !password) {
            alert("Vui lòng nhập email và mật khẩu!");
            return;
        }
    
        axios.post(`${API_BASE_URL}/api/users/login`, { email, password })
            .then(response => {
                alert(`Chào mừng, ${response.data.user.name}!`);
                navigation.navigate("Tabs"); 
            })
            .catch(error => {
                alert(error.response?.data?.message || "Đăng nhập thất bại. Vui lòng thử lại!");
                console.error("Lỗi đăng nhập:", error);
            });
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView style={styles.scrollView}>
                <Text style={styles.welcomeText}>Hi Welcome back!🖐️</Text>
                <Text style={styles.subText}>Hello again you have been missed!</Text>
                <Image
                    style={styles.image}
                    source={require('../../assets/rv_logo.png')}
                />
                <Input label="Email Address" placeholder="Enter your email address" value={email} onChangeText={setEmail} />
                <Input label="Password" placeholder="*********" isPassword={true} value={password} onChangeText={setPassword} />
                <View style={styles.checkRow}>
                    <CheckBox checked={checked} onCheck={setCheck} />
                    <Text style={styles.checkText}>I agree with Terms & Privacy</Text>
                    <TouchableOpacity>
                        <Text style={styles.forgotText}>Forgot password</Text>
                    </TouchableOpacity>
                </View>


                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.welcomeText}>Login</Text>
                </TouchableOpacity>
                <View style={styles.dividerContainer}>
                    <View style={styles.divider} />
                    <Text style={styles.dividerText}>Or Login with</Text>
                    <View style={styles.divider} />
                </View>
                <View style={styles.socialContainer}>
                    <TouchableOpacity style={styles.socialButton}>
                        <Image
                            style={styles.socialIcon}
                            source={require('../../assets/facebook.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialButton}>
                        <Image
                            style={styles.socialIcon}
                            source={require('../../assets/apple-logo.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialButton}>
                        <Image
                            style={styles.socialIcon}
                            source={require('../../assets/google.png')}
                        />
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
