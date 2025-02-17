import { styles } from "./styles";
import React from 'react';
import { TouchableOpacity, View, Image } from 'react-native';

const CheckBox = ({ checked, onCheck }) => {
    return (
        <TouchableOpacity 
            onPress={() => onCheck(!checked)} 
            style={styles.container}
        >
            {checked && (
                <View style={styles.innerContainer}>
                    <Image style={styles.checkIcon}
                    source={require('../../assets/accept.png')}></Image>
                </View>
            )}
        </TouchableOpacity>
    );
};

export default CheckBox;
