import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { Button } from 'react-native'
import ICON from './../../assets/images/user.png'
import colours from '../../components/colours'
import { TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'

export default function Wallets() {

  const router = useRouter()

  return (
    <View>
      <View>
        <TouchableOpacity onPress={() => router.push('/profile')}>
          <Image source={ICON} style={styles.profileStyle} />
        </TouchableOpacity>
      </View>
      <Text>wallets</Text>

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
  }
})