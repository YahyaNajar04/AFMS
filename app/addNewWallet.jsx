import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native'
import { useState } from 'react'
import colours from '../components/colours';
import ColorPicker from '../components/ColorPicker';


export default function AddNewWallet() {

  const [selectedIcon, setSelectedIcon] = useState('IC');
  const [selectedColour, setSelectedColour] = useState(colours.LIGHT_BLUE);

  return (
    <View style={{
      marginTop: 20,
      padding: 20,
    }}>
      <View style = {{
        justifyContent: 'center',
        alignItems: 'center',

      }}>
        <TextInput
          style = {[
            styles.iconInput,
            {backgroundColor: selectedColour}        
          ]}
          maxLength={2}
        >
          Value = {selectedIcon}
          onChangeText = {(text) => setSelectedIcon(text)}
        </TextInput>
        <ColorPicker
        selectedColour = {selectedColour}
        setSelectedColour = {(color) => setSelectedColour(color)}
        />
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  iconInput : {
    textAlign: 'center',
    fontSize: 30,
    padding: 20,
    borderRadius: 99,
    paddingHorizontal: 28,
    color: colours.WHITE
  }
})