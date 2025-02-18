import React from "react";
import { styles } from "./styles";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import ProfileScreen from "./ProfileScreen";
import ChatScreen from "./ChatScreen";
import DetailsScreen from "./DetailsScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import 'react-native-gesture-handler';
import CustomDrawer from "./CustomDrawer";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


function Lab6Bai1() {
    return (
        <NavigationContainer>
            <Stack.Navigator >
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ title: "Welcome" }}
                />
                <Stack.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{ title: "Profile" }}
                />
                <Stack.Screen
                    name="Chat"
                    component={ChatScreen}
                    options={{ title: "Chat" }}
                />
                <Stack.Screen
                    name="Details"
                    component={DetailsScreen}
                    options={{ title: "Details" }}
                />
                <Stack.Screen
                    name="Bai2"
                    component={Lab6Bai2}
                    options={{ title: "LAB 6 Namhn" }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

function Lab6Bai2() {
    return (
        <Drawer.Navigator
        nitialRouteName="Home"
        drawerContent={props => <CustomDrawer {...props} />} 
    >
        <Drawer.Screen
            name="Home"
            component={HomeScreen}
            options={{
                drawerIcon: ({ focused, size }) => (
                    <Ionicons name="home-outline" size={size} color={focused ? '#6200EE' : '#000'} />
                ),
            }}
        />
        <Drawer.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
                drawerIcon: ({ focused, size }) => (
                    <Ionicons name="person-outline" size={size} color={focused ? '#6200EE' : '#000'} />
                ),
            }}
        />
        <Drawer.Screen
            name="Chat"
            component={ChatScreen}
            options={{
                drawerIcon: ({ focused, size }) => (
                    <Ionicons name="chatbubble-outline" size={size} color={focused ? '#6200EE' : '#000'} />
                ),
            }}
        />
        <Drawer.Screen
            name="Details"
            component={DetailsScreen}
            options={{
                drawerIcon: ({ focused, size }) => (
                    <Ionicons name="information-circle-outline" size={size} color={focused ? '#6200EE' : '#000'} />
                ),
            }}
        />
    </Drawer.Navigator>
    );
}

export default Lab6Bai1;
