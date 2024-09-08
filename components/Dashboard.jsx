// import React from 'react';
// import Holidays from './Holidays';
// import CompanyPolicy from './CompanyPolicy';
// import Schedule from './Schedule';
// import AboutUs from './AboutUs';
// import { View, Text, ScrollView } from 'react-native';

// const Dashboard = () => {
//     return (
//         <ScrollView>
//             <View>
//                 <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Dashboard</Text>
//                 {/* <Holidays /> */}
//                 <CompanyPolicy />
//                 {/* <Schedule /> */}
//                 {/* <AboutUs /> */}
//             </View>
//         </ScrollView>
//     );
// };

// export default Dashboard;

import React, {Suspense, lazy} from 'react';
import * as Keychain from 'react-native-keychain';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Button,
  Alert,
  Linking,
} from 'react-native';

const Holidays = lazy(() => import('./Holidays'));
const CompanyPolicy = lazy(() => import('./CompanyPolicy'));
const Schedule = lazy(() => import('./Schedule'));
const AboutUs = lazy(() => import('./AboutUs'));

const Dashboard = () => {
  const [activeTab, setActiveTab] = React.useState('Schedule');
  const navigation = useNavigation();
  const openMail = () => {
    Linking.openURL('https://login.justhost.com/webmail/').catch(err =>
      console.error('Failed to open URL:', err),
    );
  };
  const handleLogout = async () => {
    try {
      // Clear the saved credentials from Keychain
      await Keychain.resetGenericPassword();
      // Navigate back to the login screen
      navigation.navigate('Login');
    } catch (error) {
      console.error('Logout failed:', error);
      Alert.alert('Logout Failed', 'An error occurred while logging out.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Unique Force Employee Hub</Text>
      <View style={styles.navbar}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => setActiveTab('CompanyPolicy')}>
          <Text style={styles.tabText}>Policies</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => setActiveTab('Holidays')}>
          <Text style={styles.tabText}>Holidays</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => setActiveTab('Schedule')}>
          <Text style={styles.tabText}>Schedule</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => setActiveTab('AboutUs')}>
          <Text style={styles.tabText}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={openMail} // Open mail URL
        >
          <Text style={styles.tabText}>Mail↗️</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Suspense fallback={<ActivityIndicator size="large" color="#0000ff" />}>
          {activeTab === 'CompanyPolicy' && <CompanyPolicy />}
          {activeTab === 'Holidays' && <Holidays />}
          {activeTab === 'Schedule' && <Schedule />}
          {activeTab === 'AboutUs' && <AboutUs />}
        </Suspense>
      </View>
      <View style={styles.logoutContainer}>
        <Button title="Logout" onPress={handleLogout} color="#ff0000" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#ff6400b3',
    padding: 20,
  },
  navbar: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  tab: {
    padding: 10,
    backgroundColor: '#595959',
    marginRight: 5,
    borderRadius: 10,
  },
  tabText: {
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  logoutContainer: {
    marginTop: 20, // Add some spacing from the content
    marginBottom: 30, // Add some spacing at the bottom
  },
});

export default Dashboard;
