import { View, Text, StyleSheet, ToastAndroid } from "react-native";
import React, { useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import colours from "../colours";
import { useState } from "react";
import { supabase } from "../supabaseConfig";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Alert } from "react-native";

export default function walletInfo({ currentWalletDetails }) {
  useEffect(() => {
    currentWalletDetails && totalPercentage();
  }, [currentWalletDetails]);

  const [newBalance, setNewBalance] = useState(currentWalletDetails.balance);

  const [percentage, setPercentage] = useState();
  const [totalspent, setTotalspent] = useState();
  const [remainingBalance, setRemainingBalance] = useState();
  const router = useRouter();

  const totalPercentage = () => {
    let total = 0;
    currentWalletDetails?.Transactions?.forEach((transaction) => {
      total = total + transaction.amount;
    });
    console.log("Total cost:", total);
    setTotalspent(total);

    const remainingBalance = currentWalletDetails.balance - total;
    setRemainingBalance(remainingBalance);

    const newWalletBalance = currentWalletDetails.balance - total;
    setNewBalance(newWalletBalance);

    let percentage = (total / currentWalletDetails.balance) * 100;

    if (percentage > 100) {
      percentage = 100;
    }

    setPercentage(percentage + "%");
    console.log("Percentage:", percentage);
  };

  const onDeleteCategory = () => {
    Alert.alert(
      "Are you sure you want to delete this wallet?",
      "This action cannot be undone",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          style: "destructive",
          onPress: async () => {
            const { error } = await supabase
              .from("Transactions")
              .delete()
              .eq("wallet_id", currentWalletDetails.id);

            await supabase
              .from("Wallets")
              .delete()
              .eq("id", currentWalletDetails.id);

            ToastAndroid.show(
              "Wallet Deleted Successfully",
              ToastAndroid.SHORT
            );
            router.replace("/(tabs)");

            if (error) {
              ToastAndroid.show("Error Deleting Wallet", ToastAndroid.SHORT);
            }
          },
        },
      ]
    );
  };

  return (
    <View>
      <View style={styles.WalletContainer}>
        <View style={styles.IconContainer}>
          <Text
            style={[
              styles.TextIconContainer,
              { backgroundColor: currentWalletDetails.color },
            ]}
          >
            {currentWalletDetails.icon}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            marginLeft: 15,
          }}
        >
          <Text style={styles.walletName}>{currentWalletDetails.name}</Text>
          <Text style={styles.Transactions}>
            {currentWalletDetails.Transactions?.length} Transactions
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            RM {newBalance !== undefined ? newBalance.toFixed(2) : "0.00"}
          </Text>
        </View>
        <View>
          <TouchableOpacity
            style={{
              marginBottom: 10,
            }}
            onPress={() =>
              router.replace({
                pathname: './editWallets',
                params: {
                  walletId: currentWalletDetails.id,
                },
              })
            }
          >
            <Ionicons name="pencil" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDeleteCategory()}>
            <Ionicons name="trash" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.balanceContainer}>
        <Text>
          Spent : RM{totalspent !== undefined ? totalspent.toFixed(2) : "0.00"}
        </Text>
        <Text>    
          Balance Remaining : RM
          {remainingBalance !== undefined
            ? remainingBalance.toFixed(2)
            : "0.00"}
        </Text>
      </View>
      <View style={styles.budgetBar}>
        <View style={[styles.budgetBarContainer, { width: percentage }]}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  IconContainer: {
    alignItems: "baseline",
    justifyContent: "center",
  },
  TextIconContainer: {
    padding: 20,
    borderRadius: 15,
    fontSize: 25,
  },
  WalletContainer: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  walletName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  Transactions: {
    fontSize: 15,
    fontWeight: "bold",
  },
  balanceContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  budgetBar: {
    width: "100%",
    height: 20,
    backgroundColor: colours.SLATE_GRAY,
    borderRadius: 10,
    marginTop: 7,
    borderRadius: 99,
  },
  budgetBarContainer: {
    height: "100%",
    backgroundColor: colours.LIGHT_BLUE,
    borderRadius: 99,
  },
});
