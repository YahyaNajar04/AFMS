import { View, Text, StyleSheet, Button, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useRouter } from 'expo-router'
import asyncStorageServices from '../../components/asyncStorageServices'
import { client } from '../../components/KindeConfig'
import { supabase } from '../../components/supabaseConfig'
import { TouchableOpacity } from 'react-native'
import ICON from './../../assets/images/user.png'
import colours from '../../components/colours'
import  Header  from '../../components/navigation/header.jsx'

export default function Home() {

      const router = useRouter();

      useEffect(() => {
            checkUserAuth();
            getWallets();
      }, [])

      const checkUserAuth = async () => {
            const result = await asyncStorageServices.getData('login');
            if (result !== 'true') {
                  router.replace('./../login/LandingPage')
            }
      }

      const getWallets = async () => {
            const user = await client.getUserDetails();
            console.log("User details:", user); 
          
            const { data, error } = await supabase
              .from('Wallets')
              .select('*')
              .eq('created_by', user.email);
          
            if (error) {
              console.error("Error fetching wallets:", error);
            } else {
              console.log("data", data);
            }
          };

      return (
            <View style = {{
                  padding: 20,
                  backgroundColor: colours.LIGHT_BLUE,
                  height: 100
            }}>
                  
                  <Header/>
                  
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