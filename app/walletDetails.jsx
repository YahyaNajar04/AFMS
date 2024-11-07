import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import colours from './../components/colours'
import { useLocalSearchParams, Link } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { supabase } from './../components/supabaseConfig';
import WalletInfo from './../components/Wallets/walletInfo';

export default function walletDetails() {

      const { walletId } = useLocalSearchParams();
      const [ currentWalletDetials, setcurrentWalletDetails] = useState([]);

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
                  setcurrentWalletDetails(data[0]);
            }
      }

      return (
            <View style={{
                  padding: 20,
                  marginTop: 20,
            }}>
            <Link href="/Wallets">              
            <Ionicons name="chevron-back-outline" size={34} color="black" />
            </Link>
            <WalletInfo currentWalletDetails={currentWalletDetials}/>

            </View>
      )
}

const styles = StyleSheet.create({
      
})