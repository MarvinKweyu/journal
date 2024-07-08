import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Text, SafeAreaView } from 'react-native';
import { Categories } from '@/components/Categories';
import { Note } from '@/components/Note';
import { NewNote } from '@/components/NewNote';
import { NoteModel } from '@/models/note';
import { journalService } from '@/services/journalService';
import { Loading } from '@/components/Loading';

export default function HomeScreen() {

  const [modalVisible, setModalVisible] = useState(false);
  const [notes, setNotes] = useState<NoteModel[] | []>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const notes = await journalService.getNotes();
      setNotes(notes);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <Categories />
      <Text style={styles.title}>Notes</Text>

      {/*  show loading icon if true else list all notes */}
      {loading && <Loading />}


      {notes.map((note, index) => (
        <Link href={{
          pathname: "note/[id]",
          params: { id: note.id }
        }} key={index} >
          <Note note={note} />
        </Link>

      ))}


      <TouchableOpacity
        style={styles.fab}
        onPress={() => { setModalVisible(true) }}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <NewNote isVisible={modalVisible} onClose={() => setModalVisible(false)} />

    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    fontWeight: 'bold',
    fontSize: 24,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },


  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#c99180',
    borderRadius: 30,
    elevation: 8,
  },
  fabText: {
    fontSize: 34,
    color: 'white',
  },
});
