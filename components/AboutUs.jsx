import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import useFetchData from './api/Fetchdata';

const AboutUs = () => {
    const { data, error, loading } = useFetchData('aboutus');

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
                <Text style={styles.errorText}>Error: {error}</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>{data.companyName}</Text>
            <Text style={styles.subHeader}>Founded: {data.founded}</Text>
            <Text style={styles.mission}>Mission: {data.mission}</Text>
            <Text style={styles.vision}>Vision: {data.vision}</Text>
            <Text style={styles.subHeader}>Values</Text>
            {data.values.map((value, index) => (
                <Text key={index} style={styles.value}>{value}</Text>
            ))}
            <Text style={styles.subHeader}>Team</Text>
            {data.team.map((member, index) => (
                <View key={index} style={styles.teamMember}>
                    <Text style={styles.memberName}>{member.name}</Text>
                    <Text style={styles.memberRole}>{member.role}</Text>
                    <Text style={styles.memberBio}>{member.bio}</Text>
                </View>
            ))}
            <Text style={styles.subHeader}>Contact Info</Text>
            <View style={styles.contactInfo}>
                <Text style={styles.contactText}>Email: {data.contactInfo.email}</Text>
                <Text style={styles.contactText}>Phone: {data.contactInfo.phone}</Text>
                <Text style={styles.contactText}>Address: {data.contactInfo.address}</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5', // Light background for better contrast
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333', // Darker color for text visibility
    },
    subHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
        color: '#333', // Darker color for text visibility
    },
    mission: {
        fontSize: 16,
        marginBottom: 8,
        color: '#333', // Darker color for text visibility
    },
    vision: {
        fontSize: 16,
        marginBottom: 8,
        color: '#333', // Darker color for text visibility
    },
    value: {
        fontSize: 16,
        color: '#555',
        marginBottom: 4,
    },
    teamMember: {
        marginBottom: 16,
    },
    memberName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333', // Darker color for text visibility
    },
    memberRole: {
        fontSize: 16,
        fontStyle: 'italic',
        color: '#333', // Darker color for text visibility
    },
    memberBio: {
        fontSize: 16,
        color: '#555',
    },
    contactInfo: {
        marginTop: 16,
        padding: 10,
        backgroundColor: '#e0e0e0', // Light grey background for better contrast
        borderRadius: 5,
    },
    contactText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 8,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
    },
});

export default AboutUs;
