import { useAuth } from '@/context/AuthContext';
import React, { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity, Alert } from 'react-native';
import { errorText } from '@/constants/Errors';


interface errorGroup {
    password: string | null;

}

export function PasswordReset({ isVisible, onClose }: { isVisible: boolean, onClose: (res: any) => void }) {
    const [password, setPassword] = useState<string>('');
    const [errors, setError] = useState({} as errorGroup);

    const { getUser, changePassword } = useAuth();

    const validateForm = () => {
        let error: errorGroup = {} as errorGroup;
        if (password.length < 8) error.password = 'Password must be at least 8 characters long';
        if (!password) error.password = 'Please provide a password';

        setError(error);
        return Object.values(error).every(value => value === null);

    };

    const updatePassword = async () => {
        if (validateForm()) {
            const new_password = password;
            const confirm_password = password;
            const res = await changePassword!(new_password, confirm_password);

            if (res.error) {
                Alert.alert('Please try again later', res.msg);
                return;
            }

            setPassword('');
            setError({} as errorGroup);
            router.push('profile');

        }
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.modalView}>
                <Text style={styles.modalText}>Change your password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    onChangeText={setPassword}
                    value={password}
                    autoCorrect={false}
                    autoCapitalize='none'
                    maxLength={30}
                />
                {errors.password && <Text style={errorText.style}>{errors.password}</Text>}
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.createButton} onPress={updatePassword}>
                        <Text style={styles.buttonText}>Confirm</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )


}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
    },
    input: {
        height: 40,
        margin: 12,

        width: '100%',
        borderBottomWidth: 1,
        marginBottom: 10,
        padding: 8,
        fontSize: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#c99180",
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
    cancelButton: {
        flex: 1,
        backgroundColor: 'grey',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginRight: 10,
    },
    createButton: {
        flex: 1,
        backgroundColor: '#c99180',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginLeft: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },

})