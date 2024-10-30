import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
import colours from '../../components/colours'

export default function TabLayout() {
  return (
    <Tabs
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: colours.NAVY_BLUE,
    }}
    >
      <Tabs.Screen
      name = "index"
      options = {{
            title: 'Home',
            tabBarIcon: ({ color }) => 
            <FontAwesome size={24} name="home" color={color} />,
            }}>
      </Tabs.Screen>

      <Tabs.Screen
      name = "Wallets"
      options = {{
            title: 'Wallets',
            tabBarIcon: ({ color }) => 
            <FontAwesome size={24} name="google-wallet" color={color} />,
            }}>
      </Tabs.Screen>

      <Tabs.Screen
      name = "Subscriptions"
      options = {{
            title: 'Subscriptions',
            tabBarIcon: ({ color }) => 
            <FontAwesome size={24} name="calendar" color={color} />,
            }}>
      </Tabs.Screen>

    </Tabs>
  )
}