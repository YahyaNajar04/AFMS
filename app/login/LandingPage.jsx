import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import LOGO from "./../../assets/images/LOGO.png";
import colours from "../../components/colours";
import { TouchableOpacity } from "react-native";
import { client } from "../../components/KindeConfig";
import asyncStorageServices from "../../components/asyncStorageServices";
import { useRouter } from "expo-router";

export default function LoginPage() {
  const router = useRouter();

  const handleSignIn = async () => {
    const token = await client.login();
    if (token) {
      // User was authenticated
      await asyncStorageServices.storeData("login", "true");
      router.replace("/");
    }
  };

  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      // TODO: add a label for profile
      <Image source={LOGO} style={styles.bgImage} />
      <View
        style={{
          backgroundColor: colours.EMERALD_GREEN,
          width: "100%",
          height: "100%",
          padding: 20,
          marginTop: 50,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "Roboto",
            fontSize: 25,
            color: colours.BLACK,
            textAlign: "center",
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 20,
          }}
        >
          AFMS
        </Text>
        <Text
          style={{
            fontFamily: "Roboto",
            fontSize: 18,
            color: colours.BLACK,
            textAlign: "center",
            marginTop: 20,
          }}
        >
          ALL in One Financial Management System for finance tracking!
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text>Login/Signup</Text>
        </TouchableOpacity>
        <Text
          style={{
            color: colours.BLACK,
            marginTop: 20,
            fontFamily: "Roboto",
            fontSize: 12,
          }}
        >
          By continuing, you agree to our Terms of Service and Privacy Policy
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bgImage: {
    width: 200,
    height: 200,
    marginTop: 60,
    borderWidth: 3,
    borderRadius: 100,
    borderColor: colours.BLACK,
  },
  button: {
    backgroundColor: colours.GOLDEN_YELLOW,
    padding: 15,
    borderRadius: 10,
    marginTop: 100,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 99,
  },
});
