import { Text, Image, View, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { styles } from "./stylesLogin";
import React, { useState } from "react";
import Input from "../../components/inputText";
import CheckBox from "../../components/checkBox";
import axios from "axios";

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checked, setCheck] = useState(false);

    const handleLogin = () => {
        if (!email || !password) {
            alert("Please enter email and password");
            return;
        }
    
        axios.get(`https://67b37c2b392f4aa94fa75ff8.mockapi.io/account`, {
            params: {
                email: email,
                password: password
            }
        })
        .then(response => {
            if (response.data.length > 0) {
                const user = response.data[0];
                console.log("Login successful:", user);
                alert(`Welcome, ${user.name}!`);
                navigation.navigate("Register"); 
            } else {
                alert("Invalid email or password. Please try again.");
            }
        })
        .catch(error => {
            console.error("Login failed:", error);
            alert("An error occurred. Please try again.");
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
