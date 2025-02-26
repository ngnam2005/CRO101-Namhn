import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 20,
  },
  searchContainer: {
    marginB: 10,
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 10,
  },
  searchIcon: {
    marginRight: 10,
    marginTop: 10,
  },
  categoryItem: {
    alignItems: "center",
    margin: 10,
  },
  categoryImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  productContainer: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 10,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 150,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
  },

  productCard: {
    width: 140,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  productGrid: {
    position: "relative", // Để định vị nút dấu +
    marginBottom: 20,
  },
  productCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    width: 160, // Đảm bảo kích thước sản phẩm
  },
  productGridImage: {
    width: "100%",
    height: 120,
    borderRadius: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
  },
  productGridPrice: {
    fontSize: 14,
    color: "#FF5733",
    fontWeight: "bold",
    marginTop: 3,
  },
  addToCartButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 2,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#134f5c",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  cartBadge: {
    position: "absolute",
    right: -5,
    top: -5,
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 11,
    fontStyle: "normal",
  }

});
