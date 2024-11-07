import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function walletInfo({ currentSubscriptionDetails }) {

      console.log("Current Subscription Details:", currentSubscriptionDetails);

  return (
    <View>
      <View>
        <View >
          <Text
            style = {styles.IconContainer}
          >
            {currentSubscriptionDetails?.icon}
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