import { Text, View, StyleSheet } from 'react-native';
export function Loading() {
    return (
        <View style={styles.container}>
            <Text style={styles.loading}>Loading...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loading: {
        fontSize: 24,
        fontWeight: 'bold',

    }
});