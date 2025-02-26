import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const AddUser = ({ navigation, route }) => {
  const userData = route.params?.userData || null;

  const [image, setImage] = useState(userData?.image || null);
  const [name, setName] = useState(userData?.name || "");
  const [birthdate, setBirthdate] = useState(userData?.birthday || "");
  const [gender, setGender] = useState(userData?.gender || "Male");



  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    const url = userData
      ? `http://172.16.49.7:3000/users/${userData.id}`
      : "http://172.16.49.7:3000/users";

    const method = userData ? "PUT" : "POST";

    try {
      let result = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, birthday: birthdate, image, gender }),
      });
      result = await result.json();
      if (result) {
        alert(userData ? "Cập nhật thành công!" : "Thêm mới thành công!");
        navigation.goBack();
      }
    } catch (error) {
      console.error("Lỗi khi lưu dữ liệu:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={stylesAdd.container}
    >
      <ScrollView contentContainerStyle={stylesAdd.content}>
        <Text style={stylesAdd.title}>
          {userData ? "Cập Nhật Người Dùng" : "Thêm Người Dùng"}
        </Text>

        {/* Ảnh đại diện */}
        <TouchableOpacity onPress={pickImage} style={stylesAdd.imageContainer}>
          {image ? (
            <Image source={{ uri: image }} style={stylesAdd.image} />
          ) : (
            <Text style={stylesAdd.imageText}>Chọn ảnh</Text>
          )}
        </TouchableOpacity>

        <Button title="Chọn ảnh từ thư viện" onPress={pickImage} />

        {/* Nhập tên */}
        <TextInput
          style={stylesAdd.input}
          placeholder="Nhập tên"
          value={name}
          onChangeText={setName}
        />

        {/* Nhập ngày sinh */}
        <TextInput
          style={stylesAdd.input}
          placeholder="Nhập ngày sinh (DD/MM/YYYY)"
          value={birthdate}
          onChangeText={setBirthdate}
        />
        <Text style={{ fontSize: 16, marginTop: 10 }}>Giới tính:</Text>
        <View style={{ flexDirection: "row", marginVertical: 10 }}>
          <TouchableOpacity
            onPress={() => setGender("Male")}
            style={[
              stylesAdd.genderButton,
              gender === "Male" && stylesAdd.genderButtonSelected,
            ]}
          >
            <Text style={stylesAdd.genderText}>Nam</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setGender("Female")}
            style={[
              stylesAdd.genderButton,
              gender === "Female" && stylesAdd.genderButtonSelected,
            ]}
          >
            <Text style={stylesAdd.genderText}>Nữ</Text>
          </TouchableOpacity>
        </View>


        <Button
          title={userData ? "Cập Nhật" : "Thêm"}
          onPress={handleSave}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const stylesAdd = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  imageText: {
    color: "#555",
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  genderButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginHorizontal: 5,
},
genderButtonSelected: {
    backgroundColor: "lightblue",
},
genderText: {
    fontSize: 16,
},

});

export default AddUser;
