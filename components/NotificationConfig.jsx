import { View, Text } from 'react-native'
import React from 'react'
import * as Notifications from 'expo-notifications'

Notifications.setNotificationHandler({
      handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
      }),
})

export default function NotificationConfig() {

      return (
    <View>
      <Text>NotificationConfig</Text>
    </View>
  )
}