import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import colours from './colours'
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function subscriptionList({ subscriptionList }) {

  const router = useRouter();

  const onSubscriptionPress = (subscription) => {
    router.push({
      pathname: '/subscriptionDetails',
      params : {
        subscriptionId: subscription.id
      }
    })
  }

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Subscriptions</Text>
      <View>
        {subscriptionList &&
          subscriptionList.map((subscription, index) => (
            <TouchableOpacity key={index} style={styles.addContainer}
              onPress = {() => onSubscriptionPress(subscription)}
            >
              <View style={
                styles.iconContainer
              }
              >
                <Text style={[
                  styles.iconStyle, { backgroundColor: subscription.color }
                ]} >{subscription.icon}</Text>
              </View>
              <View style = { styles.wallets }>
                <View>
                  <Text style = {styles.walletName}> {subscription.name}</Text>
                  <Text style = {styles.Date}>{subscription.due_date}</Text>
                </View>
                <Text style = {
                  styles.Transactions
                }>
                  RM {subscription.price}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'baseline',
  },
  iconStyle: {
    fontSize: 35,
    padding: 16,
    borderRadius: 15,

  },
  addContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
    marginTop: 10,
    backgroundColor : colours.WHITE,
    borderRadius: 15,
    padding: 10,
  },
  walletName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  Transactions: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  wallets : {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    paddingBottom: 10,
    marginBottom: 10,
    alignItems: 'center'
  }
})