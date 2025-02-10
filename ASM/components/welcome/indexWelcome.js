import React from "react";
import styles from "./stylesWelcome";

import { ImageBackground, Text, View, TouchableOpacity } from "react-native";

const WelcomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../../assets/bg.jpg")}
      style={styles.container}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>You want Authentic, here you go!</Text>
        <Text style={styles.subtitle}>Find it here, buy it now!</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Login")} 
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default WelcomeScreen;
