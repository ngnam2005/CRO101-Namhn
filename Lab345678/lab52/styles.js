import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    containerText: {
        position: 'absolute',
        top: "50%",
        paddingHorizontal: 30,
    },
    title: {
        fontFamily: 'Anton',
        fontSize: 28,
        color: '#fff',
        textAlign: 'left',
    },
    text: {
        fontFamily: 'NotoSerif-Italic',
        fontSize: 16,
        color: '#fff',
        textAlign: 'left',
        marginTop: 10,
    },
    button: {
        marginTop: 20,
        backgroundColor: "#fff",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        width: 200,

    },
    buttonText: {
        fontFamily: 'NotoSerif',
        fontSize: 18,
        color: '#333',
        textAlign: 'center',
        fontWeight: 'bold',
    }
});
