import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    marginTop: 10,
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
    marginVertical: 16,
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
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  productGrid: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    width: "48%",
    alignItems: "center",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "blue",
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
