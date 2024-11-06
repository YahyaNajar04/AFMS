import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function SubscriptionList() {
  return (
    <View>
      <Text>SubscriptionList</Text>
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