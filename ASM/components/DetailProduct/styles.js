import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff",

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
    image: {
        width: "100%",
        height: 250,
        resizeMode: "contain",
        marginBottom: 10,
        marginTop: 40,

    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
    },
    priceContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
    },
    oldPrice: {
        fontSize: 16,
        textDecorationLine: "line-through",
        color: "gray",
        marginRight: 8,
    },
    newPrice: {
        fontSize: 20,
        fontWeight: "bold",
        color: "red",
    },
    sizeContainer: {
        marginVertical: 10,
    },
    sizeText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    sizeList: {
        flexDirection: "row",
        marginTop: 5,
    },
    sizeButton: {
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        marginRight: 10,
    },
    selectedSize: {
        backgroundColor: "black",
    },
    selectedSizeText: {
        color: "white",
    },
    sizeButtonText: {
        fontSize: 16,
    },
    quantityContainer: {
        marginVertical: 10,
    },
    quantityText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    quantityControls: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
    },
    quantityButton: {
        backgroundColor: "black",
        padding: 10,
        borderRadius: 5,
    },
    quantity: {
        fontSize: 18,
        marginHorizontal: 10,
    },
    description: {
        fontSize: 14,
        color: "#555",
        marginTop: 10,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginTop: 20,
        paddingHorizontal: 5,
    },
    addToCart: {
        flex: 1,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10,
        alignItems: "center",
        borderWidth: 2,
        borderColor: "black",
        marginRight: 10,
    },
    addToCartText: {
        color: "black",
        fontSize: 14,
        fontWeight: "bold",
    },
    buyNow: {
        flex: 1,
        backgroundColor: "black",
        padding: 10,
        borderRadius: 10,
        alignItems: "center",
    },
    buyNowText: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold",
    },
});
