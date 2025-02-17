import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    title:{
        fontSize:26,
        marginBottom:20
    },
    input: {
        width:"80%",
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
    button:{
        backgroundColor: "#1E88E5",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginVertical: 8,
        width: 200,
        alignItems: "center",
    }
});