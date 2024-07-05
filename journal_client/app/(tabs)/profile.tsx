import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform } from 'react-native';

import React from 'react';

import { Text, SafeAreaView, TextInput } from 'react-native';


export default function TabTwoScreen() {
  const [text, onChangeText] = React.useState('');
  
  return (
    
    <SafeAreaView>
      <Text style={styles.title}>Profile</Text>
       <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        placeholder="Username"
         maxLength={30}
        value={text}
      />
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    borderWidth: 1,
    borderRadius: 8,
  },

  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
