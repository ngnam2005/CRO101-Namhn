import React from "react";
import { FlatList, View, Text, Image, StyleSheet } from "react-native";

const GameScreen = () => {
    const games = [
        { id: "1", title: "Liên Quân Mobile", image: require("../assets/lq.jpg") },
        { id: "2", title: "PUBG Mobile", image: require("../assets/pubg.png") },
        { id: "3", title: "Free Fire", image: require("../assets/ff.png") },
        { id: "4", title: "GTA V Online", image: require("../assets/gt5.jpg") },
        { id: "5", title: "FIFA Online 4", image: require("../assets/football.jpg") },
        { id: "6", title: "Minecraft", image: require("../assets/minecraft.jpg") },
        { id: "7", title: "Free Fire", image: require("../assets/ff.png") },
        { id: "8", title: "Roblox", image: require("../assets/roblox.png") },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Game</Text>
            <FlatList
                data={games}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Image source={item.image} style={styles.image} />
                        <Text style={styles.title}>{item.title}</Text>
                    </View>
                )}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#FF0000",
        marginBottom: 10,
        alignSelf: "center",
    },
    item: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 40, // Biến ảnh thành hình tròn
        marginRight: 15,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
    },
});

export default GameScreen;
