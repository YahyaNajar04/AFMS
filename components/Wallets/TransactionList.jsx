import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Image } from "react-native";
import colors from "../colours";
import colours from "../colours";
import { ScrollView } from "react-native";

export default function TransactionList({ currentWalletDetails }) {

  const date = new Date(currentWalletDetails?.Transactions?.date);
  const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

  return (
    <ScrollView style = {{flex : 1}}>


    <View style={styles.container}>
      <Text style={[styles.heading]}>Wallet Transactions</Text>
      <View>
        {currentWalletDetails?.Transactions?.length > 0 ? ( // Check if Transactions array exists and has elements
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
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    alignItems: "center",
                  }}
                >
                  RM {transaction.amount}
                </Text>
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
          <Text style = {{
            fontSize : 25,
            fontWeight : "bold",
            color : colors.SLATE_GRAY,
          }}>No Transactions Found</Text>
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
