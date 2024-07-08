import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Text, SafeAreaView } from 'react-native';
import { Categories } from '@/components/Categories';
import { Note } from '@/components/Note';
import { NewNote } from '@/components/NewNote';
import { NoteResultModel } from '@/models/note';
import { journalService } from '@/services/journalService';
import { Loading } from '@/components/Loading';

export default function HomeScreen() {

  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    fetchNotes();
  }, []);

  const [notes, setNotes] = useState<NoteResultModel>({} as NoteResultModel);
  const [loading, setLoading] = useState(true);

  const fetchNotes = () => {
    setLoading(true);

    journalService.getNotes().then(res => {

      setNotes(res);

    }).catch(err => {
      console.error('\n\n\nError fetching data:', err);
    });
    setLoading(false);
  }

  const filterCategory = (categoryId: number) => {
    journalService.getNotesByCategory(categoryId).then(res => {
      setNotes(res);

    }).catch(err => {
      console.error('\n\n\nError fetching data:', err);

    });
  }

  const updateNotes = (res: any) => {
    if (res) {
      // prepend new note to notes
      let newNotes = notes;
      newNotes.results.unshift(res);
      setNotes(newNotes);
    }
    setModalVisible(false);
  }


  return (
    <SafeAreaView style={styles.container}>
      <Categories filterCategory={filterCategory} />
      <Text style={styles.title}>Notes</Text>

      {/*  show loading icon if true else list all notes */}
      {loading && <Loading />}

      {notes.results ? (notes.results.map((note, index) => (
        <Link href={{
          pathname: "note/[id]",
          params: { id: note.id }
        }} key={note.id} >
          <Note note={note} />
        </Link>

      ))) : (<Text>No notes found</Text>)}


      <TouchableOpacity
        style={styles.fab}
        onPress={() => { setModalVisible(true) }}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <NewNote isVisible={modalVisible} onClose={(value) => updateNotes(value)} />

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
