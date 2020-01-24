import React, { useEffect, useState, Fragment} from 'react';
import fetch from 'isomorphic-unfetch'
import PoliticListElement from '../PoliticsList/PoliticList'
import { Modal, ModalBody, ModalHeader} from 'reactstrap';
import '../../assets/sass/global.sass'
import {ViewPolitic} from './Name'

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

const DisplayPolitics = ({codeCommune}) => {
    const [politics, setPolitics] = useState([]);
    const [selectedPolitic, setSelectedPolitic] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async function() {
            setLoading(true);
            const res = await fetch(`lrem/commune?codeCommune=${codeCommune}`);
            const result = await res.json();
            if (result.length > 0) {
                console.log("Result::", result);
                setPolitics(result);
                setLoading(false);
            }
        }())
    }, [codeCommune])

    const onViewProfile = (p) => {
        setSelectedPolitic(p);
        setOpenModal(true);
    }

    return (
        <Fragment>
        <div className={"lrem-list"}>
            {politics.map((p, idx) => <PoliticListElement key={`politic_${idx}`} onSelect={onViewProfile} politic={p}/>)}
        </div>
            <ModalPolitic politic={selectedPolitic} isOpen={openModal} close={() => setOpenModal(false)} />
        </Fragment>
    )
}

export default DisplayPolitics;
