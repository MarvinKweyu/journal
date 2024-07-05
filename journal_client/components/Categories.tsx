import { View, Text, StyleSheet } from 'react-native';

export function Categories() { 

    const categories = [{
        id: 1,
        name: 'Personal',
    }, {
        name: 'Work',
        id: 2,
    }, {
        name: 'Lorem',
        id: 3,
    
    }];

    return (
        <View style={styles.categories}>
            {categories.map((category, index) => (
                <View key={index} style={styles.category}>
                    <Text>{category.name}</Text>
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    
    categories: {
        flexDirection: 'row',
        overflow: 'scroll',
        padding: 8,
    },

    
    category: {
        backgroundColor: '#c99180',
        borderRadius: 16,
        padding: 8,
        marginEnd: 8,
    },
});