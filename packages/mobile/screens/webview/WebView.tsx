import React, { useState } from 'react';
import { StatusBar, StyleSheet, View, TouchableOpacity, Text } from 'react-native'; // Import TouchableOpacity
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackScreens } from '../../App';
import { WebView as NativeWebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';

export default function WebView({}: NativeStackScreenProps<StackScreens, 'App'>) {
  const navigation = useNavigation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSignOut = async () => {
    try {
      // Make a request to the logout endpoint
      const response = await fetch('http://127.0.0.1:50000/auth/logout', {
        method: 'POST',
      });

      if (response.ok) {
        // Clear local session data and navigate to the 'Login' screen
        navigation.navigate('Login' as never);
      } else {
        // Handle logout failure
        const responseData = await response.json();
        setErrorMessage(responseData.message || 'Failed to log out.');
      }
    } catch (error) {
      console.error('Error during logout:', error);
      setErrorMessage('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <NativeWebView 
        style={styles.webView}
        source={{ uri: process.env.EXPO_PUBLIC_WEBAPP_ROOT as string }} 
      />
      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
      <StatusBar hidden />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20,
    backgroundColor: '#f5f5f5', 
  },
  button: {
    height: 50,
    width: '80%', 
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50', 
    marginTop: 10,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  errorMessage: {
    color: '#D32F2F', // Error message color aligned
    marginTop: 10,
    textAlign: 'center',
  },
  webView: {
    flex: 1,
    width: '100%', // Full width
    marginTop: 20, // Space above the WebView
  },
});