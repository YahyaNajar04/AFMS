import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useEffect } from 'react'
import { Link, useRouter } from 'expo-router'
import asyncStorageServices from '../../components/asyncStorageServices'
import { client } from '../../components/KindeConfig'

export default function Home() {

      const router = useRouter();

      useEffect(() => {
            checkUserAuth()
      }, [])

      const checkUserAuth = async () => {
            const result = await asyncStorageServices.getData('login');
            if (result !== 'true') {
                  router.replace('/login')
            }
      }

      const handleLogout = async () => {
            const loggedOut = await client.logout();
            if (loggedOut) {
                  await asyncStorageServices.storeData('login', 'false');
                  router.replace('/login');
                  // User was logged out
            }
      };

      return (
            <View>
                  <Text style={styles.Text}>Hello Expo</Text>
                  <Button title="Logout" onPress={handleLogout}
                  />

            </View>
      )
}


const styles = StyleSheet.create({
      Text: {
            fontSize: 30,
            color: 'red',
      }
})