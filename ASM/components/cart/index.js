import React, { useState, useEffect, useCallback } from "react";
import {
  View, Text, FlatList, Image, TouchableOpacity,
  Animated, ActivityIndicator
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Swipeable } from "react-native-gesture-handler";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import styles from "./styles";
import API_BASE_URL from "../localhost/localhost";


const Cart = () => {
  const navigation = useNavigation();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userId");
        if (storedUserId) {
          setUserId(storedUserId);
        }
      } catch (error) {
        console.error("Lỗi lấy userId từ AsyncStorage:", error);
      }
    };
    fetchUserId();
  }, []);

  // Hàm lấy giỏ hàng từ API
  const fetchCart = async (uid) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/carts/${uid}`);
      setCart(response.data.items || []);
    } catch (error) {
      console.error("Lỗi lấy giỏ hàng:", error);
    } finally {
      setLoading(false);
    }
  };

  // Gọi fetchCart mỗi khi màn hình Cart được focus
  useFocusEffect(
    useCallback(() => {
      if (userId) {
        fetchCart(userId);
      }
    }, [userId])
  );

  const updateQuantity = async (productId, size, quantity) => {
    if (!userId) return;
    if (quantity < 1) {
      removeItem(productId, size);  // Nếu số lượng < 1 thì xóa sản phẩm
      return;
    }

    try {
      // Kiểm tra productId có phải object không, nếu có thì lấy _id
      const normalizedProductId = typeof productId === "object" ? productId._id : productId;

      await axios.put(`${API_BASE_URL}/api/carts/update-quantity`, {
        userId, productId: normalizedProductId, size, quantity
      });

      await fetchCart(userId);
    } catch (error) {
      console.error("Lỗi cập nhật số lượng:", error);
    }
  };

  const removeItem = async (productId, size) => {
    if (!userId) return;
    try {
      const normalizedProductId = typeof productId === "object" ? productId._id : productId;

      await axios.delete(`${API_BASE_URL}/api/carts/remove`, {
        data: { userId, productId: normalizedProductId, size }
      });

      fetchCart(userId);
    } catch (error) {
      console.error("Lỗi xóa sản phẩm:", error);
    }
  };

  const clearCart = async () => {
    if (!userId) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/carts/clear`, { data: { userId } });
      setCart([]);
    } catch (error) {
      console.error("Lỗi xóa toàn bộ giỏ hàng:", error);
    }
  };

  const subtotal = cart.length > 0 ? cart.reduce((sum, item) => sum + item.price * item.quantity, 0) : 0;
  const shippingCost = cart.length > 0 ? 30000 : 0;
  const total = subtotal + shippingCost;

  const renderRightActions = (progress, dragX, item) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });

    return (
      <TouchableOpacity onPress={() => removeItem(item.productId, item.size)} style={styles.deleteButton}>
        <Animated.View style={{ transform: [{ scale }] }}>
          <Ionicons name="trash" size={24} color="white" />
        </Animated.View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (cart.length === 0) {
    return (
      <View style={styles.emptyCartContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Image source={require('../../assets/shopping_cart.png')} style={styles.imageCart} />
        <Text style={styles.emptyCartText}>Giỏ hàng của bạn đang trống</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      <Text style={styles.title}>Cart</Text>
      <TouchableOpacity onPress={clearCart} style={styles.clearButton}>
        <Text style={styles.removeAll}>Remove All</Text>
      </TouchableOpacity>

      <FlatList
        data={cart}
        keyExtractor={(item) => `${item.productId?._id || item.productId}-${item.size}`}
        renderItem={({ item }) => (
          <Swipeable renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, item)}>
            <View style={styles.cartItem}>
              <Image source={{ uri: `${API_BASE_URL}${item.image}` }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text>{item.name}</Text>
                <Text>Size: {item.size}</Text>
                <Text style={styles.boldText}>${item.price * item.quantity}</Text>
              </View>
              <View style={styles.quantityControls}>
                <TouchableOpacity onPress={() => updateQuantity(item.productId, item.size, item.quantity - 1)}>
                  <Ionicons name="remove-circle" size={20} color="#888" />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => updateQuantity(item.productId, item.size, item.quantity + 1)}>
                  <Ionicons name="add-circle" size={20} color="#888" />
                </TouchableOpacity>
              </View>
            </View>
          </Swipeable>
        )}
      />
      <View style={styles.priceDetails}>
        <Text>Sản phẩm: {subtotal.toFixed(1)} VND</Text>
        <Text>Phí ship: {shippingCost.toFixed(1)} VND</Text>
        <Text style={styles.boldText}>Tổng: {total.toFixed(1)} VND</Text>
      </View>

      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={styles.checkoutText}>Thanh toán</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Cart;
