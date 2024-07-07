import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import { Text, SafeAreaView } from 'react-native';
import { formatDate } from '@/utils/dateFormatter';
import { useRoute } from '@react-navigation/native';
import { NoteModel } from '@/models/note';
import { Loading } from '@/components/Loading';
import { journalService } from '@/services/journalService';


export default function NoteInfo() {
    const [note, setNote] = useState<NoteModel | null>(null);
    const route = useRoute();
    // const { id } = route.params;
    const { id } = useLocalSearchParams<{ id: string }>();

    useEffect(() => {
        fetchNote();
    }, []);

    const fetchNote = async () => {
        try {
            const response = await journalService.getNoteById(id!);
            setNote(response);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            {note ? (
                <>
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