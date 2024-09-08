import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from 'react-native';
import useFetchData from './api/Fetchdata';

const Holidays = () => {
  const { data, error, loading } = useFetchData('holidays'); // Corrected endpoint name

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
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
    color: '#333', // Darker color for text visibility
  },
  holidayContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f0f0f0', // Light grey for holiday container
    borderRadius: 5,
  },
  holidayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333', // Darker color for text visibility
  },
  holidayDate: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#555', // Slightly lighter color for date
  },
  holidayDescription: {
    fontSize: 16,
    color: '#666', // Lighter color for description
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Ensure background color matches container
    padding: 16,
  },
  errorText: {
    color: 'red', // Red color for error text
    fontSize: 16,
  },
});

export default Holidays;
