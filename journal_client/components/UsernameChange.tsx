import { useAuth } from '@/context/AuthContext';
import React, { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity, Alert } from 'react-native';
import { errorText } from '@/constants/Errors';


interface errorGroup {
    username: string | null;

}

export function UsernameChange({ isVisible, onClose }: { isVisible: boolean, onClose: (res: any) => void }) { 
    const { getUser, updateUsername, onLogout } = useAuth();
}