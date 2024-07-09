import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList, ScrollView, SectionList } from 'react-native';

// sample data from notes/summaryn api
const data = {
    today: [
        {
            day: "2024-07-09",
            notes: 4,
            top_category: {
                category__name: "lorem",
                count: 2
            }
        }
    ],
    week: [
        {
            day: "2024-07-02",
            notes: 0,
            top_category: null
        },
        {
            day: "2024-07-03",
            notes: 0,
            top_category: null
        },

    ],
    month: [
        {
            week: "2024-06-11",
            notes: 0,
            top_category: null
        },
        {
            week: "2024-06-18",
            notes: 0,
            top_category: null
        },
    ]
};

const sections = [
    { title: 'Today', data: data.today.map(item => ({ ...item, key: item.day })) },
    { title: 'This Week', data: data.week.map(item => ({ ...item, key: item.day })) },
    { title: 'This Month', data: data.month.map(item => ({ ...item, key: item.week })) },
];

const JournalSummaryScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            
                <Text style={styles.title}>Journal Summary</Text>
            <SectionList
                sections={sections}
                keyExtractor={(item) => item.key}
                renderItem={({ item }) => (
                    <View style={styles.entry}>
                        <Text style={styles.entryText}>Date: {item.day || item.week}</Text>
                        <Text style={styles.entryText}>Notes: {item.notes}</Text>
                        {item.top_category && (
                            <Text style={styles.entryText}>
                                Top Category: {item.top_category.category__name} ({item.top_category.count})
                            </Text>
                        )}
                    </View>
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.sectionTitle}>{title}</Text>
                )}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
    },
    entry: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    entryText: {
        fontSize: 16,
    },
});

export default JournalSummaryScreen;
