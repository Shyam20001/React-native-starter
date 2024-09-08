import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import useFetchData from './api/Fetchdata';

const Holidays = () => {
    const { data, error, loading } = useFetchData('holidays');

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text>Error: {error}</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Company Holidays</Text>
            {data?.holidays?.map((holiday, index) => (
                <View key={index} style={styles.holidayContainer}>
                    <Text style={styles.holidayTitle}>{holiday.name}</Text>
                    <Text style={styles.holidayDate}>{holiday.date}</Text>
                    <Text style={styles.holidayDescription}>{holiday.description}</Text>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    holidayContainer: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    holidayTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    holidayDate: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    holidayDescription: {
        fontSize: 16,
        color: '#555',
    },
});

export default Holidays;
