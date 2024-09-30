import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'
import { SocketContext } from '@/context/SocketContext';


const GlobalRoom = () => {

  const { handleLogout , user } = useContext(AuthContext);
  const { isSocketOn } = useContext(SocketContext);

  return (
    <View>
      <Text>USER : {user ?? "User not found!"}</Text>
      <Text>Is Socket On : {isSocketOn ? "Socket is on!" : 'Socket is off!'}</Text>
      <TouchableOpacity onPress={handleLogout}><Text>Log Out</Text></TouchableOpacity>
    </View>
  )
}

export default GlobalRoom