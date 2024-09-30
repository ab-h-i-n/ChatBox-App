import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'


const GlobalRoom = () => {

  const { handleLogout , user } = useContext(AuthContext);

  return (
    <View>
      <Text>USER : {user ?? "User not found!"}</Text>
      <TouchableOpacity onPress={handleLogout}><Text>Log Out</Text></TouchableOpacity>
    </View>
  )
}

export default GlobalRoom