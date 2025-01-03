import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import colours from "../../components/colours";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import SubscriptionList from "../../components/SubscriptionList.jsx";
import { useEffect } from "react";
import { client } from "../../components/KindeConfig";
import { supabase } from "../../components/supabaseConfig";
import { ScrollView } from "react-native";
import { RefreshControl } from "react-native";
import { useState } from "react";


export default function Subscriptions() {
  const router = useRouter();
  const [subscriptionList, setSubscriptionList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSubscriptions();
  }, []);

  const getSubscriptions = async () => {
    const user = await client.getUserDetails();
    console.log("User details:", user);

    const { data, error } = await supabase
      .from("Subscriptions")
      .select("*")
      .eq("created_by", user.email);

    if (error) {
      console.error("Error fetching subscriptions:", error);
    } else {
      console.log("subscriptions", data);
      setSubscriptionList(data);
      data && setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={() => getSubscriptions()} refreshing={loading} />
        }
      >
        <View
          style={{
            padding: 20,
            backgroundColor: colours.LIGHT_BLUE,
            height: 150,
          }}
        >
          </View>
          <View style = {{
            padding: 20,
            marginTop: -130
          }}>
          <SubscriptionList subscriptionList={subscriptionList} />

          </View>
        
        </ScrollView>
      <View style={{ flex: 1 }} />
      <Link href="/addNewSubscription" style={styles.addContainer}>
        <Ionicons name="add-circle" size={50} color={colours.LIGHT_BLUE} />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  Text: {
    fontSize: 30,
    color: "red",
  },
  profileStyle: {
    fontSize: 20,
    color: "blue",
    borderRadius: 100,
    padding: 20,
    width: 50,
    height: 50,
    marginLeft: 10,
    marginTop: 10,
  },
  addContainer: {
    position: "absolute",
    bottom: 15,
    right: 15,
  },
});
