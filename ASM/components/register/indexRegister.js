import React, { useState } from "react";
import { View, KeyboardAvoidingView, ScrollView, Text, Alert, TouchableOpacity, Platform, Image } from "react-native";
import { styles } from "./stylesRegister";
import Input from "../../components/inputText";
import axios from 'axios';
import API_BASE_URL from "../localhost/localhost";


const Register = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
    const validatePassword = (password) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password);

    const Submit = () => {
        if (!name || !email || !password || !confirmPassword) {
            Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin!");
            return;
        }
        if (!validateEmail(email)) {
            Alert.alert("Lỗi", "Email phải có định dạng @gmail.com!");
            return;
        }
        if (!validatePassword(password)) {
            Alert.alert("Lỗi", "Mật khẩu phải chứa cả chữ và số, ít nhất 6 ký tự!");
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert("Lỗi", "Mật khẩu nhập lại không khớp!");
            return;
        }

        const FormData = { name, email, password };
        axios.post(`${API_BASE_URL}/api/users/register`, FormData)
            .then(response => {
                Alert.alert("Thành công", "Tài khoản đã được tạo!");
                navigation.navigate("Login");
            })
            .catch(error => {
                Alert.alert("Lỗi", "Đăng ký thất bại. Vui lòng thử lại!");
                console.error("Lỗi đăng ký:", error.response ? error.response.data : error.message);
            });
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView style={styles.scrollView}>
                <Text style={styles.title}>Register</Text>
                <Input label="Name" placeholder="Enter your name" value={name} onChangeText={setName} />
                <Input label="Email Address" placeholder="Enter your email address" value={email} onChangeText={setEmail} />
                <Input label="Password" placeholder="*********" isPassword={true} value={password} onChangeText={setPassword} />
                <Input label="Confirm Password" placeholder="********" isPassword={true} value={confirmPassword} onChangeText={setConfirmPassword} />
                <TouchableOpacity style={styles.button} onPress={Submit}>
                    <Text style={styles.textButton}>Register</Text>
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
                                <View style={styles.loginContainer}>
                                    <Text style={styles.loginText}>Don't have an account? </Text>
                                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                                        <Text style={styles.loginLink}>Login</Text>
                                    </TouchableOpacity>
                                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default Register;
