import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";

const ProfileScreen = ({ route }) => {
    const { name } = route.params || {};
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>ProfileScreen</Text>
            <Text>Xin chào {name ? name : 'bạn'} 👋</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.buttonText}>Go Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Home' }],
                    });
                }}
            >
                <Text style={styles.buttonText}>Reset to Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.pop()}
            >
                <Text style={styles.buttonText}>Pop</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.popToTop()}
            >
                <Text style={styles.buttonText}>Pop to Top</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ProfileScreen;
