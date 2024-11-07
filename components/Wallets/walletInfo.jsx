import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function walletInfo({ currentWalletDetails }) {

  return (
    <View>
      <View>
        <View >
          <Text
            style = {styles.IconContainer}
          >
            {currentWalletDetails.icon}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  IconContainer: {
    fontsize: 50,
  },
});
