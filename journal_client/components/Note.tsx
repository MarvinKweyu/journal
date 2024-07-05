
import { View, Text, StyleSheet } from 'react-native';
import { formatDate } from '../utils/dateFormatter';


export function Note(
  { note }: { note: { title: string, content: string, created: Date }; }
) {

  return (
    <View style={styles.note}>
      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.noteContent} numberOfLines={3}
        ellipsizeMode="tail">{note.content}</Text>
      <Text style={styles.noteDate}>{formatDate(note.created)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  note: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f4e9e6',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,

    elevation: 10,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  noteContent: {
    marginBottom: 8,
  },
  noteDate: {
    fontSize: 12,
    fontWeight: '300',

  }
});