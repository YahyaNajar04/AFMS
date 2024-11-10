import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import colours from './../components/colours'
import { useLocalSearchParams, Link } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { supabase } from './../components/supabaseConfig';
import SubsciptionsInfo from './../components/Subscriptions/subscriptionInfo';

export default function subscriptionDetails() {

      const { subscriptionId } = useLocalSearchParams();
      const [ currentSubcriptionDetials, setcurrentSubscriptionDetails] = useState([]);

      useEffect(() => {
            console.log("Wallet Id:", subscriptionId);
            subscriptionId && getSubscriptionDetails();
      }, [subscriptionId])

      const getSubscriptionDetails = async () => {
            const { data, error } = await supabase
                  .from('Subscriptions')
                  .select('*')
                  .eq('id', subscriptionId);

            if (error) {
                  console.error("Error fetching wallet details:", error);
            } else {
                  console.log("Subscription details", data);
                  setcurrentSubscriptionDetails(data[0]);
            }
      }

      return (
            <View style={{
                  padding: 20,
                  marginTop: 20,
            }}>
            <Link href="/Subscriptions">              
            <Ionicons name="chevron-back-outline" size={34} color="black" />
            </Link>
            <SubsciptionsInfo currentSubscriptionDetails={currentSubcriptionDetials}/>

            </View>
      )
}

const styles = StyleSheet.create({
      
})