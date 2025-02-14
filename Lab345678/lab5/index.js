import React from "react";
import { View, Text } from "react-native";
import { styles } from "./styles";
import { useFonts } from 'expo-font';

const Lab5Bai1 = () => {
    const [fontsLoaded] = useFonts({
        "Anton": require("../assets/fonts/Anton-Regular.ttf"),
        "NotoSerif": require("../assets/fonts/NotoSerif-VariableFont_wdth,wght.ttf"),
        "NotoSerif-Italic": require("../assets/fonts/NotoSerif-Italic-VariableFont_wdth,wght.ttf")
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.containerView}>
            <Text style={styles.fontText}>
                React Native là các đoạn code đã được viết sẵn {"{ Framework }"}
                do công ty công nghệ Facebook phát triển. Các lập trình React Native là những
                người sử dụng những {"{ Framework }"} này để phát triển nên các hệ thống,
                nền tảng ứng dụng trên các hệ điều hành như IOS và Android. Ngôn ngữ được sử dụng
                nhiều nhất là JavaScript.
            </Text>
            <Text style={styles.text}>
                React Native là các đoạn code đã được viết sẵn {"{ Framework }"}
                do công ty công nghệ Facebook phát triển. Các lập trình React Native là những
                người sử dụng những {"{ Framework }"} này để phát triển nên các hệ thống,
                nền tảng ứng dụng trên các hệ điều hành như IOS và Android. Ngôn ngữ được sử dụng
                nhiều nhất là JavaScript.
            </Text>
        </View>
    );
}

export default Lab5Bai1;
