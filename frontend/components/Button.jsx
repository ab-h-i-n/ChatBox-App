import { Text, TouchableOpacity } from 'react-native'
import React from 'react'

const Button = ({children , className , handleClick}) => {
  return (
    <TouchableOpacity onPress={handleClick} activeOpacity={0.8} className={"bg-secondary py-3 px-10 min-w-[80%] rounded-md"}>
      <Text className="text-white font-semibold text-xl text-center">{children}</Text>
    </TouchableOpacity>
  )
}

export default Button