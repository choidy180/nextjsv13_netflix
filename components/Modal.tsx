import { modalState } from '@/atoms/modalAtom'
import React from 'react'
import { useRecoilState ,useRecoilValue } from 'recoil'
import MuiModal from '@mui/material/Modal'


function Modal() {
    const [showModal, setShowModal] = useRecoilState(modalState)
    const handleClose = () => {
        setShowModal(false)
    }
    return (
        <MuiModal open={showModal} onClose={handleClose}>
            <>
                Modal
            </>
        </MuiModal>
    )
}

export default Modal