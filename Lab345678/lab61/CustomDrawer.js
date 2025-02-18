// CustomDrawer.js
import React from "react";
import { ImageBackground, Text, View, Image, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";

const CustomDrawer = (props) => {
    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContent}>
                <ImageBackground source={require('../assets/bg.jpg')} style={styles.imageBackground}>
                    <View style={styles.header}>
                        <Image source={require('../assets/avatar.jpg')} style={styles.avatar} />
                        <Text style={styles.userName}>Hồ Ngọc Nam</Text>
                        <Text style={styles.email}>namhnpd09895@gmail.com</Text>
                    </View>
                </ImageBackground>
                <View>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>

            <View style={styles.footer}>
                <Text style={styles.versionText}>Phiên bản 2.6.0</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    drawerContent: {
        flex: 1

    },
    email: {
        fontSize: 16,
        color: "white"
    }
    ,
    imageBackground: {
        width: '100%',
        height: 170,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: '#fff',
    },
    userName: {
        marginTop: 10,
        fontSize: 20,
        color: '#fff7e1',
        fontWeight: "bold"
    },
    footer: {
        padding: 10,
        backgroundColor: '#f4f4f4',
        alignItems: 'center',
    },
    versionText: {
        color: '#000',
        fontSize: 14,
    },
});

export default CustomDrawer;
