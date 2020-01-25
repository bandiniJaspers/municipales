import React, {useState, useEffect, Fragment} from 'react';
import fetch from 'isomorphic-unfetch'

import '../assets/sass/global.sass'
import CreateModal from '../components/CreateModal'
import DisplayPolitics from '../components/DisplayPolitics/DisplayPolitics'
import Menu from '../components/Menu/Menu';

const Admin = () => {
    const [communes, setCommunes] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [defaultCommunes, setDefaultCommunes] = useState([]);
    const [loading, setLoading] = useState(false);

    //@todo better we to communicate between politics list and submit
    const [reload, setReload] = useState(false);

    const [ selectedCommune, setSelectedCommune] = useState(null);
    const [filters, setFilter] = useState({});

    const onSubmit = (data) => {
        fetch("lrem", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // Validation data coming from a form usually
                ...data,
                commune:data.commune.label
            })
        }).then(function (response) {
            if (response.status === 200) {
                setReload(true);
                alert("POST SUCCESS");
            }
            else
                alert("ECHEC DU POSTE")
            setIsOpen(false);
        })

    }

    useEffect(() => {
        (async function() {
            setLoading(true);
            const res = await fetch(`commune`);
            const result = await res.json();
            if (result.length > 0) {
                setCommunes(result);
                setLoading(false);
                setDefaultCommunes(result);
            }
        }())
    }, [])

    useEffect(() => {
        console.log("SelectedCommune", selectedCommune);
    }, [selectedCommune])

    const closeModal = () => setIsOpen(false);
    const openModal = () => setIsOpen(true);

    // client search
    const search = (e) => {
        const reg = new RegExp(e.target.value, 'i')
        const updatedCommunes =  defaultCommunes.filter((c) => c.nom.match(reg))
        setCommunes(updatedCommunes);
    }

    // server search
    const onChangeInput = async (e) => {
        const res = await fetch(`commune/search?search=${e.target.value}`);
        try {
            const result = await res.json();
            if (result.length > 0) {
                setCommunes(result);
            }
            else {
                setCommunes([])
            }
        }
        catch (e) {
            console.error(e);
        }
    }
    return (
        <div className={'mainContainer'}>
            <Menu />
            <div className={"commune_container"}>
                <div className={'main_commune'}>
                    {/*<div className={'filter_container'}>
                    <div>Toutes les communes</div>
                    <div>- de 9000 habitants</div>
                </div>*/}
                    <div className={'header header_commune'}>
                        <h1>Rechercher par commune ?</h1>
                    </div>
                <div className={'content'}>
                    <input placeholder={"Nom"} onChange={(e) => search(e)}/>
                    <div className={"commune_list"}>
                        {!loading ?
                            <Fragment>
                        <div className={"size-md mt-md mb-md"}><strong>Résultat de recherche : {communes.length}</strong></div>
                        <ul>
                            {communes.slice(0, 30).map((commune, idx) => (
                                <li className={"communeElement"} onClick={() => setSelectedCommune(commune)}>{commune.nom}</li>
                            ))}
                        </ul>
                            </Fragment>  : <div>Chargement...</div>
                            }
                    </div>
                </div>
                <CreateModal toggle={closeModal} isOpen={isOpen} onSubmit={onSubmit} communes={communes.slice(0, 30).map((c) => ({label:c.nom, code:c.codeCommune, value:c._id}))}/>
                </div>
                <div className={"content"}>
                    <div>
                        {defaultCommunes.length > 0 &&
                        <div className={"candidat_create_btn"} onClick={openModal}>
                            + Créer un candidat
                        </div>
                        }
                    </div>
                    {selectedCommune &&
                        <DisplayPolitics codeCommune={selectedCommune.codeCommune} reload={reload} setReload={setReload}/>
                    }
                </div>
            </div>
        </div>
    )
}

export default Admin;
