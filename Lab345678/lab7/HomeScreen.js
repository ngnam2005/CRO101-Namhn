import React from "react";
import { View,Text } from "react-native";

const HomeScreen = () =>{
    return(
         <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff2cc" }}>
                    <Text style={{ fontSize: 24, fontWeight: "bold", color: "#FF6C22" }}>
                Home
            </Text>
        </View>
    )
}

export default HomeScreen;
