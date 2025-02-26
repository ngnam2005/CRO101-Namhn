import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginVertical: 10,
        textAlign: "center"
    },
    subtitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginVertical: 10
    },
    orderItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc"
    },
    productTitle: {
        fontWeight: "bold",
        marginTop: 5
    },
    deliverButton: {
        backgroundColor: "green",
        padding: 10,
        marginTop: 10,
        borderRadius: 5
    },
    deliverButtonText: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold"
    },
    revenueContainer: {
        marginTop: 20
    },
    revenue: {
        fontSize: 18,
        fontWeight: "bold",
        color: "green"
    },
    loadingText: {
        fontSize: 16,
        fontStyle: "italic",
        textAlign: "center",
        marginVertical: 10,
        color: "gray"
    }
});

export default styles;
