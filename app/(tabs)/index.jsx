import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useEffect } from 'react'
import { Link, useRouter } from 'expo-router'
import asyncStorageServices from '../../components/asyncStorageServices'
import { client } from '../../components/KindeConfig'
import { supabase } from '../../components/supabaseConfig'

export default function Home() {

      const router = useRouter();

      useEffect(() => {
            checkUserAuth();
            getWallets();
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

      const getWallets = async () => {
            const user = await client.getUserDetails();
            const {data, error} = await supabase.from('Wallets')
            .select('*')
            .eq('created_by', user.email)

            console.log(data);
      }

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