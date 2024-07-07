
import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, Button, TouchableOpacity } from 'react-native';

export function NewNote({ isVisible, onClose }: { isVisible: boolean, onClose: () => void }) {

    const [newNote, setNewNote] = useState({ title: '', content: '', category: '' });

    const handleCreateNote = () => {

        console.log('New note:', newNote);
        setNewNote({ title: '', content: '', category: '' });
        onClose();
    };


    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.modalView}>
                <Text style={styles.modalText}>Write out your thoughts</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Title"
                    value={newNote.title}
                    onChangeText={(text) => setNewNote({ ...newNote, title: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Today ..."
                    value={newNote.content}
                    onChangeText={(text) => setNewNote({ ...newNote, content: text })}
                    multiline
                    numberOfLines={5}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Category"
                    value={newNote.category}
                    onChangeText={(text) => setNewNote({ ...newNote, category: text })}
                />
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.createButton} onPress={handleCreateNote}>
                        <Text style={styles.buttonText}>Create Note</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    fab: {
        position: 'absolute',
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 20,
        backgroundColor: '#6200EE',
        borderRadius: 28,
        elevation: 8,
    },
    fabText: {
        fontSize: 24,
        color: 'white',
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
    input: {
        width: '100%',
        borderBottomWidth: 1,
        marginBottom: 10,
        padding: 8,
        fontSize: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#c99180",
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
});