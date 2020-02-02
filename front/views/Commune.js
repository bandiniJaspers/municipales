import React, { useState, useEffect, Fragment } from 'react'
import {useFetch} from '../components/FetchHook/useFetch'
import usePolitic from '../components/Modals/usePolitic'
import Filters from '../components/Filters/Filters'
import PoliticListElement from '../components/PoliticsList/PoliticList'
import DisplayPolitics from '../components/DisplayPolitics/DisplayPolitics'
import CreateModal from '../components/CreateModal'


const Commune = () => {
    const { data, updateFilters, loading, searchFilter, filters, setFilters, setSearchFilter, load, setSearchValue} = useFetch('commune/search');
    const { isViewModalOpen, onViewProfile, selectedPolitic, setIsViewModalOpen, onSubmit, setIsCreateModalOpen, isCreateModalOpen, reload, setReload} = usePolitic();
    const [ selectedCommune, setSelectedCommune] = useState(null);

    useEffect(() => {
        setSelectedCommune(null)
    }, [searchFilter])
    const getList = () => {
        if (!data)
            return
        let updatedData = [...data];
        updatedData = filters.length > 0 ? updatedData : updatedData.slice(0, 30);
        return updatedData.slice(0, 100).map(
            (commune, idx) => (
                <li key={`commune_list_${idx}`} className={"commune-name"} onClick={() => setSelectedCommune(commune)}>{commune.nom}</li>
            )
        )
    }

    return (
        <div className={'container'}>
            <div className={'header'}>
                <h1>Rechercher par commune </h1>
                <Filters onSubmit={updateFilters} filters={[{id:"hiddenLrem", label:"Communes contenant LREMs se prétendants sans étiquette"}]} />

            </div>
            <div className={'content'}>
                <input placeholder={"Nom"} onChange={(e) => setSearchValue(e)}/>
                <div className={"lrem-list"}>
                    {!selectedCommune &&
                    <div className={"commune_list"}>
                        {!loading ?
                            <Fragment>
                                <div className={"size-md mt-md mb-md"}><strong>Résultat de recherche
                                    : {data ? data.length : 0}</strong>
                                    {data && data.length > 30 &&
                                    <span><br/>Seul les 30 premières communes sont affichées</span>
                                    }
                                </div>
                                <ul>
                                    <li onClick={() => setIsCreateModalOpen(true)} className={"name-create"}>Créer un candidat</li>
                                    {data && getList()}
                                </ul>
                            </Fragment> : <div>Chargement...</div>
                        }
                    </div>
                    }
                </div>
            </div>
            <div className={"content"}>
                {selectedCommune &&
                <DisplayPolitics setIsCreateModalOpen={setIsCreateModalOpen} codeCommune={selectedCommune.codeCommune} reload={reload} setReload={setReload}/>
                }
            </div>
            <CreateModal toggle={() => setIsCreateModalOpen(false)} isOpen={isCreateModalOpen} onSubmit={onSubmit} />
        </div>
    )
}

export default Commune
