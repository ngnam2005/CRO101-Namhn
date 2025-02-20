import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AlbumScreen from "../AlbumScreen";
import SingerScreen from "../SingerScreen";
import HomeScreen from "../HomeScreen";
import TopTabs from "./topTab";
import { Ionicons } from "@expo/vector-icons";



const BottomTab = createBottomTabNavigator();

const BottomTabs = () => {
    return (
        <BottomTab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === "Home") iconName = "home-outline";
                    else if (route.name === "Album") iconName = "book-outline";
                    else if (route.name === "Singer") iconName = "musical-notes-outline";
                    return <Ionicons name={iconName} size={size} color={'white'} />;
                },
                tabBarStyle: { backgroundColor: '#a3c9eb' },
                tabBarShowLabel: true,
                tabBarActiveTintColor: "white",
                tabBarInactiveTintColor: "#a3c9eb",
                headerShown: false,
            })}
        >
            <BottomTab.Screen name='Home' component={TopTabs} />
            <BottomTab.Screen name='Album' component={AlbumScreen} />
            <BottomTab.Screen name='Singer' component={SingerScreen} />
        </BottomTab.Navigator>
    )
}
export default BottomTabs;