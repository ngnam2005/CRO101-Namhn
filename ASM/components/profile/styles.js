import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        padding: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: "center",
        marginVertical: 20,
    },
    nameText: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 5,
    },
    emailText: {
        fontSize: 16,
        color: "gray",
        textAlign: "center",
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#0b5394",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginVertical: 10,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    logoutButton: {
        backgroundColor: "#990000",
    },
    driver: {
        flex: 1,
        height: 2,
        backgroundColor: "#e0e0e0",
        marginHorizontal: 20,
    }
});
