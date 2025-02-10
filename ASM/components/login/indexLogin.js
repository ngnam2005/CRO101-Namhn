import { Text, Image, View, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Button } from "react-native";
import { styles } from "./stylesLogin";
import React, { useState } from "react";
import Input from "../../components/inputText";

const Login = () => {

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
                    source={require('../../assets/icon.png')}
                />
                <Input label="Email Address" placeholder="Enter your email address" />
                <Input label="Password" placeholder="*********" isPassword={true} />
                <TouchableOpacity>
                    <Text style={styles.forgotText}>Forgot password</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => console.log('Login Pressed')}>
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
                    <TouchableOpacity>
                        <Text style={styles.registerLink}>Register</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </KeyboardAvoidingView>
    );
};
export default Login;