import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: 'blue',
        width: '90%',
        alignSelf: 'center',
        marginTop: 20,
        padding: 15,
        fontFamily: 'Cochin',
    },
    baseText: {
        color: 'white',
        fontSize: 16,
        marginTop: 10
    },
    boldText: {
        fontWeight: 'bold',
    },
    tipStyle: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        marginHorizontal: 15,
        marginTop: 30,
        padding: 20
    },
    italicText: {
        fontStyle: 'italic'
    },
    btnOpen: {
        backgroundColor: '#F194FF'
    },
    btnClose: {
        backgroundColor: '#F194FF'
    },
    btn: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    containerModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
      },
      modalView: {
        margin: 20,
        marginTop: 100,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#ccc',
      },
});