import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View, Image } from "react-native";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";

const ListUser = ({ navigation }) => {
    const [data, setData] = useState([]);

    const getAPI = async () => {
        const url = "http://172.16.49.7:3000/users";
        try {
            let result = await fetch(url);
            result = await result.json();
            if (result) {
                setData(result);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleDelete = async (id) => {
        const url = `http://172.16.49.7:3000/users/${id}`;
        try {
            let result = await fetch(url, { method: "DELETE" });
            result = await result.json();
            if (result) {
                getAPI();
            }
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const handleUpdate = (data) => {
        navigation.navigate("AddUser", { userData: data });

    };

    useEffect(() => {
        const focusHandle = navigation.addListener("focus", getAPI);
        return () => focusHandle();
    }, [navigation]);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>List of Users</Text>

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate("AddUser")}
            >
                <Text style={styles.addButtonText}>+ Add User</Text>
            </TouchableOpacity>

            {data.length ? (
                data.map((item, index) => (
                    <View key={index} style={styles.userCard}>
                        {/* Hiển thị ảnh đại diện */}
                        <Image
                            source={item.image ? { uri: item.image } : require("../assets/avatar.jpg")}
                            style={styles.userImage}
                        />
                        <View style={styles.userInfo}>
                            <Text style={styles.userName}>{item.name}</Text>
                            <Text style={styles.userBirthday}>{item.birthday}</Text>       
                                <View style={styles.genderContainer}>
                                    <Ionicons
                                        name={
                                            item.gender === "Female" ? "female-outline" :
                                            item.gender === "Male" ? "male-outline" :
                                            "help-circle-outline"
                                        }
                                        size={20}
                                        color={
                                            item.gender === "Female" ? "pink" :
                                            item.gender === "Male" ? "blue" :
                                            "gray"
                                        }
                                    />
                                    <Text style={styles.userGender}>
                                        {item.gender || "Not specified"}
                                    </Text>
                                </View>
                        </View>
                        <View style={styles.actionButtons}>
                            <TouchableOpacity
                                style={styles.updateButton}
                                onPress={() => handleUpdate(item)}
                            >
                                <Text style={styles.buttonText}>Update</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={() => handleDelete(item.id)}
                            >
                                <Text style={styles.buttonText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))
            ) : (
                <Text style={styles.noUsers}>No users available</Text>
            )}
        </ScrollView>
    );
};

export default ListUser;
