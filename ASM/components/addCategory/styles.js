import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
      width: "80%",
      backgroundColor: "white",
      padding: 20,
      borderRadius: 10,
      alignItems: "center",
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
    },
    input: {
      width: "100%",
      borderWidth: 1,
      borderColor: "#ccc",
      padding: 10,
      marginVertical: 5,
      borderRadius: 5,
    },
    imagePickerContainer: {
      alignItems: "center",
      marginVertical: 10,
    },
    imagePreview: {
      width: 100,
      height: 100,
      borderRadius: 10,
      marginBottom: 10,
    },
    imagePlaceholder: {
      fontSize: 14,
      color: "#aaa",
    },
    imageButtons: {
      flexDirection: "row",
      gap: 10,
    },
    imageButton: {
      padding: 10,
    },
    addButton: {
      width: 150,
      backgroundColor: "blue",
      padding: 10,
      borderRadius: 5,
      alignItems: "center",
      marginTop: 10,
    },
    addButtonText: {
      color: "white",
      fontWeight: "bold",
    },
    closeButton: {
      width: 150,
      marginTop: 10,
    },
    closeButtonText: {
      color: "red",
    },
  });
  