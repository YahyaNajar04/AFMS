import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'
import asyncStorageServices from '../components/asyncStorageServices'
import { client } from '../components/KindeConfig'
import { useRouter } from 'expo-router'

export default function Profile() {



  const router = useRouter();

  
  const handleLogout = async () => {
    const loggedOut = await client.logout();
    if (loggedOut) {
          await asyncStorageServices.storeData('login', 'false');
          router.replace('/login');
          // User was logged out
    }
};

  return (
    <View style={styles.container}>
      <Text style = {{
        fontSize: 30,
        color: 'black'
      }}>Profile Screen</Text>
      <Text style={styles.Text}>Hello Expo</Text>
      <Button title="Logout" onPress={handleLogout}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});