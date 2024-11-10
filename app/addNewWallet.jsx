import {
  View,
  Text,
  StyleSheet,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { TextInput } from "react-native";
import { useState } from "react";
import colours from "../components/colours";
import ColorPicker from "../components/ColorPicker";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { TouchableOpacity } from "react-native";
import { supabase } from "../components/supabaseConfig";
import { client } from "../components/KindeConfig";
import { useRouter } from "expo-router";

export default function AddNewWallet() {
  const [selectedIcon, setSelectedIcon] = useState("IC");
  const [selectedColour, setSelectedColour] = useState(colours.LIGHT_BLUE);
  const [walletName, setWalletName] = useState();
  const [balance, setBalance] = useState();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onCreateWallet = async () => {
    setLoading(true);
    const user = await client.getUserDetails();
    const { data, error } = await supabase
      .from("Wallets")
      .insert([
        {
          name: walletName,
          balance: balance,
          icon: selectedIcon,
          color: selectedColour,
          created_by: user.email,
        },
      ])
      .select();

    console.log("Wallet created", data);

    if (data) {
      router.replace({
        pathname: "/walletDetails",
        params: {
          walletId: data[0].id,
        },
      });
      setLoading(false);
      ToastAndroid.show("Wallet created successfully", ToastAndroid.SHORT);
    }
    if (error) {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        marginTop: 20,
        padding: 20,
        backgroundColor: colours.LIGHT_GRAY,
        height: "100%",
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextInput
          style={[styles.iconInput, { backgroundColor: selectedColour }]}
          maxLength={2}
          onChangeText={(value) => setSelectedIcon(value)}
        >
          {selectedIcon}
        </TextInput>
        <ColorPicker
          selectedColour={selectedColour}
          setSelectedColour={(color) => setSelectedColour(color)}
        />
      </View>
      <View style={styles.inputStyle}>
        <MaterialIcons name="label" size={24} color="black" />
        <TextInput
          placeholder="Wallet Name"
          onChangeText={(value) => setWalletName(value)}
          style={{ fontSize: 18, width: "100%" }}
        />
      </View>
      <View style={styles.inputStyle}>
        <FontAwesome6 name="money-bill-wave" size={24} color="black" />
        <TextInput
          onChangeText={(value) => setBalance(value)}
          placeholder="Balance"
          keyboardType="numeric"
          style={{ fontSize: 18, width: "100%" }}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        disabled={!walletName || !balance || loading}
        onPress={() => onCreateWallet()}
      >
        {loading ? (
          <ActivityIndicator color={colours.WHITE} />
        ) : (
          <Text style={{ fontSize: 20, color: colours.WHITE }}>Add Wallet</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  iconInput: {
    textAlign: "center",
    fontSize: 30,
    padding: 20,
    borderRadius: 99,
    paddingHorizontal: 28,
    color: colours.WHITE,
    marginTop: 20,
  },
  inputStyle: {
    borderBottomWidth: 1,
    borderBottomColor: colours.BLACK,
    fontSize: 25,
    padding: 10,
    marginTop: 30,
    display: "flex",
    flexDirection: "row",
    gap: 20,
    backgroundColor: colours.WHITE,
    alignItems: "center",
  },
  button: {
    backgroundColor: colours.LIGHT_BLUE,
    padding: 10,
    borderRadius: 10,
    marginTop: 30,
    alignItems: "center",
  },
});
