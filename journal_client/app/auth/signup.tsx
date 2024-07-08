import React, { useState } from 'react';
import { Link, router } from 'expo-router';

import { View, Text, SafeAreaView, TextInput, StyleSheet, Pressable, Alert } from 'react-native';
import { useAuth } from '../../context/AuthContext';


export default function SignupScreen() {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { onRegister } = useAuth();

    const handleSignUp = async () => {
        const password1 = password;
        const password2 = password;
        const res = await onRegister!(email, username, password1, password2);
        if (res.error) {
            Alert.alert(res.msg);

            return;
        }
        router.push('(tabs)/note');

    }

    return (

        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>SignUp</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.input}
                    placeholder='Email'
                    value={email}
                    onChangeText={setEmail}
                    autoCorrect={false}
                    autoCapitalize='none' />
                <TextInput
                    style={styles.input}
                    placeholder='Username'
                    value={username}
                    onChangeText={setUsername}
                    autoCorrect={false}
                    autoCapitalize='none' />

                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    autoCorrect={false}
                    autoCapitalize='none' />
            </View>

            <View style={styles.buttonView}>
                <Pressable style={styles.button} onPress={() => handleSignUp()}>
                    <Text style={styles.buttonText}>Create account</Text>
                </Pressable>

            </View>

            <Text style={styles.footerText}>Already have an account?
                <Link href="/index" style={styles.signup}> Sign in</Link>
            </Text>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        paddingTop: 70,
    },
    image: {
        height: 160,
        width: 170
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        textTransform: "uppercase",
        textAlign: "center",
        paddingVertical: 40,
        color: "#c99180"
    },
    inputView: {
        gap: 15,
        width: "100%",
        paddingHorizontal: 40,
        marginBottom: 5
    },
    input: {
        height: 50,
        paddingHorizontal: 20,
        borderColor: "#c99180",
        borderWidth: 1,
        borderRadius: 7
    },
    rememberView: {
        width: "100%",
        paddingHorizontal: 50,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 8
    },
    switch: {
        flexDirection: "row",
        gap: 1,
        justifyContent: "center",
        alignItems: "center"

    },
    rememberText: {
        fontSize: 13
    },
    forgetText: {
        fontSize: 11,
        color: "#c99180"
    },
    button: {
        backgroundColor: "#c99180",
        height: 45,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold"
    },
    buttonView: {
        width: "100%",
        paddingHorizontal: 50
    },
    optionsText: {
        textAlign: "center",
        paddingVertical: 10,
        color: "gray",
        fontSize: 13,
        marginBottom: 6
    },
    mediaIcons: {
        flexDirection: "row",
        gap: 15,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 23
    },
    icons: {
        width: 40,
        height: 40,
    },
    footerText: {
        textAlign: "center",
        color: "gray",
    },
    signup: {
        color: "#c99180",
        fontSize: 13
    }
});
