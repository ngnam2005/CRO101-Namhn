import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import AlbumScreen from "./AlbumScreen";
import SingerScreen from "./SingerScreen";
import HomeScreen from "./HomeScreen";

const TopTab = createMaterialTopTabNavigator();

const TopTabs = () => {
    return (
        <NavigationContainer>
            <TopTab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: 'FF6C22',
                    tabBarInactiveTintColor: 'white',
                    tabBarIndicatorStyle: { backgroundColor: "white", height: 2 },
                    tabBarStyle: { backgroundColor: "#FF6C22" },
                    tabBarLabelStyle: { fontWeight: "bold", fontSize: 14, color: 'white' },
                }}
            >
                <TopTab.Screen name="Home" component={HomeScreen} />
                <TopTab.Screen name="Album" component={AlbumScreen} />
                <TopTab.Screen name="Singer" component={SingerScreen} />
            </TopTab.Navigator>
        </NavigationContainer>
    );
};

export default TopTabs;
