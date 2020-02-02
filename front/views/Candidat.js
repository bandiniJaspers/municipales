import React, { Fragment } from 'react';
import {useFetch} from '../components/FetchHook/useFetch'
import Head from 'next/head'
import Filters from '../components/Filters/Filters'
import Link from 'next/link'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowRight} from '@fortawesome/free-solid-svg-icons'
import PoliticListElement from '../components/PoliticsList/PoliticList'
import usePolitic from '../components/Modals/usePolitic'
import ModalPolitic from '../components/Modals/ModalPolitic'
import CreateModal from '../components/CreateModal'

const Candidat = () => {
    const { data, updateFilters, setSearchValue} = useFetch('lrem/search');
    const { isViewModalOpen, onViewProfile, selectedPolitic, setIsViewModalOpen, onSubmit, setIsCreateModalOpen, isCreateModalOpen} = usePolitic();
    return (
        <Fragment>
            <div className={'container'}>
                <div className={'header'}>
                    <h1>Qui se cache derrière vos candidats ?</h1>
                    <Filters onSubmit={updateFilters} filters={[{id:"hiddenLrem", label:"Candidat(e)s LREMS se prétendants sans étiquette"}]} />
                    <div className={'header-content'}>
                        Rentrez son nom, son prénom et voyez le parcours de vos candidats pour les municipales !
                    </div>
                </div>
                <div className={'content'}>
                    <input placeholder={"Nom"} onChange={(e) => setSearchValue(e)}/>
                    <div className={"lrem-list"}>
                        <div className={"size-md mt-md mb-md"}><strong>Résultat de recherche</strong></div>
                        <ul>
                            <li onClick={() => setIsCreateModalOpen(true)} className={"name-create"}>Créer un candidat</li>
                            {data && data.map((p, idx) =>
                                <PoliticListElement key={`politic_${idx}`} onSelect={onViewProfile} politic={p}/>
                            )}
                        </ul>
                    </div>
                </div>
                <ModalPolitic politic={selectedPolitic} isOpen={isViewModalOpen} close={() => setIsViewModalOpen(false)} />
                <CreateModal toggle={() => setIsCreateModalOpen(false)} isOpen={isCreateModalOpen} onSubmit={onSubmit} />
            </div>
        </Fragment>
    )
};

const ListElement = ({lrem}) => (
    <li>
        <div className={`${lrem.hiddenLrem ? 'name name-selected' : 'name' }`}>
            {`${lrem.nom} ${lrem.prenom}`}
        </div>
        <div className={"profil"}>
            <Link href={{pathname:"/fiche", query: {id:lrem._id, previous: "candidat"}}}>
                <a className={'font-black'}>
                    Voir son profil
                    <FontAwesomeIcon icon={faArrowRight} className={"icon"}/>
                </a>
            </Link>
        </div>
    </li>
)

export default Candidat;
