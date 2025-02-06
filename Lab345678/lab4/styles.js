    import { StyleSheet } from 'react-native';

    export const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'white',
            paddingHorizontal: 10,
            marginTop: 20,
        },
        contactItem: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#f5f5f5',
            padding: 10,
            marginVertical: 5,
            borderRadius: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 3,
        },
        avatar: {
            width: 100,
            height: 100,
            borderRadius: '50%',
            marginRight: 10,
        },
        profile: {
            flex: 2,
            justifyContent: 'center',
        },
        nameText: {
            fontSize: 16,
            fontWeight: 'bold',
        },
        positionText: {
            fontSize: 14,
            color: 'gray',
        },
        btnCall: {
            flex: 1,
            backgroundColor: '#4CAF50',
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
        },
        callText: {
            color: 'white',
            fontSize: 14,
            fontWeight: 'bold',
        },
    });