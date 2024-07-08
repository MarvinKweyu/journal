import { CategoryResultModel } from '@/models/note';
import { journalService } from '@/services/journalService';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

interface CategoriesProps {
    filterCategory: (categoryId: number) => void;
}

export function Categories({ filterCategory }: CategoriesProps) {
    const [categories, setCategories] = useState<CategoryResultModel>({} as CategoryResultModel);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = () => {
        journalService.getCategories().then(res => {
            setCategories(res);
        }).catch(err => {
            console.error('\n\n\nError fetching data:', err);
        });
    }

    return (
        <View style={styles.categories}>

            {categories.results ? (categories.results.map((category, index) => (
                <View key={index} style={styles.category}>
                    <Pressable onPress={() => filterCategory(category.id)}>
                        <Text>{category.name}</Text>
                    </Pressable>

                </View>
            ))) : (<Text>No categories found</Text>)}
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