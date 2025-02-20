import React from "react";
import { View,Text } from "react-native";

const AlbumScreen = () =>{
    return(
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#d9ead3" }}>
            <Text style={{ fontSize: 24, fontWeight: "bold", color: "#FF6C22" }}>
                Album
            </Text>
        </View>

    )
}

export default AlbumScreen;
