import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginVertical: 20,
        textAlign: "center",
        color: "blue"
    },
    removeAll: {
        color: "red",
        textAlign: "right",
        marginBottom: 10,
    },
    cartItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    productImage: {
        width: 60,
        height: 60,
        marginRight: 10,
        borderRadius: 5,
    },
    productInfo: {
        flex: 1,
    },
    quantityControls: {
        flexDirection: "row",
        alignItems: "center",
    },
    quantityText: {
        fontSize: 16,
        marginHorizontal: 10,
    },
    boldText: {
        fontWeight: "bold",
    },
    deleteButton: {
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
        width: 80,
        borderRadius: 10,
        marginBottom: 10,
    },
    priceDetails: {
        marginTop: 20,
    },
    checkoutButton: {
        backgroundColor: "#4CAF50",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 20,
    },
    checkoutText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    emptyCartContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 20
    },
    emptyCartText: {
        marginTop: 10,
        fontSize: 30,
        fontWeight: "bold",
        color: "#888",
        textAlign: "center"

    },
    imageCart: {
        width: 150,
        height: 150,
        resizeMode: "cover"
    },
    backButton: {
        position: "absolute",
        top: 40,
        left: 20,
        zIndex: 10,
        backgroundColor: "#eee",
        padding: 8,
        borderRadius: 50,
    },
});

export default styles;
