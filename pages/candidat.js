import React, {useState, useEffect, Fragment} from 'react'
import Link  from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import fetch from 'isomorphic-unfetch';
import getConfig from 'next/config'
import Head from 'next/head';
import '../front/assets/sass/global.sass'
import Filters from '../front/components/Filters/Filters'
import {fetchData} from '../front/utils/fetch'
import {useFetch} from '../front/components/FetchHook/useFetch'

const Candidat = (props) => {
    const { data, updateFilters, setSearchValue} = useFetch('lrem/search');

    return (
        <Fragment>


        <div className={'container'}>
            <div className={'header'}>
                <h1>Qui se cache derrière vos candidats ?</h1>
                <Filters onSubmit={updateFilters} filters={["hiddenLrem", "parti"]} />
                <div className={'header-content'}>
                    Rentrez son nom, son prénom et voyez le parcours de vos candidats pour les municipales !
                </div>
            </div>
            <div className={'content'}>
                <input placeholder={"Nom"} onChange={(e) => setSearchValue(e)}/>
                <div className={"lrem-list"}>
                    <div className={"size-md mt-md mb-md"}><strong>Résultat de recherche</strong></div>
                    <ul>
                        {data && data.map((lrem, idx) => (
                            <ListElement key={idx} lrem={lrem}/>
                        ))}
                    </ul>
                </div>
            </div>
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

Candidat.getInitialProps = async () => {
    const {publicRuntimeConfig} = getConfig()
    try {
        const res = await fetch(`${publicRuntimeConfig.API_URL}/lrem`);
        const data = await res.json();
        return {
            lrems: data
        };
    } catch (e) {
        return {
            lrems:[]
        }
    }

};

export default Candidat;
