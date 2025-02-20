import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import GameScreen from "../GameScreen";
import ForMeScreen from "../ForMeScreen";
import LiveScreen from "../LiveScreen";
import { Ionicons } from "@expo/vector-icons";


const TopTab = createMaterialTopTabNavigator();

const TopTabs = () => {
    return (
        <TopTab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color }) => {
                    let iconName;
                    if (route.name === "ForMe") iconName = "search";
                    else if (route.name === "Live") iconName = "videocam";
                    else if (route.name === "Game") iconName = "game-controller";
                    return <Ionicons name={iconName} size={18} color={'white'} />;
                },
                tabBarShowIcon: true,
                tabBarLabelStyle: { fontSize: 14, textTransform: "none", marginLeft: 5 },
                tabBarItemStyle: { flexDirection: "row", alignItems: "center", justifyContent: "center" },
                tabBarStyle: { backgroundColor: "#a3c9eb" },
                tabBarActiveTintColor: "white",
                tabBarInactiveTintColor: "#a3c9eb",
            })}
        >
            <TopTab.Screen name='Live' component={LiveScreen} />
            <TopTab.Screen name='ForMe' component={ForMeScreen} />
            <TopTab.Screen name='Game' component={GameScreen} />
        </TopTab.Navigator >
    )

}
export default TopTabs;