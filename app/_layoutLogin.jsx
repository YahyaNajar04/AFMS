import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { useFonts } from 'expo-font';
import { Modal } from 'react-native-web';

export default function LayoutHome() {

  const [loaded, error] = useFonts({
    'mosterrat-regular': require('./../assets/fonts/Montserrat-Regular.ttf'),
    'mosterrat-bold': require('./../assets/fonts/static/Montserrat-Bold.ttf'),
    'mosterrat-medium': require('./../assets/fonts/static/Montserrat-Medium.ttf'),
  })

  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name='(tabs)'
        options={{
          headerShown: false
        }}>
      </Stack.Screen>

      <Stack.Screen name="addNewWallet"
      options = {{
        presentation : 'modal',
        headerShown: true,
        title: 'Add New Wallet',
      }}
      />

    </Stack>


  )
}