import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./components/login/indexLogin";
import Register from "./components/register/indexRegister";
import WelcomeScreen from "./components/welcome/indexWelcome";
import Home from "./components/home";
import Tabs from "./components/navigation/tab";
import AddProduct from "./components/addProduct";


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Tabs" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={Tabs} /> 
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="AddProduct" component={AddProduct}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
