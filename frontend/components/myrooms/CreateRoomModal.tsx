import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import InputBox from '../common/InputBox';
import { log } from '@/utils/log';
import uuid from 'react-native-uuid';
import Button from '../common/Button';
import { ModalContext } from '@/context/ModalContext';
import { API_URL } from '@/env';
import { AuthContext } from '@/context/AuthContext';
import { ChatContext } from '@/context/ChatContext';

const CreateRoomModal = () => {
    const { user } = useContext(AuthContext);
    const { isModalOpen, setModalOpen } = useContext(ModalContext);
    const { fetchMyRooms } = useContext(ChatContext);
    const [isLoading , setLoading] = useState({
        create : false,
        join : false
    })
    const [isJoin, setJoin] = useState(false);
    const [room, setRoom] = useState({
        title: '',
        id: ''
    });
    const [joinRoom, setJoinRoom] = useState({
        id: ''
    })

    useEffect(() => {
        if (isModalOpen?.createRoomModal) {

            setRoom((prev) => ({ ...prev, id: `${uuid.v1()}` }));
        }
    }, [isModalOpen?.createRoomModal]);

    const handleInput = (roomName: string) => {
        setRoom((prev) => ({ ...prev, title: roomName }));
    };

    const handleCreateRoom = async() => {
        log(room);
        setLoading((prev)=>({...prev,create : true}));

        try {
            
            const response = await fetch(`${API_URL}/rooms/user/${user}` , {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    roomId : room.id,
                    roomTitle : room.title
                })
            })

            const res = await response.json();

            log( "created room" + JSON.stringify(res));

        } catch (error) {
            console.error(error);
        }
        fetchMyRooms();
        setModalOpen('createRoomModal', false);
        setLoading((prev)=>({...prev,create : false}));
    };

    const handleJoinRoom = () => {
        log(room);
    }

    const handleModalClose = () => {
        setModalOpen('createRoomModal', false);
        setLoading((prev)=>({...prev,create : false}));

    }

    if (!isModalOpen.createRoomModal) return null;

    return (
        <Pressable onPress={handleModalClose} className="bg-black/50 h-full w-full absolute justify-end">
            <Pressable onPress={(e) => e.stopPropagation()} className={`bg-primary h-fit rounded-t-3xl px-5 py-10`}>

                <View className='items-end py-2'>
                    <TouchableOpacity onPress={() => setJoin((prev) => !(prev))} className='bg-secondary p-2 w-[80px] items-center rounded'>
                        <Text className='text-white font-medium'>{isJoin ? 'CREATE' : 'JOIN'}</Text>
                    </TouchableOpacity>
                </View>


                {
                    !isJoin ? (
                        <>
                            <View className="mb-3">
                                <Text className="text-white font-medium">Room ID</Text>
                                <View className="bg-teritiary py-3 px-2 mt-2 rounded-md border-[.5px] border-white/20">
                                    <Text className="text-secondary">{room.id}</Text>
                                </View>
                            </View>

                            <InputBox
                                label="Room Name"
                                placeholder="Enter room name"
                                value={room.title}
                                onChange={handleInput}
                            />

                            <Button disabled={isLoading.create} onClick={handleCreateRoom} containerClass="mt-5">
                                Create
                            </Button>
                        </>
                    ) : (
                        <>
                            <InputBox
                                label="Room ID"
                                placeholder="Enter room id"
                                value={joinRoom.id}
                                onChange={handleInput}
                            />

                            <Button disabled={isLoading.join} onClick={handleJoinRoom} containerClass="mt-5">
                                Join
                            </Button>
                        </>
                    )
                }

            </Pressable>
        </Pressable>
    );
};

export default CreateRoomModal;
