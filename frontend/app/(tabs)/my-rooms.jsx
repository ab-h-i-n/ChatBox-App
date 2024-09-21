import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { safeAreaStyle } from '../../styles/styles'

const MyRooms = () => {
  return (
      <ScrollView className="bg-primary">
        <View>
          <Text>My Rooms</Text>
        </View>
      </ScrollView>
  )
}

export default MyRooms