import React, { useState } from "react";
import { Pressable, Text, TextInput, View, Image } from "react-native";
import { styles } from "../input/styles";

const Input = ({ label, placeholder, isPassword }) => {
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
                />
                {isPassword ? (
                    <Pressable onPress={onEyePress} >
                        <Image
                            style={styles.eye}
                            source={isPasswordVisible ? require('./img/view.png') : require('./img/hide.png')}
                        />
                    </Pressable>
                ) : null}
            </View>
        </View>
    );
};

export default Input;
