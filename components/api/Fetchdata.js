// import { useEffect, useState } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage for React Native
// import * as Keychain from 'react-native-keychain'; // Import Keychain for React Native
// import { API_URL } from '@env';

// const useFetchData = (filename) => {
//     const [data, setData] = useState(null);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const token = await AsyncStorage.getItem('user'); // Get the JWT token from AsyncStorage
//                 console.log('Retrieved Token:', token); // Log the token

//                 const response = await fetch(`${API_URL}/data/${filename}`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`, // Attach the token to the Authorization header
//                     },
//                 });

//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }

//                 const result = await response.json();
//                 setData(result);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [filename]);

//     return { data, error, loading };
// };

// export default useFetchData;
//////////////////////////////////////////////////////////////////////////////////////////

// import { useEffect, useState } from 'react';
// import * as Keychain from 'react-native-keychain'; // Import Keychain for React Native
// import { API_URL } from '@env';

// const useFetchData = (filename) => {
//     const [data, setData] = useState(null);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 // Get the JWT token from Keychain
//                 const credentials = await Keychain.getGenericPassword();
//                 const token = credentials?.password;

//                 console.log('Retrieved Token:', token); // Log the token

//                 const response = await fetch(`${API_URL}/data/${filename}`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`, // Attach the token to the Authorization header
//                     },
//                 });

//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }

//                 const result = await response.json();
//                 setData(result);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [filename]);

//     return { data, error, loading };
// };

// export default useFetchData;


import { useEffect, useState } from 'react';
import * as Keychain from 'react-native-keychain'; // Import Keychain for React Native
import { API_URL } from '@env';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook for navigation

const useFetchData = (filename) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation(); // Use navigation hook

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get the JWT token from Keychain
                const credentials = await Keychain.getGenericPassword();
                const token = credentials?.password;

                //console.log('Retrieved Token:', token); // Log the token

                const response = await fetch(`${API_URL}/data/${filename}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Attach the token to the Authorization header
                    },
                });

                if (response.status === 401 || response.status === 403) {
                    // Token is invalid or expired
                    await Keychain.resetGenericPassword(); // Clear the token from Keychain
                    navigation.navigate('Login'); // Redirect to login page
                    throw new Error('Failed to authenticate token');
                }

                if (!response.ok) {
                    throw new Error('We are currently experiencing some issues with our servers. Please try again later. We apologize for the inconvenience and appreciate your patience.');
                }

                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [filename, navigation]); // Add navigation to dependency array

    return { data, error, loading };
};

export default useFetchData;
