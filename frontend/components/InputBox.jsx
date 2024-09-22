import { View, Text, TextInput } from 'react-native'
import React from 'react'

const InputBox = ({ value , placeholder , label , handleInputChange }) => {
  return (
    <View className="min-w-[80%]">
      <Text className="text-white font-medium mb-2 text-white/90">{label}</Text>
      <TextInput
        className="bg-teritiary min-w-[80%] py-3 px-5 rounded-md border-[1px] border-white/20 text-white"
        value={value}
        placeholder={placeholder}
        onChangeText={handleInputChange}
        placeholderTextColor={'#b7b8ba'}
      />
    </View>
  )
}

export default InputBox