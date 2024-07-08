import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { Text, SafeAreaView } from 'react-native';
import { formatDate } from '@/utils/dateFormatter';
import { useRoute } from '@react-navigation/native';
import { NoteModel } from '@/models/note';
import { Loading } from '@/components/Loading';
import { journalService } from '@/services/journalService';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';


export default function NoteInfo() {
    const [note, setNote] = useState<NoteModel | null>(null);
    const route = useRoute();
    // const { id } = route.params;
    const { id } = useLocalSearchParams<{ id: string }>();

    useEffect(() => {
        fetchNote();
    }, []);

    const fetchNote = async () => {
        journalService.getNoteById(+id!).then(res => {
            console.log(res);
            setNote(res);

        }).catch(err => {
            console.error('\n\n\nError fetching data:', err);
        });
    };

    const deleteNote = async () => {
        try {
            await journalService.deleteNote(note!.id);

            // go to home
            router.push('(tabs)/note');
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            {note ? (
                <>
                    <View>
                        <Pressable onPress={() => deleteNote()}>
                            <AntDesign name="delete" size={24} color="black" />
                        </Pressable>
                    </View>
                    <Text style={styles.title}>{note.title}</Text>
                    <Text style={styles.tag}>{note.category}</Text>
                    <Text style={styles.date}>{formatDate(note.created)}</Text>
                    <Text style={styles.content}>{note.content}</Text>
                </>
            ) : (
                <Loading />
            )}

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    container: {
        padding: 20,
        margin: 20
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        fontWeight: 'bold',
        fontSize: 24,
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
    }

});