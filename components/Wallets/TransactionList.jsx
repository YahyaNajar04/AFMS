import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Image } from "react-native";
import colors from "../colours";
import colours from "../colours";
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Alert } from "react-native";
import { supabase } from "../supabaseConfig";
import { ToastAndroid } from "react-native";
import { useRouter } from "expo-router";

export default function TransactionList({ currentWalletDetails }) {
  const date = new Date(currentWalletDetails?.Transactions?.date);
  const formattedDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;
  

  const router = useRouter();

  const onDeleteTransaction = (transactionId) => {

    console.log ("Transaction ID:", transactionId);
    Alert.alert(
      "Are you sure you want to delete this transaction?",
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
            try {
              const { error } = await supabase
                .from("Transactions")
                .delete()
                .eq("id", transactionId);
  
              if (error) {
                console.error("Error Deleting Transaction:", error.message);
                ToastAndroid.show("Error Deleting Transaction", ToastAndroid.SHORT);
                return;
              }
  
              ToastAndroid.show("Transaction Deleted Successfully", ToastAndroid.SHORT);
              router.replace("/(tabs)");
            } catch (error) {
              console.error("Unexpected error during deletion:", error);
              ToastAndroid.show("An unexpected error occurred", ToastAndroid.SHORT);
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={[styles.heading]}>Wallet Transactions</Text>
        <View>
          {currentWalletDetails?.Transactions?.length > 0 ? (
            currentWalletDetails?.Transactions?.map((transaction, index) => (
              <View key={index}>
                <View style={styles.TransactionContainer}>
                  <Image
                    source={{ uri: transaction.image }}
                    style={styles.image}
                  />
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                      {transaction.name}
                    </Text>
                    <Text style={{ fontSize: 15, fontWeight: "medium" }}>
                      {transaction.date}
                    </Text>
                    <Text style={{ color: colors.SLATE_GRAY }}>
                      Note : {transaction.note}
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        alignItems: "center",
                      }}
                    >
                      RM {transaction.amount}
                    </Text>
                    <TouchableOpacity
                      onPress={() => onDeleteTransaction(transaction.id)}
                      style={{
                        alignSelf: "flex-end",
                        marginLeft: 10,
                        marginTop: 25,
                      }}
                    >
                      <Ionicons name="trash" size={24} color="red" />
                    </TouchableOpacity>
                  </View>
                </View>
                {currentWalletDetails?.Transactions?.length - 1 !== index && (
                  <View
                    style={{
                      borderWidth: 0.5,
                      borderBottomColor: colors.SLATE_GRAY,
                      marginBottom: 12,
                      marginTop: -8,
                    }}
                  ></View>
                )}
              </View>
            ))
          ) : (
            <Text
              style={{
                fontSize: 25,
                fontWeight: "bold",
                color: colors.SLATE_GRAY,
              }}
            >
              No Transactions Found
            </Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    borderTopWidth: 0,
    borderTopColor: "black",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  image: {
    width: 80,
    height: 80,
    backgroundColor: colors.LIGHT_GRAY,
    borderRadius: 10,
  },
  TransactionContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
});
