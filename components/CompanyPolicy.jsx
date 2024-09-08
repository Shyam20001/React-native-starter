import React from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet, ScrollView } from 'react-native'; // Import ScrollView
import useFetchData from './api/Fetchdata';

const CompanyPolicy = () => {
    const { data, error, loading } = useFetchData('company-policy');

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
            <Text style={styles.header}>Company Policies</Text>
            {data?.policies?.map((policy, index) => (
                <View key={index} style={styles.policyContainer}>
                    <Text style={styles.policyTitle}>{policy.title}</Text>
                    <Text style={styles.policyDescription}>{policy.description}</Text>
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
    policyContainer: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    policyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    policyDescription: {
        fontSize: 16,
        color: '#555',
    },
});

export default CompanyPolicy;
