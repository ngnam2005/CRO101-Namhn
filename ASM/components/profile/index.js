import React from "react";
import { styles } from "./styles";
import { View, Text, Image, FlatList, TextInput, TouchableOpacity, ScrollView } from "react-native";



function Profile() {
  return (
    <ScrollView style={styles.container}>
    <TouchableOpacity>
      <Image source={require('../../assets/rv_logo.png')} style={styles.profileImage} />
    </TouchableOpacity>
    <Text style={styles.nameText}>Ho Ngoc Nam</Text>
    <Text style={styles.emailText}>namhn@gmail.com</Text>
  
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Thay đổi thông tin tài khoản</Text>
    </TouchableOpacity>
  
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Đổi mật khẩu</Text>
    </TouchableOpacity> 
  
    <View style={styles.driver}/>
  
    <TouchableOpacity style={[styles.button, styles.logoutButton]}>
      <Text style={styles.buttonText}>Đăng xuất</Text>
    </TouchableOpacity> 
  </ScrollView>
  
    
  );
}
export default Profile;

