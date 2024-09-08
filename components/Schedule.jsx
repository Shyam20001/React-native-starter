import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import useFetchData from './api/Fetchdata';

const Schedule = () => {
    const { data, error, loading } = useFetchData('schedule');

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
            <Text style={styles.header}>Company Schedule</Text>
            {data?.schedule?.map((event, index) => (
                <View key={index} style={styles.eventContainer}>
                    <Text style={styles.eventTime}>{event.time}</Text>
                    <Text style={styles.eventTitle}>{event.event}</Text>
                    <Text style={styles.eventDescription}>{event.description}</Text>
                    <Text style={styles.eventLocation}>{event.location}</Text>
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
    eventContainer: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#ff6400b3', // Company theme color
        borderRadius: 5,
    },
    eventTime: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    eventTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    eventDescription: {
        fontSize: 16,
        color: '#fff',
    },
    eventLocation: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 8,
    },
});

export default Schedule;
