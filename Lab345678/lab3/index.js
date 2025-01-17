import { Pressable, ScrollView, SafeAreaView, SafeAreaProvider,Image, Modal, StyleSheet, Text, TextInput, View, Alert } from "react-native";
import { styles } from "./styles";
import React, { useState } from "react";
const colorText = (color) => {
    return { color: color };
}

const sizeText = (size) => {
    return { fontSize: size };
}

const styleText = (additionalStyles) => {
    return { ...additionalStyles };
}


const Lab3 = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [pass, setPass] = useState('');

    const [modalVisible, setModalVisible] = useState(false);


    return (
        <ScrollView style={styleText({
            backgroundColor: 'white'
        })}>
            <TextInput
                value={name}
                onChange={setName}
                placeholder="Nhập họ tên"
                style={styles.tipStyle}
            >
            </TextInput>
            <TextInput
                value={phone}
                onChange={setPhone}
                placeholder="Nhập số điện thoại"
                keyboardType="phone-pad"
                style={styles.tipStyle}
            >
            </TextInput>
            <TextInput
                value={pass}
                onChange={setPass}
                placeholder="Nhập mật khẩu"
                secureTextEntry={true}
                style={styles.tipStyle}
            >
            </TextInput>
            <View style={styles.container}>
                <Text style={styles.baseText}>
                    Em vào đời bằng <Text style={[styles.boldText, colorText('red')]}>vang do</Text> anh vào đời bằng {' '}
                    <Text style={[styles.boldText, colorText('yellow')]}>nước trà</Text>
                </Text>
                {/* line 2 */}
                <Text style={styles.baseText}>
                    Bằng cơn mưa thơm <Text style={[styles.boldText, sizeText(20), styles.italicText]}>mùi đất</Text>{' '}
                    và <Text style={sizeText(10)}>hoa dại mọc trước nhà</Text>
                </Text>
                {/* line 3 */}
                <Text style={[styles.baseText, styles.boldText, styles.italicText, colorText('gray')]}>
                    Em vào đời bằng kế hoạch, anh vào đời bằng mộng mơ
                </Text>
                {/* line 4 */}
                <Text style={styles.baseText}>
                    Lý trí em là {' '}
                    <Text style={styleText({
                        textDecorationLine: 'underline',
                        letterSpacing: 20,
                        fontWeith: 'bold',

                    })}>
                        công cụ
                    </Text>
                    còn trái tim anh {' '}
                    <Text style={styleText({
                        textDecorationLine: 'underline',
                        letterSpacing: 20,
                        fontWeith: 'bold',
                    })}>
                        động cơ
                    </Text>
                </Text>
                {/*Line 5*/}
                <Text style={[styles.baseText, styleText({ textAlign: 'right' })]}>
                    Em vào đời nhiều đồng nghiệp anh vào đời nhiều thân tình
                </Text>
                {/*Line 6*/}
                <Text style={[styles.baseText, styleText({
                    textAlign: 'center',
                    fontWeith: 'bold',
                    color: 'orange'
                })]}>
                    Em vào đời nhiều đồng nghiệp anh vào đời nhiều thân tình
                </Text>
                {/*Line 7*/}
                <Text style={[styles.baseText, styleText({
                    fontWeith: 'bold',
                    color: 'black',
                })]}>
                    Em vào đời bằng <Text style={colorText('white')}> mấy trắng </Text> em
                    vào đời bằng <Text style={colorText('yellow')}>nắng xanh</Text>
                </Text>
                {/*Line 7*/}
                <Text style={[styles.baseText, styleText({
                    fontWeith: 'bold',
                    color: 'black',
                })]}>
                    Em vào đời bằng <Text style={colorText('yellow')}> đại lộ </Text> và
                    con đường đó giờ <Text style={colorText('white')}>vắng anh</Text>
                </Text>
            </View>
            <SafeAreaView style= {styles.containerModal}>
                    
                <Modal animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    Alert.alert('Model has been closed ');
                    setModalVisible(!modalVisible);
                    }}>
                <View style={styles.modalView}>
                        <Text style={[styleText({marginBottom: 20}), styles.boldText]}>
                            Hello Wolrd!
                        </Text>
                        <Image source={require('./image/img.png')} style={styleText({height: 200, width:200})} />
                        <Pressable style={[styles.btn, styles.btnClose,styleText({ marginTop: 20, width: 150, alignSelf: 'center' })]}
                        onPress={()=>{
                            setModalVisible(!modalVisible)
                        }}
                        >
                            <Text  style={styleText({ textAlign: 'center' })}>Close Modal</Text>
                        </Pressable>
                        </View>
                    </Modal>
                    
                </SafeAreaView>
            
            <Pressable style={[styles.btn, styles.btnOpen, styleText({ marginTop: 20, width: 150, alignSelf: 'center' })]}
                onPress={() => {
                    setModalVisible(true)
                }}
            >
                <Text style={styleText({ textAlign: 'center' })}>Show Modal</Text>
            </Pressable>
           
        </ScrollView>
    );
};

export default Lab3;
