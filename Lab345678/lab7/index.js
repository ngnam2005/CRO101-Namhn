import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SingerScreen from "./SingerScreen";
import HomeScreen from "./HomeScreen";
import AlbumScreen from "./AlbumScreen";

const Tab = createBottomTabNavigator();

const ICONS_MENU = {
    Home: "home",
    Album: "albums",
    Singer: "person",
};

const renderLabel = ({ focused, color, children }) => {
    return focused ? (
        <Text style={{ color, fontSize: 12 }}>{children}</Text>
    ) : null;
};
const renderIcon = (iconName, { color, size }) => {
    return <Ionicons name={iconName} size={size} color={color} />;
};

const Lab7 = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: "#FF6C22",
                    tabBarLabelStyle: { flexDirection: "row" },
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        tabBarIcon: props => renderIcon(ICONS_MENU.Home, props),
                        tabBarLabel: props => renderLabel({ ...props, children: "Home" }),
                    }}
                />
                <Tab.Screen
                    name="Album"
                    component={AlbumScreen}
                    options={{
                        tabBarIcon: props => renderIcon(ICONS_MENU.Album, props),
                        tabBarLabel: props => renderLabel({ ...props, children: "Album" }),
                    }}
                />
                <Tab.Screen
                    name="Singer"
                    component={SingerScreen}
                    options={{
                        tabBarIcon: props => renderIcon(ICONS_MENU.Singer, props),
                        tabBarLabel: props => renderLabel({ ...props, children: "Singer" }),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default Lab7;
