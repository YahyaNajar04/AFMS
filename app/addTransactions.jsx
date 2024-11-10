import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import React from "react";
import { useState } from "react";
import { Image } from "react-native";
import colours from "./../components/colours";
import { TextInput } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ScrollView } from "react-native";
import { supabase } from "../components/supabaseConfig";
import { decode } from "base64-arraybuffer";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ToastAndroid } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ActivityIndicator } from "react-native";

const placeholder =
  "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=";
  
export default function addTransactions() {
  const [image, setImage] = useState(placeholder);
  const [previewImage, setPreviewImage] = useState(placeholder);
  const [transactionName, setTransactionName] = useState();
  const [amount, setAmount] = useState();
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState();
  const { walletId } = useLocalSearchParams();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const router = useRouter();
  const [loader, setLoading] = useState(false);

  
  const {balance} = useLocalSearchParams();

  const transactionAmount = parseFloat(amount);
  const currentBalance = parseFloat(balance);

  const onImagePick = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setPreviewImage(result.assets[0].uri);
      setImage(result.assets[0].base64);
    }
  };

  const onClickAdd = async () => {
    setLoading(true);

    if (transactionAmount > currentBalance) {
      ToastAndroid.show("Your balance is too low for this transaction", ToastAndroid.SHORT);
      setLoading(false);
      return;
    }

    if (!image || image === placeholder) {
      console.warn("No image selected or using placeholder.");
    }
  
    const fileName = Date.now();
    try {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("Transactions")
        .upload(fileName + ".png", decode(image), {
          contentType: "image/png",
        });
  
      if (uploadError) {
        console.error("Image upload error:", uploadError.message);
        ToastAndroid.show("Image upload failed", ToastAndroid.SHORT);
        return; 
      }

      const fileUrl = 
        `https://thoahqxlaarsnvpxgzkk.supabase.co/storage/v1/object/public/Transactions/${fileName}.png`;
      console.log("File uploaded successfully:", fileUrl);

      const { data: insertData, error: insertError } = await supabase
        .from("Transactions")
        .insert([
          {
            name: transactionName,
            amount: amount,
            date: date,
            note: notes,
            image: fileUrl,
            wallet_id: walletId,
          },
        ])
        .select();
  
      if (insertError) {
        console.error("Transaction insert error:", insertError.message);
        ToastAndroid.show("Transaction insertion failed", ToastAndroid.SHORT);
      } else {
        ToastAndroid.show("Transaction added successfully", ToastAndroid.SHORT);
        console.log("Transaction added:", insertData);
        setLoading(false);
        router.replace({
          pathname: '/walletDetails',
          params : {
            walletId: walletId
          }
        })

      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };


  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  return (
    <KeyboardAvoidingView>
      <ScrollView
        style={{
          padding: 20,
        }}
      >
        <TouchableOpacity onPress={() => onImagePick()}>
          <Image source={{ uri: previewImage }} style={styles.image} />
        </TouchableOpacity>

        <View style={styles.inputStyle}>
          <MaterialIcons name="label" size={24} color="black" />
          <TextInput
            placeholder="Transaction Name"
            onChangeText={(value) => setTransactionName(value)}
            style={{ width: "100%" }}
          />
        </View>

        <View style={styles.inputStyle}>
          <FontAwesome6 name="money-bill-wave" size={24} color="black" />
          <TextInput
            placeholder="Amount"
            keyboardType="numeric"
            onChangeText={(value) => setAmount(value)}
            style={{ width: "100%" }}
          />
        </View>
        <View style={styles.inputStyle}>
          <AntDesign name="calendar" size={24} color="black" />
          <TouchableOpacity onPress={showDatepicker} style={{ width: "100%" }}>
            <Text style={{ fontSize: 18 }}>
              {date.toLocaleDateString()}
            </Text>
          </TouchableOpacity>
        </View>

        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date" 
            is24Hour={true}
            display="default"
            onChange={onChangeDate}
          />
        )}
        <View style={styles.inputStyle}>
          <MaterialIcons name="description" size={24} color="black" />
          <TextInput
            placeholder="Notes"
            multiline={true}
            numberOfLines={3}
            onChangeText={(value) => setNotes(value)}
            style={{ width: "100%" }}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          disabled={!transactionName || !amount || loader}
          onPress={() => onClickAdd()}
        >
          {loader?
          <ActivityIndicator/> :
          <Text style={{ fontSize: 20, color: colours.WHITE }}>
            Add Transaction
          </Text>
          }
          
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
    backgroundColor: colours.SLATE_GRAY,
    marginTop: 40,
    borderRadius: 15,
    alignSelf: "center",
  },
  inputStyle: {
    borderBottomWidth: 1,
    borderBottomColor: colours.BLACK,
    fontSize: 18,
    padding: 10,
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    gap: 15,
    backgroundColor: colours.WHITE,
    alignItems: "center",
    height: 50,
    borderRadius: 10,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    width: "100%",
  },
  button: {
    backgroundColor: colours.LIGHT_BLUE,
    padding: 10,
    borderRadius: 10,
    marginTop: 30,
    alignItems: "center",
  },
});
