import { View, Text, StyleSheet} from 'react-native'
import React from 'react'
import colours from '../colours'
import { useLocalSearchParams } from 'expo-router'


export default function editWallet() {

      const { walletId } = useLocalSearchParams();
  return (
    <View>
      <Text>editWallet for {walletId}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
      container: {
      flex: 1,
      backgroundColor: colours.LIGHT_GRAY,
      },
      logout: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      backgroundColor: colours.WHITE,
      },
      addContainer: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      backgroundColor: colours.EMERALD_GREEN,
      padding: 10,
      borderRadius: 50,
      },
})