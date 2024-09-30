import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { GlobalContext, GlobalContextType } from '@/context/GlobalContext'

const GlobalRoom = () => {

  const context = useContext(GlobalContext) as GlobalContextType;
  const { handleLogOut } = context;

  return (
    <View>
      <Text>GlobalRoom</Text>
      <TouchableOpacity onPress={handleLogOut}><Text>Log Out</Text></TouchableOpacity>
    </View>
  )
}

export default GlobalRoom