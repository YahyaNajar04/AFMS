import { View, Text, StyleSheet, Button, Image } from "react-native";
import React, { useEffect } from "react";
import asyncStorageServices from "../../components/asyncStorageServices";
import { client } from "../../components/KindeConfig";
import { supabase } from "../../components/supabaseConfig";
import colours from "../../components/colours";
import Header from "../../components/navigation/header.jsx";
import NativePieChart from "../../components/NativePieChart.jsx";
import SubscriptionList from "../../components/SubscriptionList.jsx";
import WalletList from "../../components/WalletList.jsx";
import { ScrollView } from "react-native";
import { RefreshControl } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function Home() {

  const router = useRouter();
  const [walletList, setWalletList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [subscriptionList, setSubscriptionList] = useState([]);

  useEffect(() => {
    checkUserAuth();
    getWallets();
    getSubscriptions();
  }, []);

  const checkUserAuth = async () => {
    const result = await asyncStorageServices.getData("login");
    if (result !== "true") {
      router.replace("./../login/LandingPage");
    }
  };

  const getWallets = async () => {
    const user = await client.getUserDetails();
    console.log("User details:", user);

    const { data, error } = await supabase
      .from("Wallets")
      .select("*, Transactions(*)")
      .eq("created_by", user.email);

    if (error) {
      console.error("Error fetching wallets:", error);
    } else {
      console.log("Wallets", data);
      setWalletList(data);
    }
  };

  const getSubscriptions = async () => {
    const user = await client.getUserDetails();
    console.log("User details:", user);

    const { data, error } = await supabase
      .from("Subscriptions")
      .select("*")
      .eq("created_by", user.email);

    if (error) {
      console.error("Error fetching subscriptions:", error);
    } else {
      console.log("subscriptions", data);
      setSubscriptionList(data);
      data && setLoading(false);
    }
  };

  return (
    <View>
        <ScrollView 
        refreshControl={
            <RefreshControl onRefresh={() => {
                  getWallets();
                  getSubscriptions();
            }} refreshing={loading} />
          }
        >
          <View
            style={{
              padding: 20,
              backgroundColor: colours.LIGHT_BLUE,
              height: 150,
            }}
          >
            <Header />
          </View>

          <View style = {{
            padding : 20,
            marginTop : -80
          }}>
            <NativePieChart walletList = {walletList}/>
            <View>
            <WalletList walletList={walletList.slice(0,2)}/>
            </View>

            <SubscriptionList  subscriptionList={subscriptionList.slice(0,2)}/>
          </View>
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  Text: {
    fontSize: 30,
    color: "red",
  },
  profileStyle: {
    fontSize: 20,
    color: "blue",
    borderRadius: 100,
    //backgroundColor: colours.LIGHT_BLUE,
    padding: 20,
    width: 50,
    height: 50,
    marginLeft: 10,
    marginTop: 10,
  },
});
