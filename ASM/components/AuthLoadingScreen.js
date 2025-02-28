import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthLoadingScreen = ({ navigation }) => {
    useEffect(() => {
        checkUserLogin();
    }, []);

    const checkUserLogin = async () => {
        const userId = await AsyncStorage.getItem("userId");
        navigation.replace(userId ? "Tabs" : "Login"); // Nếu có userId -> vào thẳng Tabs
    };

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" color="blue" />
        </View>
    );
};

export default AuthLoadingScreen;
