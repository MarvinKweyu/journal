import { Stack } from 'expo-router';
import React from 'react';

const NoteLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false, headerTitle: 'Home' }} />
            <Stack.Screen name="[id]" options={{ headerShown: false, headerTitle: 'Note' }} />
        </Stack>
    );
};

export default NoteLayout;