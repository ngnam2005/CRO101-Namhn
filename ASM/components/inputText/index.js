import React, { useState } from "react";
import { Pressable, Text, TextInput, View, Image } from "react-native";
import { styles } from "../inputText/styles";

const Input = ({ label, placeholder, isPassword, value, onChangeText }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const onEyePress = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    secureTextEntry={isPassword && !isPasswordVisible}
                    value={value}
                    onChangeText={onChangeText} 
                />
                {isPassword ? (
                    <Pressable onPress={onEyePress} >
                        <Image
                            style={styles.eye}
                            source={isPasswordVisible ? require('../../assets/view.png') : require('../../assets/hide.png')}
                        />
                    </Pressable>
                ) : null}
                
            </View>
        </View>
    );
};

export default Input;
