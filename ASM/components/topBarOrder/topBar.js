import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ShippingScreen from "../order/Shipping";
import DoneOrderScreen from "../order/DoneOrder";
import ConfirmScreen from "../order/Confirm";

const TopTab = createMaterialTopTabNavigator();

const TopTabs = () => {
  return (
    <TopTab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabel: ({ focused, color }) => {
          let iconName;
          let label;

          if (route.name === "Xác nhận") {
            iconName = focused ? "checkmark-circle" : "checkmark-circle-outline";
            label = "Xác nhận";
          } else if (route.name === "Đang giao") {
            iconName = focused ? "bicycle" : "bicycle-outline";
            label = "Đang giao";
          } else if (route.name === "Hoàn thành") {
            iconName = focused ? "checkmark-done" : "checkmark-done-outline";
            label = "Hoàn thành";
          }

          return (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name={iconName} size={20} color={color} />
              <Text style={{ marginLeft: 5, color }}>{label}</Text>
            </View>
          );
        },
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
        tabBarIndicatorStyle: { backgroundColor: "blue" },
      })}
    >
      <TopTab.Screen name="Xác nhận" component={ConfirmScreen} />
      <TopTab.Screen name="Đang giao" component={ShippingScreen} />
      <TopTab.Screen name="Hoàn thành" component={DoneOrderScreen} />
    </TopTab.Navigator>
  );
};

export default TopTabs;
