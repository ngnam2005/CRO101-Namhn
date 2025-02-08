import { Text, Image, View, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { styles } from "./styles";
import React, { useState } from "react";
import Input from "./input";

const Lab4Bai3 = () => {

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
                    source={require('../lab43/img/generative-image.png')}
                />
                <Input label="Email Address" placeholder="Enter your email address" />
                <Input label="Password" placeholder="*********" isPassword={true} />
                 <View style={styles.dividerContainer}>
                    <View style={styles.divider} />
                    <Text style={styles.dividerText}>Or Login with</Text>
                    <View style={styles.divider} />
                </View>
                <View style={styles.socialContainer}>
                    <TouchableOpacity style={styles.socialButton}>
                        <Image
                            style={styles.socialIcon}
                            source={require('../lab43/img/facebook.png')}
                        />
                        <Text style={styles.socialText}>Facebook</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialButton}>
                        <Image
                            style={styles.socialIcon}
                            source={require('../lab43/img/google.png')}
                        />
                        <Text style={styles.socialText}>Google</Text>
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
export default Lab4Bai3;