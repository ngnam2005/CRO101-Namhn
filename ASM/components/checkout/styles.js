import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 16,
    },
    backButton: {
        position: "absolute",
        top: 40,
        left: 16,
        zIndex: 10,
    },
    addressSelection: {
        backgroundColor: "#f8f8f8",
        padding: 12,
        borderRadius: 8,
        marginVertical: 16,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    boldText: {
        fontWeight: "bold",
        fontSize: 16,
    },
    productContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        paddingTop: 20,
        marginTop:20
    },
    image: {
        width: 80,
        height: 80,
        marginRight: 12,
        borderRadius: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
    },
    text: {
        fontSize: 14,
        color: "#555",
    },
    priceDetails: {
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: "#ddd",
        marginVertical: 16,
    },
    paymentButton: {
        backgroundColor: "#ff6600",
        padding: 14,
        borderRadius: 8,
        alignItems: "center",
    },
    paymentButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
