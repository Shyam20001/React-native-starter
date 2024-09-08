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
                <Text>Error: {error}</Text>
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
            <Text>Email: {data.contactInfo.email}</Text>
            <Text>Phone: {data.contactInfo.phone}</Text>
            <Text>Address: {data.contactInfo.address}</Text>
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
    subHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
    },
    mission: {
        fontSize: 16,
        marginBottom: 8,
    },
    vision: {
        fontSize: 16,
        marginBottom: 8,
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
    },
    memberRole: {
        fontSize: 16,
        fontStyle: 'italic',
    },
    memberBio: {
        fontSize: 16,
        color: '#555',
    },
});

export default AboutUs;
