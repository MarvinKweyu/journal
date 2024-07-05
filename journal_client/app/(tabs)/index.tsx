import { StyleSheet,  TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Text, SafeAreaView } from 'react-native';
import { Categories } from '@/components/Categories';
import { Note } from '@/components/Note';

export default function HomeScreen() {

  const notes = [
    {
      id: 1,
      title: 'Note 1',
      content: 'lorem ipsum    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      created: new Date(),
    },
    {
      id: 2,
      title: 'Note 2',
      content: '    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      created: new Date(),
    },
    {
      id: 3,
      title: 'Note 3',
      content: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      created: new Date()
    },


  ];
  return (
    <SafeAreaView style={styles.container}>
      <Categories />

      <Text style={styles.title}>Notes</Text>
      {notes.map((note, index) => (
        <Link href={{
          pathname: "/note/[id]",
          params: { id: note.id }
        }} key={index} >
          <Note note={note} />
        </Link>

      ))}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => { console.log('Pressed!') }}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
