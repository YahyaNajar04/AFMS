import { View, Text, StyleSheet, Button } from 'react-native'
import React, {useEffect} from 'react'
import { Link, useRouter } from 'expo-router'
import asyncStorageServices from '../components/asyncStorageServices'
export default function Home() {

      const router = useRouter();

      useEffect(() => {
            checkUserAuth()
      }, [])

      const checkUserAuth = async() => {
            const result = await asyncStorageServices.getData('login')
            if(result !== 'true') {
                  console.log("User not authenticated")
                  router.replace('/login')
            }

      }
      return (
            <View 
            >
                  <Text style={styles.Text}>Hello Expo</Text>
            
            </View>
      )
}


const styles = StyleSheet.create({
      Text: {
            fontSize: 30,
            color: 'red',
      }
})