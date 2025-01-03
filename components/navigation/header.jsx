import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import { client } from "../../components/KindeConfig";
import colours from "../colours";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import HelloWave from "./../HelloWave";

export default function Header() {
  const router = useRouter();

  const [user, setUser] = useState();
  const defaultPicture =
    "https://thoahqxlaarsnvpxgzkk.supabase.co/storage/v1/object/public/Transactions/user.png";

  const [profile, setProfile] = useState(defaultPicture);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const userData = await client.getUserDetails();
      setUser(userData);
      setProfile(userData?.picture || defaultPicture);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
      }}
    >
      <TouchableOpacity onPress={() => router.push("/profile")}>
        <Image
          source={{ uri: profile}}
          style={{
            width: 50,
            height: 50,
            borderRadius: 99,
          }}
        />
      </TouchableOpacity>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "85%",
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: colours.BLACK,
              fontFamily: "sans-serif",
            }}
          >
            Welcome,
          </Text>
          <Text
            style={{
              fontSize: 20,
              color: colours.BLACK,
              fontWeight: "bold",
              fontFamily: "sans-serif",
            }}
          >
            {user?.given_name} {user?.family_name}
            <HelloWave />
          </Text>
        </View>
        <Ionicons name="notifications" size={24} color="black" />
      </View>
    </View>
  );
}
