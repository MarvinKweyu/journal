import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, ScrollView, TouchableOpacity } from 'react-native';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { Text, SafeAreaView, Modal } from 'react-native';
import { formatDate } from '@/utils/dateFormatter';
import { NoteModel } from '@/models/note';
import { Loading } from '@/components/Loading';
import { journalService } from '@/services/journalService';
import { AntDesign } from '@expo/vector-icons';


export default function NoteInfo() {
    const [note, setNote] = useState<NoteModel | null>(null);
    const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
    const [loadingError, setLoadingError] = useState<Object | null>(null);

    // const { id } = route.params;
    const { id } = useLocalSearchParams<{ id: string }>();

    useEffect(() => {
        fetchNote();
    }, []);

    const fetchNote = async () => {
        journalService.getNoteById(+id!).then(res => {
            setNote(res);

        }).catch(err => {
            setLoadingError(err);

        });
    };

    const deleteNote = async () => {
        journalService.deleteNote(note!.id).then(res => {
            router.push('(tabs)/note');
        }).catch(err => { setLoadingError(err); });;
    };
    return (
        <SafeAreaView style={styles.container}>

            {note ? (
                <>
                    <View style={styles.actions}>
                        <Pressable style={styles.action} onPress={() => deleteNote()}>
                            <AntDesign name="edit" size={24} color="black" />
                        </Pressable>
                        <Pressable style={styles.action} onPress={() => setConfirmDelete(true)}>
                            <AntDesign name="delete" size={24} color="black" />
                        </Pressable>

                    </View>
                    <Text style={styles.title}>{note.title}</Text>
                    <Text style={styles.tag}>{note.category}</Text>
                    <Text style={styles.date}>{formatDate(note.created)}</Text>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text style={styles.content}>{note.content}</Text>
                    </ScrollView>
                </>
            ) : (
                <Loading />
            )}

            {/* modal for confirm delete */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={confirmDelete}
                onRequestClose={() => setConfirmDelete(false)}
            >
                <View style={styles.modalView}>
                    <Text>Are you sure you want to delete this note?</Text>
                    <View style={styles.deleteDialog}>

                        <TouchableOpacity style={styles.cancelButton} onPress={() => setConfirmDelete(false)}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.createButton} onPress={deleteNote}>
                            <Text style={styles.buttonText}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </Modal>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        margin: 20
    },
    back: {
        paddingHorizontal: 0,
        paddingVertical: 0,
        marginRight: 18,
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    action: {
        paddingHorizontal: 2,
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        fontWeight: 'bold',
        fontSize: 24,
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

    tag: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        // color: '#F4E9E6'
    },
    date: {
        fontSize: 16,
        fontWeight: 'normal',
        marginBottom: 10,
        // color: '#F4E9E6'
    },
    content: {
        marginTop: 10,
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'justify',
        overflow: 'scroll'
    },
    deleteDialog: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        backgroundColor: 'red',
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