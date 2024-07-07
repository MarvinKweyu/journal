import React, { useState } from 'react';

import { Text, SafeAreaView, TextInput, StyleSheet, StatusBar, Platform } from 'react-native';


export default function SignupScreen() {
    const [text, onChangeText] = useState('');
    const [password, onChangePassword] = useState('');

    return (

        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
            <Text style={styles.title}>Sign Up</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                placeholder="Username"
                maxLength={30}
                value={text}
            />

            <TextInput
                style={styles.input}
                onChangeText={onChangePassword}
                placeholder="Password"
                maxLength={30}
                value={password}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    container: {
        margin: 12,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        fontWeight: 'bold',
        fontSize: 24,
    },
    input: {
        height: 40,
        margin: 12,
        padding: 8,
        borderWidth: 1,
        borderRadius: 8,
    },

    titleContainer: {
        flexDirection: 'row',
        gap: 8,
    },
});
