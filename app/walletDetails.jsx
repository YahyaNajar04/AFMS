import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import colours from './../components/colours'
import { useLocalSearchParams } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { supabase } from './../components/supabaseConfig';

export default function walletDetails() {

      const { walletId } = useLocalSearchParams();
      const [walletDetails, setWalletDetails] = useState([]);

      useEffect(() => {
            console.log("Wallet Id:", walletId);
            walletId && getWalletDetails();
      }, [walletId])

      const getWalletDetails = async () => {
            const { data, error } = await supabase
                  .from('Wallets')
                  .select('*, Transactions(*)')
                  .eq('id', walletId);

            if (error) {
                  console.error("Error fetching wallet details:", error);
            } else {
                  console.log("Wallet details", data);
                  setWalletDetails(data[0]);
            }
      }

      return (
            <View style={{
                  padding: 20,
                  marginTop: 20,

            }}>
                  <Ionicons name="chevron-back-outline" size={34} color="black" />
                  <View>
                        <View>
                              <Text style = {{
                                    fontSize: 40,
                              }}>{walletDetails.icon}</Text>
                        </View>
                  </View>

            </View>
      )
}

const styles = StyleSheet.create({
      container: {
            flex: 1,
            backgroundColor: colours.LIGHT_BLUE,
            padding: 20,
      },
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
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            backgroundColor: colours.WHITE,
            borderRadius: 10,
            marginBottom: 10,
      },
      wallets: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
      },
      walletName: {
            fontSize: 20,
            fontWeight: 'bold',
      },
      Transactions: {
            color: colours.GREY,
      },
})