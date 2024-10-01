import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import CreateRoomButton from '@/components/myrooms/CreateRoomButton'

const MyRooms = () => {
    return (
        <View className="bg-primary h-full">

            <CreateRoomButton />

        </View>
    )
}

export default MyRooms