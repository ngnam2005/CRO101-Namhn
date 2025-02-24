import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    titleContainer:{
        flexDirection:"row",
        marginTop:15
    }
    ,
    backButton: {
        marginBottom: 10,
        padding: 5,
        marginRight: 20
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#333",
    },
    productItem: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 10,
        margin: 5,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "space-between", // Giữ khoảng cách đều nhau
        height: 180, 
        width: "48%", 
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    productImage: {
        width: 100,
        height: 100,
        resizeMode: "contain",
    },
    productName: {
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "center",
        flex: 1, // Đảm bảo text không làm thay đổi kích thước ô
    },
    productPrice: {
        fontSize: 14,
        color: "#f00",
        fontWeight: "bold",
    },
    flatListContainer: {
        justifyContent: "space-between",
    },
});
