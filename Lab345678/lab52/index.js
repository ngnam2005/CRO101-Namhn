import React from "react";
import { View, ImageBackground, StatusBar, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

const Lab5Bai2 = () => {
    return (
        <View style={{ flex: 1 }}>
            <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
            <ImageBackground
                style={styles.background}
                source={require('../assets/background.jpg')}
                resizeMode="cover"
            >
                <View style={styles.containerText}>
                    <Text style={styles.title}>
                        Discover {"\n"}
                        world with us
                    </Text>
                    <Text style={styles.text}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Morbi et turpis metus.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Morbi et turpis metus.
                    </Text>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>
                            Get Started
                        </Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
}

export default Lab5Bai2;
