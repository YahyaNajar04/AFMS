import { View, Text, StyleSheet, ToastAndroid } from "react-native";
import React, { useState, useEffect } from "react";
import { TextInput, TouchableOpacity } from "react-native";
import colours from "../colours";
import ColorPicker from "../ColorPicker";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AntDesign from "@expo/vector-icons/AntDesign";
import DateTimePicker from "@react-native-community/datetimepicker";
import { supabase } from "../supabaseConfig";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function subscriptionInfo({ currentSubscriptionDetails }) {
  const router = useRouter();

  const [selectedIcon, setSelectedIcon] = useState("IC");
  const [selectedColour, setSelectedColour] = useState(colours.LIGHT_BLUE);
  const [subscriptionName, setSubscriptionName] = useState("");
  const [price, setPrice] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Use useEffect to set initial values from currentSubscriptionDetails
  useEffect(() => {
    if (currentSubscriptionDetails) {
      setSelectedIcon(currentSubscriptionDetails.icon || "IC");
      setSelectedColour(currentSubscriptionDetails.color || colours.LIGHT_BLUE);
      setSubscriptionName(currentSubscriptionDetails.name || "");
      setPrice(currentSubscriptionDetails.price?.toString() || "");
      setDueDate(
        currentSubscriptionDetails.due_date
          ? new Date(currentSubscriptionDetails.due_date)
          : new Date()
      );
    }
  }, [currentSubscriptionDetails]);

  // Function to update the subscription
  const onUpdateSubscription = async () => {
    const { id } = currentSubscriptionDetails;
    const { data, error } = await supabase
      .from("Subscriptions")
      .update({
        name: subscriptionName,
        price: price,
        due_date: dueDate,
        icon: selectedIcon,
        color: selectedColour,
      })
      .eq("id", id)
      .select();

    if (data) {
      ToastAndroid.show(
        "Subscription updated successfully",
        ToastAndroid.SHORT
      );
      router.replace("/(tabs)");
    }

    if (error) {
      console.error("Error updating subscription:", error);
      ToastAndroid.show("Failed to update subscription", ToastAndroid.SHORT);
    }
  };

  const onChangeDueDate = (event, selectedDate) => {
    const currentDate = selectedDate || dueDate;
    setShowDatePicker(false);
    setDueDate(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const onDeleteSubscription = () => {
    Alert.alert(
      "Are you sure you want to delete this wallet?",
      "This action cannot be undone",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          style: "destructive",
          onPress: async () => {
            const { error } = await supabase
              .from("Subscriptions")
              .delete()
              .eq("id", currentSubscriptionDetails.id);

            ToastAndroid.show(
              "Subscription Deleted Successfully",
              ToastAndroid.SHORT
            );
            router.replace("/(tabs)");

            if (error) {
              ToastAndroid.show(
                "Error Deleting Subscription",
                ToastAndroid.SHORT
              );
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TextInput
          style={[styles.iconInput, { backgroundColor: selectedColour }]}
          maxLength={2}
          value={selectedIcon}
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
          value={subscriptionName}
          onChangeText={(value) => setSubscriptionName(value)}
          style={{ fontSize: 18, width: "100%" }}
        />
      </View>
      <View style={styles.inputStyle}>
        <FontAwesome6 name="money-bill-wave" size={24} color="black" />
        <TextInput
          value={price}
          keyboardType="numeric"
          onChangeText={(value) => setPrice(value)}
          style={{ fontSize: 18, width: "100%" }}
        />
      </View>
      <View style={styles.inputStyle}>
        <AntDesign name="calendar" size={24} color="black" />
        <TouchableOpacity onPress={showDatepicker} style={{ width: "100%" }}>
          <Text style={{ fontSize: 18 }}>
            {dueDate.toLocaleDateString()}
          </Text>
        </TouchableOpacity>
      </View>
      {showDatePicker && (
        <DateTimePicker
          value={dueDate}
          mode="date"
          display="default"
          onChange={onChangeDueDate}
        />
      )}
      <TouchableOpacity
        style={styles.Addbutton}
        onPress={onUpdateSubscription}
      >
        <Text style={{ fontSize: 20, color: colours.WHITE }}>
          Update Subscription
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onDeleteSubscription}
        style={styles.deleteButton}
      >
        <Ionicons name="trash" size={24} color="white" />
        <Text style={styles.deleteButtonText}>Delete Subscription</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 20,
    backgroundColor: colours.WHITE,
    height: "100%",
  },
  iconInput: {
    textAlign: "center",
    fontSize: 30,
    padding: 20,
    borderRadius: 99,
    color: colours.WHITE,
    marginTop: 20,
  },
  inputStyle: {
    borderBottomWidth: 1,
    padding: 10,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    gap : 10,
  },
  Addbutton: {
    backgroundColor: colours.LIGHT_BLUE,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 30,
  },
  deleteButton: {
    backgroundColor: "#B22222",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  deleteButtonText: {
    fontSize: 20,
    color: "white",
    marginLeft: 10,
  },
});
