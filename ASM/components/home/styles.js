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

  productGridImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    resizeMode: "cover",
  },

  productName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginTop: 5,
    textAlign: "center",
  },
  productPrice: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#FF5733",
    marginTop: 5,
  },
  productGridPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF5733",
    marginTop: 5,
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
});
