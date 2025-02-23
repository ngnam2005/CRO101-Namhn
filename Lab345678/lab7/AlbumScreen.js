import React from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import SearchBar from "./searchBar";

const albums = [
    { id: "1", title: "The Wxrdies", artist: "Wxrdie", image: require("../assets/wxrdie.jpg") },
    { id: "2", title: "Ai cũng phải bắt đầu từ đâu đó ", artist: "HIEUTHUHAI", image: require("../assets/ht2.jpg") },
    { id: "3", title: "99%", artist: "MCK", image: require("../assets/99.jpg") },
    { id: "4", title: "Từng ngày như mãi mãi", artist: "buitruonglinh", image: require("../assets/tungngaynhumaimai.jpg") },
    { id: "5", title: "Nhân trần", artist: "Big Daddy", image: require("../assets/big.jpg") },
    { id: "6", title: "Đan xinh in love", artist: "Ariana Grande", image: require("../assets/binz.jpg") },
];

const AlbumScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Albums</Text>
            <SearchBar />
            <FlatList
                data={albums}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={styles.row}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.albumItem}>
                        <Image source={item.image} style={styles.albumImage} />
                        <Text style={styles.albumTitle} numberOfLines={1}>{item.title}</Text>
                        <Text style={styles.albumArtist} numberOfLines={1}>{item.artist}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FAFAFA", // Màu nền sáng dịu nhẹ
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 15,
        alignSelf: "center",
    },
    row: {
        justifyContent: "space-between",
    },
    albumItem: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#FFF",
        borderRadius: 12,
        padding: 10,
        margin: 5,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 3,
    },
    albumImage: {
        width: 120,
        height: 120,
        borderRadius: 10,
    },
    albumTitle: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
        marginTop: 5,
        textAlign: "center",
    },
    albumArtist: {
        fontSize: 12,
        color: "#666",
        textAlign: "center",
    },
});

export default AlbumScreen;
