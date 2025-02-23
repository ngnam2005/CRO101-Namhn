import React from "react";
import { FlatList } from "react-native";
import { View, Text, Image, StyleSheet } from "react-native";


const ForMeScreen = () => {
    const data = [
        { id: "1", title: "MONO- EP 22", image: require("../assets/22.jpg") },
        { id: "2", title: "Bản tin sáng 24h", image: require("../assets/tintuc.jpg") },
        { id: "3", title: "Highlight Bóng đá mới nhất", image: require("../assets/football.jpg") },
        { id: "4", title: "Cẩm nang du lịch và cảnh đẹp thiên nhiên hùng vĩ", image: require("../assets/travel.jpg") },
        { id: "5", title: "Top 10 khoảnh khắc ấn tượng trong thế giới Game", image: require("../assets/game.jpg") },
        { id: "6", title: "Đà nẵng - Thành phố đáng sống - Thiên nhiên - Ẩm thực", image: require("../assets/danang.jpg") },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Dành cho tôi</Text>
            <FlatList
                data={data}
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
        backgroundColor: "#eeeeee",
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
        margin: 10,
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 15

    },
    image: {
        width: "100%",
        height: 200,
        borderRadius: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
        marginTop: 5,
        paddingHorizontal: 5,
    },
});

export default ForMeScreen;
