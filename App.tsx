/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// import React from 'react';
// //import type {PropsWithChildren} from 'react';
// import Demo from './pages/Demo';
// import Schedule from './components/Schedule';
// import Login from './components/api/Login';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import {SafeAreaView, StyleSheet, Text, View, } from 'react-native';
// import Dashboard from './components/Dashboard';

// function App(): React.JSX.Element {
//   return (

//   <><Login navigation={Login} /><Dashboard /></>

//   );
// }

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;

// App.js
// import React from 'react';
// import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import Login from './components/api/Login';

// const Stack = createStackNavigator();

// const App = () => {
//   return (
//     <NavigationContainer>
//       <SafeAreaView style={styles.safeArea}>
//         <Stack.Navigator initialRouteName="Login">
//           <Stack.Screen name="Login" component={Login} />
//         </Stack.Navigator>
//       </SafeAreaView>
//     </NavigationContainer>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#fff', // You can set a different background color if needed
//   },
// });

// export default App;
// import React, { useState, useEffect } from 'react';
// import { View, ActivityIndicator } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import Login from './components/api/Login';
// import Dashboard from './components/Dashboard';

// // Initialize the Stack Navigator
// const Stack = createStackNavigator();

// function App(): React.JSX.Element {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true);

//   // Function to check token validity
//   const checkTokenValidity = async () => {
//     try {
//       const token = await AsyncStorage.getItem('userToken');
//       if (token) {
//         // Token exists, mark as authenticated
//         setIsAuthenticated(true);
//       } else {
//         // No token, not authenticated
//         setIsAuthenticated(false);
//       }
//     } catch (error) {
//       console.error('Error fetching token: ', error);
//       setIsAuthenticated(false);
//     } finally {
//       // End loading after token check
//       setLoading(false);
//     }
//   };

//   // Check token on initial load
//   useEffect(() => {
//     checkTokenValidity();
//   }, []);

//   if (loading) {
//     // Display loading spinner while checking token
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         initialRouteName={isAuthenticated ? 'Dashboard' : 'Login'}
//       >
//         <Stack.Screen name="Login" component={Login} />
//         <Stack.Screen name="Dashboard" component={Dashboard} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import * as Keychain from 'react-native-keychain'; // Import Keychain
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/api/Login';
import Dashboard from './components/Dashboard';

// Initialize the Stack Navigator
const Stack = createStackNavigator();

function App(): React.JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Function to check token validity
  const checkTokenValidity = async () => {
    try {
      // Get the token from Keychain
      const credentials = await Keychain.getGenericPassword();
      const token = credentials?.password; // Retrieve the token from credentials
      
      if (token) {
        // Token exists, mark as authenticated
        setIsAuthenticated(true);
      } else {
        // No token, not authenticated
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error fetching token: ', error);
      setIsAuthenticated(false);
    } finally {
      // End loading after token check
      setLoading(false);
    }
  };

  // Check token on initial load
  useEffect(() => {
    checkTokenValidity();
  }, []);

  if (loading) {
    // Display loading spinner while checking token
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isAuthenticated ? 'Dashboard' : 'Login'}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
