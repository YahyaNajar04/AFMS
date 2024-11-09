import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { Image } from 'react-native'
import colours from './../components/colours'
import { TextInput } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import { TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker';

const placeholder = "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=" 
export default function addTransactions() {

  const [image, setImage] = useState(placeholder);
  const [previewImage, setPreviewImage] = useState(placeholder);

  const onImagePick = async() => {

    const { status } = await ImagePicker.requestCameraPermissionsAsync();

  if (status !== 'granted') {
    alert('Sorry, we need camera permissions to make this work!');
    return;   

  }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setPreviewImage(result.assets[0].uri);
      setImage(result.assets[0].base64);
    }
  }

  return (
    <View style = {{
      padding: 20,
    }}>
      <TouchableOpacity onPress = {() => onImagePick()}>
      <Image source = {{uri: previewImage}}
      style = {styles.image}/>
      </TouchableOpacity>

      <View style = {styles.inputStyle}>
      <MaterialIcons name="label" size={24} color="black" />
        <TextInput placeholder = 'Transaction Name'/>
      </View>

      <View style = {styles.inputStyle}>
      <FontAwesome6 name="money-bill-wave" size={24} color="black" />
        <TextInput placeholder = 'Amount'
        keyboardType='numeric'/>
      </View>
      <View style = {styles.inputStyle}>
      <MaterialIcons name="date-range" size={24} color="black" />
        <TextInput placeholder = 'Date'/>
      </View>
      <View style = {styles.inputStyle}>
      <MaterialIcons name="description" size={24} color="black" />
        <TextInput placeholder = 'Notes'
        multiline = {true} numberOfLines = {3}
        
        />
      </View>
      <TouchableOpacity style={styles.button}
        //disabled={!walletName || !balance}
        //onPress = {() => onCreateWallet()}
      >
        <Text style={{ fontSize: 20, color: colours.WHITE }}>
          Add Transaction
        </Text>
      </TouchableOpacity>
      
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
    backgroundColor: colours.SLATE_GRAY,
    marginTop: 40,
    borderRadius: 15,
    alignSelf: 'center',
  },
  inputStyle : {
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
  },
  button: {
    backgroundColor: colours.LIGHT_BLUE,
    padding: 10,
    borderRadius: 10,
    marginTop: 30,
    alignItems: 'center'
}
})