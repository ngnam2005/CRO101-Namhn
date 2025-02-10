import { styles } from "./stylesRegister";
import React from "react";
import Input from "../inputText";
import { View, KeyboardAvoidingView, ScrollView, Text, Image, Platform, TouchableOpacity } from "react-native";

const Resgiter = () => {
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView style={styles.scrollView}>
                <Text style={styles.title}>Register</Text>
                <Input label="Name" placeholder="Enter your name" />
                <Input label="Email Address" placeholder="Enter your email address" />
                <Input label="Password" placeholder="*********" isPassword={true} />
                <Input label="Enter password" placeholder="********" isPassword={true} />
                <TouchableOpacity style={styles.button} onPress={() => console.log('Login Pressed')}>
                    <Text style={styles.textButton}>Register</Text>
                </TouchableOpacity>
                <View style={styles.dividerContainer}>
                    <View style={styles.divider} />
                    <Text style={styles.dividerText}>Or Continueinue with</Text>
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
                    <Text style={styles.loginText}>I really have an Account  |  </Text>
                    <TouchableOpacity>
                        <Text style={styles.loginLink}>Login</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </KeyboardAvoidingView >
    );
};

export default Resgiter;