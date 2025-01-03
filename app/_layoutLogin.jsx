import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import colours from "../components/colours";
import addNewWallet from "../app/addNewWallet";
import addNewSubscription from "../app/addNewSubscription";
import addTransactions from "../app/addTransactions";
import editWallets from "../app/editWallets";

export default function LayoutHome() {
  const [loaded, error] = useFonts({
    "mosterrat-regular": require("./../assets/fonts/Montserrat-Regular.ttf"),
    "mosterrat-bold": require("./../assets/fonts/static/Montserrat-Bold.ttf"),
    "mosterrat-medium": require("./../assets/fonts/static/Montserrat-Medium.ttf"),
  });

  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="Home" // Give a name to the tabs screen
        options={{
          headerShown: false, // Hide header for the tabs screen
        }}
      >
        {() => <TabLayout />} {/* Render your TabLayout here */}
      </Stack.Screen>
      <Stack.Screen
        name="addNewWallet"
        component = {addNewWallet}
        options={{
          title: "Add New Wallet",
          presentation: "modal",
          headerShown: true,
          headerStyle: {
            backgroundColor: colours.WHITE,
          },
        }}
      />
      <Stack.Screen 
        name = "addNewSubscription"
        component = {addNewSubscription}
        options = {{
        title : "Add New Subscription",
        presentation : "modal",
        headerShown : true,
        }}>
        </Stack.Screen>
      <Stack.Screen
        name="addTransactions"
        component={addTransactions}
        options={{
          title: "Add Transactions",
          presentation: "modal",
          headerShown: true,
          headerStyle: {
            backgroundColor: colours.WHITE,
          },
        }}
      />
      <Stack.Screen
      name = "editWallets"
      component = {editWallets}
      options={{
        title : "Edit Wallet",
        presentation : "modal",
        headerShown : true,
      }}
      />
    </Stack>
  );
}
