import React, { useState } from 'react';

import { View, Pressable, Text, SafeAreaView, TextInput, StyleSheet, StatusBar, Platform } from 'react-native';


export default function TabTwoScreen() {
  const [text, onChangeText] = useState('');
  const [password, onChangePassword] = useState('');

  return (

    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
      <Text style={styles.title}>Profile</Text>
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

      <View style={styles.buttonView}>
        <Pressable style={styles.button} onPress={() => console.log('update')}>
          <Text style={styles.buttonText}>Update</Text>
        </Pressable>

      </View>
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
  buttonView: {
    width: "100%",
    paddingHorizontal: 50
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "normal"
  },
  button: {
    backgroundColor: "#c99180",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center"
  },
});
