import { View, Text, StyleSheet, ToastAndroid } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native'
import { useState } from 'react'
import colours from '../components/colours';
import ColorPicker from '../components/ColorPicker';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { TouchableOpacity } from 'react-native';
import { supabase } from '../components/supabaseConfig';
import { client } from '../components/KindeConfig';
import AntDesign from '@expo/vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';

export default function addNewSubscription() {

  const [selectedIcon, setSelectedIcon] = useState('IC');
  const [selectedColour, setSelectedColour] = useState(colours.LIGHT_BLUE);
  const [subscriptionName, setSubscriptionName] = useState();
  const [price, setPrice] = useState();
  const [dueDate, setDueDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const router = useRouter

  const onCreateSubscription = async() => {
    const user = await client.getUserDetails();
    const {data, error} = await supabase.from('Subscriptions').insert([
      {name : subscriptionName,
      price : price,
      due_date : dueDate,
      icon : selectedIcon,
      color : selectedColour,
      created_by : user.email}
    ]).select();

    console.log("Subcription Created", data);

    if (data)
    {
      ToastAndroid.show("Subscription created successfully", ToastAndroid.SHORT);
      router.replace("/(tabs)")
    }
  };

  const onChangeDueDate = (event, selectedDate) => {
      const currentDate = selectedDate;
      setShowDatePicker(false);
      setDueDate(currentDate);
  };

  const showDatepicker = () => {
      setShowDatePicker(true);
  };

  return (
    <View style={{
      marginTop: 20,
      padding: 20,
      backgroundColor: colours.LIGHT_GRAY,
      height: '100%'
    }}>
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',

      }}>
        <TextInput
          style={[
            styles.iconInput,
            { backgroundColor: selectedColour }
          ]}
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
          placeholder="Subscription Name"
          onChangeText={(value) => setSubscriptionName(value)}
          style={{ fontSize: 18, width: '100%' }}
          />
      </View>
      <View style={styles.inputStyle}>
      <FontAwesome6 name="money-bill-wave" size={24} color="black" />
        <TextInput
          onChangeText={(value) => setPrice(value)}
          placeholder="Price"
          keyboardType='numeric'
          style={{ fontSize: 18, width: '100%' }}
          />
      
      </View>

      <View style={styles.inputStyle}>
        <AntDesign name="calendar" size={24} color="black" />
        <TouchableOpacity onPress={showDatepicker} style={{ width: '100%' }}>
          <Text style={{ fontSize: 18 }}>
            {dueDate.toLocaleDateString()} {/* Display dueDate in local format */}
          </Text>
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dueDate}
          mode="date" // You can change this to 'time' or 'datetime' if needed
          is24Hour={true}
          display="default"
          onChange={onChangeDueDate}
        />
      )}
      
      <TouchableOpacity style={styles.button}
        disabled={!subscriptionName || !price || !dueDate}
        onPress = {() => onCreateSubscription()}
      >
        <Text style={{ fontSize: 20, color: colours.WHITE }}>
          Add Subscription
        </Text>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  iconInput: {
    textAlign: 'center',
    fontSize: 30,
    padding: 20,
    borderRadius: 99,
    paddingHorizontal: 28,
    color: colours.WHITE,
    marginTop: 20,
  },
  inputStyle : {
    borderBottomWidth: 1,
    borderBottomColor: colours.BLACK,
    fontSize: 25,
    padding: 10,
    marginTop: 30,
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    backgroundColor: colours.WHITE,
    alignItems: 'center',
  },
  button: {
      backgroundColor: colours.LIGHT_BLUE,
      padding: 10,
      borderRadius: 10,
      marginTop: 30,
      alignItems: 'center'
  }
})