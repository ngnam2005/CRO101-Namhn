import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Image, Platform, Modal } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { styles } from "./styles";
import API_BASE_URL from "../localhost/localhost";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";

const UpdateProfile = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { userId } = route.params || {};

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [phone, setPhone] = useState("");  // ✅ Thêm phone
    const [birthday, setBirthday] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    useEffect(() => {
        if (!userId) {
            console.error("Lỗi: userId không hợp lệ");
            return;
        }

        const fetchUser = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/users/profile/${userId}`);
                console.log("Dữ liệu user:", response.data);

                if (response.data) {
                    setName(response.data.name || ""); 
                    setEmail(response.data.email || ""); 
                    setAvatar(response.data.avatar || null);
                    setPhone(response.data.phone ? response.data.phone.toString() : "");  // ✅ Gán giá trị phone
                    setBirthday(response.data.birthday ? new Date(response.data.birthday) : new Date());
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu người dùng:", error);
            }
        };

        fetchUser();
    }, [userId]);

    // Hàm chọn ảnh từ thư viện (expo-image-picker)
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setAvatar(result.assets[0].uri);
        }
    };

    // Hàm xử lý chọn ngày
    const onChangeDate = (event, selectedDate) => {
        if (selectedDate) {
            setBirthday(selectedDate);
        }
        if (Platform.OS === "android") {
            setShowDatePicker(false); // Đóng picker trên Android
        }
    };

    // Hàm cập nhật thông tin tài khoản
    const handleUpdateProfile = async () => {
        if (!password.trim()) {
            Alert.alert("Lỗi", "Vui lòng nhập mật khẩu để xác nhận!");
            return;
        }

        if (!/^\d{10,11}$/.test(phone)) {
            Alert.alert("Lỗi", "Số điện thoại phải có 10-11 chữ số!");
            return;
        }

        try {
            const formattedBirthday = birthday.toISOString().split("T")[0]; // Chuyển về YYYY-MM-DD

            console.log("Dữ liệu gửi lên:", { userId, email, name, password, avatar, phone, birthday: formattedBirthday });

            const response = await axios.put(
                `${API_BASE_URL}/api/users/update-profile`,
                {
                    userId,
                    email,
                    name,
                    password,
                    avatar,
                    phone,  // ✅ Giữ nguyên chuỗi, không chuyển thành số
                    birthday: formattedBirthday, // Định dạng YYYY-MM-DD
                },
                { headers: { "Content-Type": "application/json" } }
            );
        
            console.log("Phản hồi từ API:", response.data);
            Alert.alert("Thành công", response.data.message);
            navigation.navigate("Tabs", { refresh: true });

        } catch (error) {
            console.error("Lỗi cập nhật:", error.response?.data || error);
            Alert.alert("Lỗi", error.response?.data?.message || "Có lỗi xảy ra khi cập nhật");
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.title}>Cập nhật thông tin</Text>

            <TouchableOpacity onPress={pickImage}>
                <Image
                    source={avatar ? { uri: avatar } : require("../../assets/rv_logo.png")}
                    style={styles.profileImage}
                />
                <Text style={styles.imageText}>Chọn ảnh</Text>
            </TouchableOpacity>

            <TextInput style={styles.input} placeholder="Tên mới" value={name} onChangeText={setName} />
            <TextInput style={styles.input} placeholder="Email" value={email} editable={false} />
            <TextInput
                style={styles.input}
                placeholder="Số điện thoại"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone} // ✅ Giữ nguyên chuỗi số, không bị mất số 0 đầu
            />


            <TextInput
                style={styles.input}
                placeholder="Mật khẩu để xác nhận"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            {/* Hiển thị ngày sinh */}
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePicker}>
                <Text style={styles.dateText}>Ngày sinh: {birthday.toDateString()}</Text>
            </TouchableOpacity>

            {/* DateTimePicker */}
            {showDatePicker && Platform.OS === "ios" && (
                <DateTimePicker value={birthday} mode="date" display="default" onChange={onChangeDate} />
            )}

            {/* Modal cho Android */}
            {showDatePicker && Platform.OS === "android" && (
                <Modal transparent={true} animationType="slide">
                    <View style={styles.modalContainer}>
                        <DateTimePicker value={birthday} mode="date" display="default" onChange={onChangeDate} />
                        <TouchableOpacity onPress={() => setShowDatePicker(false)} style={styles.modalCloseButton}>
                            <Text>Đóng</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            )}

            <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
                <Text style={styles.buttonText}>Cập nhật</Text>
            </TouchableOpacity>
        </View>
    );
};

export default UpdateProfile;
