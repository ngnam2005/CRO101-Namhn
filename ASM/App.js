import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./components/login/indexLogin";
import Register from "./components/register/indexRegister";
import WelcomeScreen from "./components/welcome/indexWelcome";
import Home from "./components/home";
import Tabs from "./components/navigation/tab";
import AddProduct from "./components/addProduct";
import DetailProduct from "./components/DetailProduct";
import UpdateProfile from "./components/updateUser/updateUser";
import ChangePassword from "./components/changePass";
import ForgotPass from "./components/forgotPass";
import Cart from "./components/cart";
import Checkout from "./components/checkout";
import categoryScreen from "./components/categoryScreen";
import orderManage from "./components/orderManage";
import SearchResults from "./components/searchScreen";
import Profile from "./components/profile";
import AddressScreen from "./components/address";
import AuthLoadingScreen from "./components/AuthLoadingScreen";




const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="AddProduct" component={AddProduct} />
        <Stack.Screen name="Detail" component={DetailProduct} />
        <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="ForgotPassword" component={ForgotPass} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Checkout" component={Checkout} />
        <Stack.Screen name="categoryScreen" component={categoryScreen} />
        <Stack.Screen name="orderManage" component={orderManage} />
        <Stack.Screen name="SearchResults" component={SearchResults} />
        <Stack.Screen name="AddressScreen" component={AddressScreen} />
        <Stack.Screen name="AuthLoadingScreen" component={AuthLoadingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
