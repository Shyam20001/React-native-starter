// import React, {useState} from 'react';
// import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
// import axios from 'axios';
// import * as Keychain from 'react-native-keychain';
// import {API_URL} from '@env'; // Load the API URL from .env
// //import { Config } from 'react-native-config';

// const Login = ({navigation}) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async () => {
//     try {
//       const response = await axios.post(`${API_URL}/login`, {
//         userid: username,
//         pwd: password,
//       });
//       const {token} = response.data;

//       // Store token securely
//       await Keychain.setGenericPassword('user', token);

//       // Navigate to the main screen
//       navigation.navigate('Dashboard');
//       //Alert.alert('JWT Token', `${token}`);
//     } catch (error) {
//       if (error.response) {
//         Alert.alert(
//           'Login Failed',
//           error.response.data.error || 'An error occurred',
//         );
//       } else {
//         Alert.alert('Login Failed', 'An error occurred');
//       }
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Unique Force</Text>
//       <View style={styles.form}>
//         <Text style={styles.label}>Enter Your UserID</Text>
//         <TextInput
//           style={styles.input}
//           value={username}
//           onChangeText={setUsername}
//           placeholder="example@uniqueforce.in"
//           placeholderTextColor="#aaa" // Light grey for placeholder text
//         />
//         <Text style={styles.label}>Password</Text>
//         <TextInput
//           style={styles.input}
//           value={password}
//           onChangeText={setPassword}
//           placeholder="Enter your password"
//           secureTextEntry
//           placeholderTextColor="#aaa" // Light grey for placeholder text
//         />
//         <Button title="Login" onPress={handleLogin} />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f5f5f5',
//   },
//   heading: {
//     fontSize: 44,
//     fontWeight: 'bold',
//     backgroundColor: '#ff6400b3', // Company theme color
//     color: '#fff', // White text color for contrast
//     padding: 10,
//     textAlign: 'center',
//     borderRadius: 20,
//   },
//   form: {
//     width: '80%',
//     padding: 20,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     elevation: 5,
//   },
//   label: {
//     marginBottom: 5,
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333', // Darker color for better visibility
//   },
//   input: {
//     height: 40,
//     borderColor: '#ddd',
//     borderWidth: 1,
//     borderRadius: 5,
//     marginBottom: 15,
//     paddingHorizontal: 10,
//     fontSize: 16,
//     color: '#333', // Darker color for text visibility
//     placeholderTextColor: '#aaa', // Light grey for placeholder text
//   },
// });


// export default Login;


//////////////////////////////////////////////////////////

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import { API_URL } from '@env'; // Load the API URL from .env

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  // Effect to check if both fields are filled
  useEffect(() => {
    if (username.trim() !== '' && password.trim() !== '') {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [username, password]);

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        userid: username,
        pwd: password,
      });
      const { token } = response.data;

      // Store token securely
      await Keychain.setGenericPassword('user', token);

      // Navigate to the main screen
      navigation.navigate('Dashboard');
      //Alert.alert('JWT Token', `${token}`);
    } catch (error) {
      if (error.response) {
        Alert.alert(
          'Login Failed',
          error.response.data.error || 'An error occurred',
        );
      } else {
        Alert.alert('Login Failed', 'An error occurred');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Unique Force</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Enter Your UserID</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="example@uniqueforce.in"
          placeholderTextColor="#aaa" // Light grey for placeholder text
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry
          placeholderTextColor="#aaa" // Light grey for placeholder text
        />
        <Button
          title="Login"
          onPress={handleLogin}
          disabled={!isButtonEnabled} // Disable button if fields are not filled
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: 44,
    fontWeight: 'bold',
    backgroundColor: '#ff6400b3', // Company theme color
    color: '#fff', // White text color for contrast
    padding: 10,
    textAlign: 'center',
    borderRadius: 20,
  },
  form: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: '600',
    color: '#333', // Darker color for better visibility
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#333', // Darker color for text visibility
    placeholderTextColor: '#aaa', // Light grey for placeholder text
  },
});

export default Login;
