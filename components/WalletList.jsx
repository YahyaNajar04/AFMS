import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import colours from './colours'
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function WalletList({ walletList }) {

  const router = useRouter();

  const onWalletPress = (wallet) => {
    router.push({
      pathname: '/walletDetails',
      params : {
        walletId: wallet.id
      }
    })
  }

  const sortedWalletList = walletList ? [...walletList].sort((a, b) => b.balance - a.balance) : [];

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Wallets</Text>
      <View>
        {sortedWalletList &&
          sortedWalletList.map((wallet, index) => (
            <TouchableOpacity key={index} style={styles.addContainer}
              onPress = {() => onWalletPress(wallet)}
            >
              <View style={
                styles.iconContainer
              }
              >
                <Text style={[
                  styles.iconStyle, { backgroundColor: wallet.color }
                ]} >{wallet.icon}</Text>
              </View>
              <View style = { styles.wallets }>
                <View>
                  <Text style = {styles.walletName}> {wallet.name}</Text>
                  <Text style = {styles.Transactions}> {wallet?.Transactions?.length} Transactions</Text>
                </View>
                <Text style = {
                  styles.Transactions
                }>
                  RM {wallet.balance}
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