import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { Button } from "react-native";
import { styles } from "./styles";




const HomeScreen = ({ navigation }) => {

    const [text, onChangeText] = React.useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.title}>HomeScreen</Text>
            <Text >Input your name:</Text>
            <TextInput
                style={styles.input}
            onChangeText={onChangeText}
            value={text}
            />
            <Button
                title="Go to Profile"
                onPress={() => {
                    navigation.navigate('Profile', { name: text })
                }}
            />
        </View>
    )
}
export default HomeScreen;
