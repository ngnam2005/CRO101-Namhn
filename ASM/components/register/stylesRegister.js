import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 16,
        marginTop: 15
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#4f63ac",
        marginBottom: 8,
        textAlign: "center",

    },
    button: {
        backgroundColor: '#f0e8d7',
        padding: 5,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    }
    ,
    textButton: {
        fontSize: 20,
        color: "#4f63ac",
        marginVertical: 6,
        fontStyle:"bold"
    },
    scrollView: {
        padding: 16,
    }
    ,
    dividerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 16,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: "#e0e0e0",
    },
    dividerText: {
        marginHorizontal: 8,
        color: "#8b9bb5",
    },

    socialContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    socialButton: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderWidth: 1,
        borderColor: "#e0e0e0",
        borderRadius: 8,
        flex: 1,
        marginHorizontal: 4,
        justifyContent: "center",
    },
    socialIcon: {
        width: 24,
        height: 24,
        marginRight: 8,
    },
    loginContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 16,
    },
    loginText: {
        fontSize: 14,
        color: "#8b9bb5",
    },
    loginLink: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#0b5394",
    },
});
