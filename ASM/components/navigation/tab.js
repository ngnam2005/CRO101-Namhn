import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Home from "../home";
import Profile from "../profile";
import Cart from "../cart";
import OrderScreen from "../order";
import FavoriteScreen from "../favoriteScreen";



const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === "Home") {
                        iconName = focused ? "home" : "home-outline";
                    } else if (route.name === "Order") {
                        iconName = focused ? "cart" : "cart-outline";
                    } else if (route.name === "Profile") {
                        iconName = focused ? "person" : "person-outline";
                    }
                    else if (route.name === "Cart") {
                        iconName = focused ? "bag" : "bag-outline";
                    }
                    else if (route.name === "Favorite") {
                        iconName = focused ? "heart" : "heart-outline";
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: "#6200EE", 
                tabBarInactiveTintColor: "gray", 
                tabBarStyle: {
                    backgroundColor: "#f8f8f8", 
                    paddingBottom: 5, 
                    height: 60, 
                },
                headerShown: false,
            })}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Cart" component={Cart} />
            <Tab.Screen name="Order" component={OrderScreen} />
            <Tab.Screen name="Favorite" component={FavoriteScreen} />
            <Tab.Screen name="Profile" component={Profile} />
            
        </Tab.Navigator>
    );
};

export default Tabs;
