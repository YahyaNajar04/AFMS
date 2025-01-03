import { View, Text, StyleSheet, Touchable } from "react-native";
import React, { useEffect } from "react";
import colours from "./../components/colours";
import { useLocalSearchParams, Link } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { supabase } from "./../components/supabaseConfig";
import WalletInfo from "./../components/Wallets/walletInfo";
import TransactionList from "../components/Wallets/TransactionList";


export default function walletDetails() {
  const { walletId } = useLocalSearchParams();
  const [currentWalletDetials, setcurrentWalletDetails] = useState([]);

  useEffect(() => {
    walletId && getWalletDetails();
  }, [walletId]);

  const getWalletDetails = async () => {
    const { data, error } = await supabase
      .from("Wallets")
      .select("*, Transactions(*)")
      .eq("id", walletId);

    if (error) {
      console.error("Error Fetching Wallet Details:", error.message);
      return;
    } else {
      setcurrentWalletDetails(data[0]);
    }
  };

  return (
    <View
      style={{
        padding: 20,
        marginTop: 20,
        flex: 1,
      }}
    >
      <Link href="/Wallets">
        <Ionicons
          name="chevron-back-outline"
          size={34}
          color="black"
          Text="back"
        />
      </Link>

      <WalletInfo currentWalletDetails={currentWalletDetials} />

      <TransactionList currentWalletDetails={currentWalletDetials} />

      <Link style={styles.addContainer}
            href={{
                 pathname : "/addTransactions",
                 params : {
                        walletId : walletId,
                        balance : currentWalletDetials.balance
                  }
            }}
      >
        <Ionicons name="add-circle" size={50} color={colours.LIGHT_BLUE} />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
      addContainer: {
      position: "absolute",
      bottom: 15,
      right: 15,
      },
});
