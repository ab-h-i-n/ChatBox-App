import { Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Icons } from '@/constants/Icons'

const CreateRoomButton = () => {
    return (
        <TouchableOpacity className='bg-teritiary absolute bottom-5 right-5 w-[60px] aspect-square rounded-md items-center justify-center'>
            <Image
                source={Icons.PlusIcon}
                style={{
                    width: 35,
                    height: 35
                }}
                tintColor={'#ff4c29'}
            />
        </TouchableOpacity>
    )
}

export default CreateRoomButton