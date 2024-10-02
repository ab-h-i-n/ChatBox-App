import { createContext, Dispatch, SetStateAction, useState } from "react";

type ModalState = {
    createRoomModal: boolean;
}

type ModalContextProps = {
    isModalOpen: ModalState;
    setModalOpen: ( modal : string , value : boolean ) => void;
}

export const ModalContext = createContext<ModalContextProps>({
    isModalOpen : {
        createRoomModal : false
    },
    setModalOpen : () => {}
});

export const ModalContextProvider = ({ children }: { children: any }) => {
    const [isModalOpen, setIsModalOpen] = useState<ModalState>({
        createRoomModal: false,
    });

    const setModalOpen = (modal : string , value : boolean) => {
        setIsModalOpen((prev)=>({...prev, [modal] : value}))
    }

    return (
        <ModalContext.Provider value={{ isModalOpen, setModalOpen }}>
            {children}
        </ModalContext.Provider>
    );
};
