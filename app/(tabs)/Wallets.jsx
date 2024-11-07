import { View, Text, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import { Button } from "react-native";
import ICON from "./../../assets/images/user.png";
import colours from "../../components/colours";
import { TouchableOpacity } from "react-native";
import { Link, useRouter } from "expo-router";
import Header from "../../components/navigation/header.jsx";
import NativePieChart from "../../components/NativePieChart.jsx";
import Ionicons from "@expo/vector-icons/Ionicons";
import WalletList from "../../components/WalletList.jsx";
import { useEffect } from "react";
import { client } from "../../components/KindeConfig";
import { supabase } from "../../components/supabaseConfig";
import { ScrollView } from "react-native";
import { RefreshControl } from "react-native";

export default function Wallets() {
  const router = useRouter();

  const [walletList, setWalletList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getWallets();
  }, []);

  const getWallets = async () => {
    setLoading(true);
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
      data && setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={() => getWallets()} refreshing={loading} />
        }
      >
        <View
          style={{
            padding: 20,
            backgroundColor: colours.LIGHT_BLUE,
            height: 150,
          }}
        >
          </View>
          <View style = {{
            padding: 20,
            marginTop: -130
          }}>
          <NativePieChart />
          <WalletList walletList={walletList} />

          </View>
        
        </ScrollView>

        <View style={styles.addContainer}>
          <Link href="/addNewWallet">
            <Ionicons name="add-circle" size={50} color={colours.LIGHT_BLUE} />
          </Link>
        </View>

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
    //backgroundColor: colours.WHITE,
    padding: 20,
    width: 50,
    height: 50,
    marginLeft: 10,
    marginTop: 10,
  },
  addContainer: {
    position: "absolute",
    bottom: 15,
    right: 15,
  },
});
