import React from 'react'
import {Modal, ModalBody, ModalHeader} from 'reactstrap'
import {ViewPolitic} from '../DisplayPolitics/ViewPolitic'

const ModalPolitic = ({isOpen, close, politic}) => {
    return (
        <Modal className={'modal_politic'} isOpen={isOpen} toggle={close}>
            <ModalHeader toggle={close} />
            <ModalBody>
                <ViewPolitic politic={politic} />
            </ModalBody>
        </Modal>
    )
}

export default ModalPolitic
