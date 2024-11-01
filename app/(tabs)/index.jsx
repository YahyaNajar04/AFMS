import { View, Text, StyleSheet, Button, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useRouter } from 'expo-router'
import asyncStorageServices from '../../components/asyncStorageServices'
import { client } from '../../components/KindeConfig'
import { supabase } from '../../components/supabaseConfig'
import { TouchableOpacity } from 'react-native'
import ICON from './../../assets/images/user.png'
import colours from '../../components/colours'
import Header from '../../components/navigation/header.jsx'
import PieChart from 'react-native-pie-chart'

export default function Home() {

      const router = useRouter();

      useEffect(() => {
            checkUserAuth();
            getWallets();
            getSubscriptions();
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
                  console.log("Wallets", data);
            }
      };

      const getSubscriptions = async () => {
            const user = await client.getUserDetails();
            console.log("User details:", user);

            const { data, error } = await supabase
                  .from('Subscriptions')
                  .select('*')
                  .eq('created_by', user.email);

            if (error) {
                  console.error("Error fetching subscriptions:", error);
            } else {
                  console.log("subscriptions", data);
            }
      };

      const widthAndHeight = 250
      const series = [123, 321, 123, 789, 537]
      const sliceColor = ['#fbd203', '#ffb300', '#ff9100', '#ff6c00', '#ff3c00']

      return (
            <View style={{
                  padding: 20,
                  backgroundColor: colours.LIGHT_BLUE,
                  height: 100
            }}>
                  <Header />

                  <PieChart
                        widthAndHeight={widthAndHeight}
                        series={series}
                        sliceColor={sliceColor}
                        coverRadius={0.45}
                        coverFill={'#FFF'}
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