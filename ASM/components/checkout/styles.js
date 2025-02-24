import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
        paddingTop: 55
    },
    backButton: {
        position: "absolute",
        top: 25,
        left: 20
    },
    productContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f8f8f8",
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    image: {
        width: 80,
        height: 80,
        resizeMode: "contain",
        borderRadius: 10,
        marginRight: 10
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5
    },
    text: {
        fontSize: 16,
        marginBottom: 3
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        marginTop: 10,
        marginBottom: 10
    },
    paymentButton: {
        backgroundColor: "#ff6600",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 20
    },
    paymentButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold"
    },
    boldText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    
    
});
