import { View, Text, StyleSheet, ToastAndroid } from "react-native";
import React, { useState, useEffect } from "react";
import { TextInput, TouchableOpacity } from "react-native";
import colours from "../components/colours";
import ColorPicker from "../components/ColorPicker";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { supabase } from "../components/supabaseConfig";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function EditWallet() {
  const router = useRouter();
  const { walletId } = useLocalSearchParams();

  const [walletDetails, setWalletDetails] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState("IC");
  const [selectedColour, setSelectedColour] = useState(colours.LIGHT_BLUE);
  const [walletName, setWalletName] = useState("");
  const [balance, setBalance] = useState("");


  useEffect(() => {
    fetchWalletDetails();
  }, []);

  const fetchWalletDetails = async () => {
    const { data, error } = await supabase
      .from("Wallets")
      .select("*")
      .eq("id", walletId)
      .single();

    if (error) {
      console.error("Error fetching wallet details:", error);
      ToastAndroid.show("Failed to fetch wallet details", ToastAndroid.SHORT);
      return;
    }

    setWalletDetails(data);
    setSelectedIcon(data.icon || "IC");
    setSelectedColour(data.color || colours.LIGHT_BLUE);
    setWalletName(data.name || "");
    setBalance(data.balance ? data.balance.toString() : "");
  };

  // Function to update the wallet
  const onUpdateWallet = async () => {
    const { id } = walletDetails;
    const { data, error } = await supabase
      .from("Wallets")
      .update({
        name: walletName,
        balance: parseFloat(balance),
        icon: selectedIcon,
        color: selectedColour,
      })
      .eq("id", id)
      .select();

    if (data) {
      ToastAndroid.show("Wallet updated successfully", ToastAndroid.SHORT);
      router.replace("/(tabs)");
    }

    if (error) {
      console.error("Error updating wallet:", error);
      ToastAndroid.show("Failed to update wallet", ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TextInput
          style={[styles.iconInput, { backgroundColor: selectedColour }]}
          maxLength={2}
          value={selectedIcon}
          placeholder="IC"
          onChangeText={(value) => setSelectedIcon(value)}
        />
        <ColorPicker
          selectedColour={selectedColour}
          setSelectedColour={(color) => setSelectedColour(color)}
        />
      </View>

      <View style={styles.inputStyle}>
        <MaterialIcons name="label" size={24} color="black" />
        <TextInput
          placeholder="Wallet Name"
          value={walletName}
          onChangeText={(value) => setWalletName(value)}
          style={{ fontSize: 18, width: "100%" }}
        />
      </View>

      <View style={styles.inputStyle}>
        <FontAwesome6 name="money-bill-wave" size={24} color="black" />
        <TextInput
          placeholder="Balance"
          value={balance}
          keyboardType="numeric"
          onChangeText={(value) => setBalance(value)}
          style={{ fontSize: 18, width: "100%" }}
        />
      </View>

      <TouchableOpacity
        style={styles.updateButton}
        disabled={!walletName || !balance}
        onPress={onUpdateWallet}
      >
        <Text style={{ fontSize: 20, color: colours.WHITE }}>
          Update Wallet
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colours.WHITE,
  },
  iconInput: {
    textAlign: "center",
    fontSize: 30,
    padding: 20,
    borderRadius: 99,
    paddingHorizontal: 28,
    color: colours.WHITE,
    marginTop: 80,
  },
  inputStyle: {
    borderBottomWidth: 1,
    borderBottomColor: colours.BLACK,
    fontSize: 25,
    padding: 10,
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    gap : 10
  },
  updateButton: {
    backgroundColor: colours.LIGHT_BLUE,
    padding: 10,
    borderRadius: 10,
    marginTop: 40,
    alignItems: "center",
  },
});
