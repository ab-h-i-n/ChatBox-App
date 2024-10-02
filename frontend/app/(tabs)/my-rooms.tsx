import { View, Text, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import CreateRoomButton from '@/components/myrooms/CreateRoomButton'
import RoomCard from '@/components/common/RoomCard'
import { ChatContext } from '@/context/ChatContext'

const MyRooms = () => {
    const { myRooms } = useContext(ChatContext);

    return (
        <View className="bg-primary h-full">

            <ScrollView className="bg-primary">
                {myRooms.length > 0 ? (
                    <>
                        {myRooms?.map((room) => (
                            <RoomCard key={room.id} id={room.id} title={room.title} />
                        ))}
                    </>
                ) : (
                    <>
                        <Text className="text-white font-semibold text-center mt-5">No Rooms Found</Text>
                    </>
                )}
            </ScrollView>

            <CreateRoomButton />

        </View>
    )
}

export default MyRooms