import React from 'react'
import Link from 'next/link'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowRight} from '@fortawesome/free-solid-svg-icons'



const PoliticListElement = ({politic, onSelect}) => (
    <li>
        <div className={`${politic.hiddenLrem ? 'name name-selected' : 'name' }`}>
            {`${politic.nom} ${politic.prenom}`}
        </div>
        <div className={"profil"}>
            <div onClick={() => onSelect(politic)}>
                <span className={'font-black'}>
                    Voir son profil
                    <FontAwesomeIcon icon={faArrowRight} className={"icon"}/>
                </span>
            </div>
        </div>
    </li>
)

export default PoliticListElement
