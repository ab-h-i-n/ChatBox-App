import React from 'react'
import { Stack } from 'expo-router'
import "../global.css"

{/* <Slot/>  use for just return children */}

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{headerShown : false}} />
    </Stack>
  )
}

export default RootLayout