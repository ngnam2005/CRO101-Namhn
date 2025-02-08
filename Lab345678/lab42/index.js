import React, { useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, StatusBar, Platform, Button } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const STYLES = ['default', 'dark-content', 'light-content'];
const TRANSITIONS = ['fade', 'slide', 'none'];

const Lab4Bai2 = () => {
    // RefreshControl
    const [refreshing, setRefreshing] = useState(false);

    // StatusBar
    const [hidden, setHidden] = useState(false);
    const [statusBarStyle, setStatusBarStyle] = useState(STYLES[0]);
    const [statusBarTransition, setStatusBarTransition] = useState(TRANSITIONS[0]);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        // Thay đổi trạng thái StatusBar khi làm mới
        toggleStatusBar();
        changeStatusBarStyle();
        if (Platform.OS === 'ios') {
            changeStatusBarTransition();
        }

        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, [hidden, statusBarStyle, statusBarTransition]);

    const toggleStatusBar = () => setHidden(!hidden);

    const changeStatusBarStyle = () => {
        const styleId = STYLES.indexOf(statusBarStyle) + 1;
        setStatusBarStyle(styleId === STYLES.length ? STYLES[0] : STYLES[styleId]);
    };

    const changeStatusBarTransition = () => {
        const transitionId = TRANSITIONS.indexOf(statusBarTransition) + 1;
        setStatusBarTransition(transitionId === TRANSITIONS.length ? TRANSITIONS[0] : TRANSITIONS[transitionId]);
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <ScrollView
                    contentContainerStyle={styles.scrollView}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    <Text style={styles.textStyle}>Kéo xuống để làm mới và thay đổi StatusBar</Text>
                    <StatusBar
                        animated={true}
                        backgroundColor="#61dafb"
                        barStyle={statusBarStyle}
                        showHideTransition={statusBarTransition}
                        hidden={hidden}
                    />
                    <Text style={styles.textStyle}>
                        StatusBar visibility: {hidden ? 'Ẩn (Hidden)' : 'Hiện (Visible)'}
                    </Text>
                    <Text style={styles.textStyle}>
                        StatusBar Style: {statusBarStyle}
                    </Text>
                    {Platform.OS === 'ios' && (
                        <Text style={styles.textStyle}>
                            StatusBar Transition: {statusBarTransition}
                        </Text>
                    )}
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollView: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    textStyle: {
        textAlign: 'center',
        marginBottom: 16,
        fontSize: 16,
        color: 'black',
    },
});

export default Lab4Bai2;
