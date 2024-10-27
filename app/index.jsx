import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

export default function Home() {
      return (
            <View 
            >
                  <Text style={styles.Text}>Hello Expo</Text>
            <Link href={'Wallets/wallets'} aschild>
                  <Button title="go to wallets" />
            </Link>
            </View>
      )
}


const styles = StyleSheet.create({
      Text: {
            fontSize: 30,
            color: 'red',
      }
})