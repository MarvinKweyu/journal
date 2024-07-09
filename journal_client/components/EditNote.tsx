import { errorText } from '@/constants/Errors';
import { CategoryResultModel, NewNoteModel, NoteModel } from '@/models/note';
import { journalService } from '@/services/journalService';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity } from 'react-native';

import RNPickerSelect from 'react-native-picker-select';

interface categorySelect {
    label: string;
    value: string;
}

interface errorGroup {
    title: string | null;
    category: string | null;
    content: string | null;

}

export function EditNote({ isVisible, prevNote, onClose }: { isVisible: boolean, prevNote: NoteModel, onClose: (res: any) => void }) {
    const [categories, setCategories] = useState<categorySelect[]>([] as categorySelect[]);
    const [savedNote, setSavedNote] = useState<NewNoteModel>({} as NewNoteModel);
    const [useDropdown, setUseDropdown] = useState(true);
    const [errors, setError] = useState({} as errorGroup);

    useEffect(() => {
        fetchCategories();


        setSavedNote(
            {
                id: prevNote.id.toString(),
                title: prevNote.title,
                content: prevNote.content,
                category: prevNote.category.name,
                created: prevNote.created
            } as NewNoteModel
        );

    }, []);

    const fetchCategories = () => {
        journalService.getCategories().then((res: CategoryResultModel) => {
            let saved: categorySelect[] = [];
            res.results.forEach(res => {
                saved.push({ label: res.name, value: res.name });

            });
            setCategories(saved);
        }).catch(err => {
            console.error('\n\n\nError fetching data:', err);
        });
    }

    const validateForm = () => {

        let error: errorGroup = {} as errorGroup;

        if (!savedNote.title) error.title = 'Please provide a title';
        if (!savedNote.category) error.category = 'Please give it a category';
        if (!savedNote.content) error.content = 'Please fill in the content';

        setError(error);

        return Object.values(error).every(value => value === null);

    };

    const handleEdit = () => {

        if (validateForm()) {

            journalService.updateNote(
                savedNote.id,
                savedNote.title,
                savedNote.content,
                savedNote.category
            ).then(res => {

                // setSavedNote(res);
                setError({} as errorGroup);
                onClose(res);
            }).catch(err => {
                console.error('Error creating note:', err);
            });
        }
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.modalView}>
                <Text style={styles.modalText}>Edit</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Title"
                    value={savedNote.title}
                    onChangeText={(text) => setSavedNote({ ...savedNote, title: text })}
                />
                {errors.title && <Text style={errorText.style}>{errors.title}</Text>}
                <TextInput
                    style={styles.input}
                    placeholder="Today ..."
                    value={savedNote.content}
                    onChangeText={(text) => setSavedNote({ ...savedNote, content: text })}
                    multiline
                    numberOfLines={5}
                />
                {errors.content && <Text style={errorText.style}>{errors.content}</Text>}
                {useDropdown ? (
                    <RNPickerSelect
                        placeholder={{ label: "Select a category", value: null }}
                        style={pickerSelectStyles}
                        onValueChange={(value) => setSavedNote({ ...savedNote, category: value })}
                        items={categories}
                    />
                ) : (
                    <TextInput
                        style={styles.input}
                        placeholder="New Category"
                        value={savedNote.category}
                        onChangeText={(text) => setSavedNote({ ...savedNote, category: text })}
                    />
                )}
                {errors.category && <Text style={errorText.style}>{errors.category}</Text>}
                {/* {categories.length !== 0 &&
                    <> */}
                <TouchableOpacity onPress={() => setUseDropdown(!useDropdown)}>
                    <Text >
                        {useDropdown ? 'Create a new category' : 'Select an existing category'}
                    </Text>
                </TouchableOpacity>
                {/* </> */}

                {/* } */}


                <View style={styles.actions}>
                    <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.createButton} onPress={handleEdit}>
                        <Text style={styles.buttonText}>Update Note</Text>
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

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        color: 'black',
        borderRadius: 8,
        borderColor: "#c99180",
        paddingRight: 30,
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: "#c99180",
        borderRadius: 8,
        color: 'black',
        paddingRight: 30,
    },
});