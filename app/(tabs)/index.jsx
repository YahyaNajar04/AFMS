import { View, Text, StyleSheet, Button, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useRouter } from 'expo-router'
import asyncStorageServices from '../../components/asyncStorageServices'
import { client } from '../../components/KindeConfig'
import { supabase } from '../../components/supabaseConfig'
import { TouchableOpacity } from 'react-native'
import ICON from './../../assets/images/user.png'
import colours from '../../components/colours'

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
            const { data, error } = await supabase.from('Wallets')
                  .select('*')
                  .eq('created_by', user.email)

            console.log(data);
      }

      return (
            <View>
                  <View>
                        <TouchableOpacity onPress={() => router.push('/profile')}>
                              <Image source={ICON} style={styles.profileStyle} />
                        </TouchableOpacity>
                  </View>
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
      },
      profileStyle: {
            fontSize: 20,
            color: 'blue',
            borderRadius: 100,
            //backgroundColor: colours.LIGHT_BLUE,
            padding: 20,
            width: 50,
            height: 50,
            marginLeft: 10,
            marginTop: 10
      }
})