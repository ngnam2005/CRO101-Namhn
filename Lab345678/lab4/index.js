import { Text, StyleSheet, Image, View, FlatList, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import React, { useState } from "react";

// type ContactType = {
//     name: string,
//     email: string,
//     position: string,
//     photo: string
// };
const Lab4 = () => {

    const data = [{
        id: 1,
        name: "Ngoc Nam",
        email: "ngocnam@gmail.com",
        position: "Software Engineer",
        photo: require("./image/avt1.jpg")
    },
    {
        id: 2,
        name: "Ngoc Nam",
        email: "ngocnam22@gmail.com",
        position: "Software Engineer",
        photo: require("./image/avt2.jpg")
    }
    ]
    const ContactItem = ({ contact }) => (
        <View style={styles.contactItem}>
            <Image source={contact.photo} style={[styles.avatar, {flex: 1}]}></Image>
            <View style={[styles.profile, {flex: 2}]}>
                <Text style={styles.nameText}>
                    {contact.name}
                </Text>
                <Text>
                    {contact.position}
                </Text>
            </View>
            <TouchableOpacity style={[styles.btnCall, {flex: 1}]}>
                <Text style={styles.callText}>Call</Text>
            </TouchableOpacity>

        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList data={data}
                renderItem={({ item }) => <ContactItem contact={item} />}
                keyExtractor={item => item.email}
            >

            </FlatList>
        </View>
    );
}
export default Lab4;