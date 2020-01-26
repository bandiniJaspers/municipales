import React, {useState, useEffect, Fragment} from 'react';
import fetch from 'isomorphic-unfetch'

import '../front/assets/sass/global.sass'
import CreateModal from '../front/components/CreateModal'
import DisplayPolitics from '../front/components/DisplayPolitics/DisplayPolitics'
import Menu from '../front/components/Menu/Menu';
import Filters from '../front/components/Filters/Filters'
import {useFetch} from '../front/components/FetchHook/useFetch'

const Index = () => {
    const [communes, setCommunes] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [defaultCommunes, setDefaultCommunes] = useState([]);
    const { data, updateFilters, loading, searchFilter, filters, setFilters, setSearchFilter, load, setSearchValue} = useFetch('commune/search');

    //@todo better we to communicate between politics list and submit
    const [reload, setReload] = useState(false);

    const [ selectedCommune, setSelectedCommune] = useState(null);

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
                codeCommune: data.commune.code,
                commune:data.commune.label
            })
        }).then(function (response) {
            if (response.status === 200) {
                setReload(true);
                alert("Ajout réussi");
            }
            else
                alert("Echec de l'ajout")
            setIsOpen(false);
        })

    }

    const closeModal = () => setIsOpen(false);
    const openModal = () => setIsOpen(true);

    const getList = () => {
        console.log("getList:")
        if (!data)
            return
        let updatedData = [...data];
        updatedData = filters.length > 0 ? updatedData : updatedData.slice(0, 30);
        return updatedData.slice(0, 100).map(
            (commune, idx) => (
                <li key={`commune_list_${idx}`} className={"communeElement"} onClick={() => setSelectedCommune(commune)}>{commune.nom}</li>
            )
        )
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
                        <Filters onSubmit={updateFilters} filters={["hiddenLrem", "parti"]} />
                    </div>
                <div className={'content'}>
                    <input placeholder={"Nom"} onChange={(e) => setSearchValue(e)}/>
                    <div className={"commune_list"}>
                        {!loading ?
                            <Fragment>
                        <div className={"size-md mt-md mb-md"}><strong>Résultat de recherche : {data ? data.length : 0}</strong></div>
                        <ul>
                            {data && getList()}
                        </ul>
                            </Fragment>  : <div>Chargement...</div>
                            }
                    </div>
                </div>
                <CreateModal toggle={closeModal} isOpen={isOpen} onSubmit={onSubmit} communes={data ? data.slice(0, 30).map((c) => ({label:c.nom, code:c.codeCommune, value:c._id})) : []}/>
                </div>
                <div className={"content"}>
                    <div>
                        {data && data.length > 0 &&
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

export default Index;
