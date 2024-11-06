import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import ICON from './../../assets/images/user.png'
import colours from '../../components/colours'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import NativePieChart from '../../components/NativePieChart'
import { Link, useRouter } from 'expo-router'

export default function Subscriptions() {

  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
    <View style={{
      padding: 20,
      backgroundColor: colours.LIGHT_BLUE,
      height: 150
    }}>
      <Text style = {{
        fontSize: 30,
        color: colours.WHITE,
        alignSelf: 'center',
        marginTop: 30
      }}
      >Subscriptions</Text>
    </View>
    <View style={{ flex: 1 }} />
    <Link href="/addNewSubscription" style={styles.addContainer}>
      <Ionicons name="add-circle" size={50} color={colours.LIGHT_BLUE}/>
    </Link>
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
    //backgroundColor: colours.WHITE,
    padding: 20,
    width: 50,
    height: 50,
    marginLeft: 10,
    marginTop: 10
  },
  addContainer: {
    position: 'absolute',
    bottom: 15,
    right : 15
  }
})