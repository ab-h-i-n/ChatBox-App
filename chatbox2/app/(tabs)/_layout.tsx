import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const TabsLayout = () => {
  return (
    <Stack>
        <Stack.Screen name='global-room' />
    </Stack>
  )
}

export default TabsLayout