import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Stack, Tabs } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
import colours from '../../components/colours'
import { TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'

export default function TabLayout() {

  const router = useRouter();
  return (

    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colours.NAVY_BLUE,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) =>
            <FontAwesome size={24} name="home" color={color} />,
        }}>
      </Tabs.Screen>

      <Tabs.Screen
        name="Wallets"
        options={{
          title: 'Wallets',
          tabBarIcon: ({ color }) =>
            <FontAwesome size={24} name="google-wallet" color={color} />,
        }}>
      </Tabs.Screen>

      <Tabs.Screen
        name="Subscriptions"
        options={{
          title: 'Subscriptions',
          tabBarIcon: ({ color }) =>
            <FontAwesome size={24} name="calendar" color={color} />,
        }}>
      </Tabs.Screen>
    </Tabs>

    
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
        backgroundColor: 'yellow',
        padding: 20,
        width: 100,
  }
})