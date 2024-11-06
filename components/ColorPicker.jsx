import { View, Text, Touchable } from 'react-native'
import React from 'react'
import colours from './colours'
import { TouchableOpacity } from 'react-native'

export default function ColorPicker(selectedColour, setSelectedColour) {
  return (
    <View style = {{
      display: 'flex',
      flexDirection: 'row',
      gap: 20,
      marginTop: 20,
    }}>
      {colours.COLOUR_LIST.map((color, index) =>(
            <TouchableOpacity 
            
            key = {index}

            style = {[
            {
                  height: 30,
                  width: 30,
                  backgroundColor: color,
                  borderRadius: 99,
            }, selectedColour == color&&{borderWidth : 4}
      ]}
            onPress={() => setSelectedColour(color)}
            >
            </TouchableOpacity>
            
      ))}
    </View>
  )
}