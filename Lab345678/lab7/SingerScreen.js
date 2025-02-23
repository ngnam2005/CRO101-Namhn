import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Switch } from "react-native";

const SingerScreen = () => {
    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

    return (
        <View style={styles.container}>
            {/* Ảnh đại diện */}
            <Image
                source={require("../assets/avatar.jpg")}
                style={styles.avatar}
            />

            {/* Tên người dùng */}
            <Text style={styles.username}>ngnam2005</Text>

            {/* Nút bật/tắt */}
            <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>Bật thông báo</Text>
                <Switch
                    trackColor={{ false: "#ccc", true: "#007AFF" }}
                    thumbColor={isEnabled ? "#fff" : "#f4f4f4"}
                    ios_backgroundColor="#ccc"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>

            {/* Các nút chức năng */}
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Quản lý tài khoản</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Lịch sử</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Cài đặt</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.logoutButton]}>
                <Text style={[styles.buttonText, styles.logoutText]}>Đăng xuất</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
        padding: 20,
    },
    avatar: {
        width: 110,
        height: 110,
        borderRadius: 55,
        marginBottom: 15,
        borderWidth: 2,
        borderColor: "#ddd",
    },
    username: {
        fontSize: 20,
        fontWeight: "600",
        color: "#333",
        marginBottom: 20,
    },
    switchContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "85%",
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 10,
        marginBottom: 15,
        elevation: 2,
    },
    switchLabel: {
        fontSize: 16,
        fontWeight: "500",
        color: "#333",
    },
    button: {
        width: "85%",
        paddingVertical: 12,
        backgroundColor: "#3d85c6",
        borderRadius: 10,
        alignItems: "center",
        marginVertical: 6,
        elevation: 2,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "500",
    },
    logoutButton: {
        backgroundColor: "#073763",
    },
    logoutText: {
        color: "#FFF",
    },
});

export default SingerScreen;
