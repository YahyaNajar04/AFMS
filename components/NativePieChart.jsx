import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import PieChart from "react-native-pie-chart";
import colours from "./colours";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useEffect } from "react";
import WalletList from "./WalletList";

export default function NativePieChart({ walletList }) {
  const widthAndHeight = 150;

  const [values, setValues] = useState([1]);
  const [sliceColor, setSliceColor] = useState([colours.SLATE_GRAY]);
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    updatePieChart();
  }, [walletList]);

  const updatePieChart = () => {
    let newTotalSpent = 0;
    setSliceColor([]);
    setValues([]);

    walletList.forEach((wallet, index) => {
      let totalTransactionAmount = 0;
      wallet.Transactions?.forEach((transaction) => {
        totalTransactionAmount += transaction.amount;
        newTotalSpent += transaction.amount;
      })
      setSliceColor(sliceColor => [...sliceColor, colours.COLOUR_LIST[index]]);
      setValues(values => [...values, totalTransactionAmount])
      setTotalSpent(newTotalSpent);
    })
  }

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 20,
          //fontWeight: 'bold',
          color: colours.BLACK,
        }}
      >
        Total Balance: <Text style={{ fontWeight: "bold" }}>RM {totalSpent}</Text>
      </Text>
      <View style={styles.subContainer}>
        <PieChart
          widthAndHeight={widthAndHeight}
          series={values}
          sliceColor={sliceColor}
          coverRadius={0.65}
          coverFill={"#FFF"}
        />
        
        {walletList.length == 0?  <View style={styles.walletList}>
            <MaterialCommunityIcons
              name="checkbox-blank-circle"
              size={24}
              color={colours.SLATE_GRAY}
            />
            <Text>NA</Text>
          </View>
        :  <View>
          {walletList.map((wallet, index) => (
            <View key = {index} style={styles.walletList}>
              <MaterialCommunityIcons
              name="checkbox-blank-circle"
              size={24}
              color={colours.COLOUR_LIST[index]}
            />
            <Text>{wallet.name}</Text>

            </View>
          ))}
          </View> }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colours.LIGHT_GRAY,
    marginTop: 20,
    padding: 20,
    elevation: 1,
    borderRadius: 15,
  },
  subContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 40,
    marginTop: 10,
  },
  walletList: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
});
