import { View, Text, StyleSheet, ToastAndroid } from "react-native";
import React, { useState } from "react";
import { TextInput, TouchableOpacity } from "react-native";
import colours from "../colours";
import ColorPicker from "../ColorPicker";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AntDesign from "@expo/vector-icons/AntDesign";
import DateTimePicker from "@react-native-community/datetimepicker";
import { supabase } from "../supabaseConfig";
import { useRouter } from "expo-router";

export default function subscriptionInfo({ currentSubscriptionDetails }) {

  const router = useRouter();

  const [selectedIcon, setSelectedIcon] = useState(
    currentSubscriptionDetails.icon || "IC"
  );
  const [selectedColour, setSelectedColour] = useState(
    currentSubscriptionDetails.color || colours.LIGHT_BLUE
  );

  const [subscriptionName, setSubscriptionName] = useState(
    currentSubscriptionDetails.name || ""
  );
  const [price, setPrice] = useState(currentSubscriptionDetails.price || "");
  const [dueDate, setDueDate] = useState(
    currentSubscriptionDetails.due_date
      ? new Date(currentSubscriptionDetails.due_date)
      : new Date()
  );
  const [showDatePicker, setShowDatePicker] = useState(false);

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
      router.replace("/(tabs)")
    }

    if (error) {
      console.error("Error updating subscription:", error);
      ToastAndroid.show("Failed to update subscription", ToastAndroid.SHORT);
    }
  };

  // Date picker change handler
  const onChangeDueDate = (event, selectedDate) => {
    const currentDate = selectedDate || dueDate;
    setShowDatePicker(false);
    setDueDate(currentDate);
  };

  // Show date picker
  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  return (
    <View
      style={{
        marginTop: 20,
        padding: 20,
        backgroundColor: colours.WHITE,
        height: "100%",
      }}
    >
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TextInput
          style={[styles.iconInput, { backgroundColor: selectedColour }]}
          maxLength={2}
          value={selectedIcon}
          placeholder={currentSubscriptionDetails.icon || "IC"}
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
          placeholder={currentSubscriptionDetails.name}
          value={subscriptionName}
          onChangeText={(value) => setSubscriptionName(value)}
          style={{ fontSize: 18, width: "100%" }}
        />
      </View>
      <View style={styles.inputStyle}>
        <FontAwesome6 name="money-bill-wave" size={24} color="black" />
        <TextInput
          placeholder={
            currentSubscriptionDetails.price
              ? currentSubscriptionDetails.price.toFixed(2).toString()
              : "0.00"
          }
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
            {dueDate instanceof Date && !isNaN(dueDate)
              ? dueDate.toLocaleDateString()
              : "Invalid Date"}
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
        style={styles.button}
        disabled={!subscriptionName || !price || !dueDate}
        onPress={onUpdateSubscription}
      >
        <Text style={{ fontSize: 20, color: colours.WHITE }}>
          Update Subscription
        </Text>
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
