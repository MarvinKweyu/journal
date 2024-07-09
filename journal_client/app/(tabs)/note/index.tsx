import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Link, router } from 'expo-router';
import { Text, SafeAreaView, FlatList, View } from 'react-native';
import { Categories } from '@/components/Categories';
import { Note } from '@/components/Note';
import { NewNote } from '@/components/NewNote';
import { NoteResultModel } from '@/models/note';
import { journalService } from '@/services/journalService';
import { Loading } from '@/components/Loading';

export default function HomeScreen() {

  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    fetchNotes(null);
  }, []);

  const [notes, setNotes] = useState<NoteResultModel>({} as NoteResultModel);
  const [loading, setLoading] = useState(true);

  const fetchNotes = (page: string | null) => {
    setLoading(true);

    journalService.getNotes(page).then(res => {

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
    fetchNotes(null);
    // if (res) {
    //   // prepend new note to notes
    //   let newNotes = notes;
    //   newNotes.results.unshift(res);
    //   setNotes(newNotes);
    // }
    setModalVisible(false);
  }


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My Journal</Text>
      <Categories filterCategory={filterCategory} />
      {loading && <Loading />}

      {notes.results ?
        (<FlatList
          style={{ marginTop: 15 }}
          showsVerticalScrollIndicator={false}
          data={notes.results}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() =>
                router.push({ pathname: "note/[id]", params: { id: item.id } })

              }
            >
              <Note note={item} />
            </TouchableOpacity>
          )}
        />) : (<Text>No notes found</Text>)}


      <View style={styles.pagination}>
        {notes.previous &&
          <TouchableOpacity  style={styles.prev}  onPress={() => { fetchNotes(notes.previous) }}>
            <Text>Previous</Text>
          </TouchableOpacity>
        }
        {notes.next &&
          <TouchableOpacity onPress={() => { fetchNotes(notes.next) }}>
            <Text>Next</Text>
          </TouchableOpacity>
        }
      </View>

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
    marginTop: 20,
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
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },

  prev: {
    marginRight: 10,
  }
});
