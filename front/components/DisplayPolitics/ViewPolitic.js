import React, { Fragment } from 'react'
import Link from 'next/link'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons'

export const Name = ({firstname, lastname}) => {
    return (
        <Fragment>
            <div className={'name'}>
                {`${firstname} ${lastname}`}
            </div>
        </Fragment>
    )
}

export const Card =({title, info}) => {
    return (
        <div className={"card"}>
            <div className={'title'}>
                <strong>{title}</strong>
            </div>
            <div className={'info'}>
                {info}
            </div>
        </div>
    )
}

export const Sources = ({affiliation, sources, idx}) => {
    const getMainSource = (source) => {
        const reg = new RegExp("((http|https):\\/\\/)?(w{3}.)?\\w*?(\\w*)")
        const regexGroups = { httpslash: 1, https:2, www: 3, title:4 };
        const result = reg.exec(source) || [];
        if (result.length === 0 || !result.hasOwnProperty(regexGroups.title))
            return `Source_${idx}`
        return result[regexGroups.title][0].toUpperCase() + result[regexGroups.title].slice(1)
    }
    return (
        <div className={'sources'}>
            <div className={'title'}>
                <strong>{`Cette personne est bien soutenu ou appartient a En Marche malgré les apparences`}</strong>
            </div>
            <div className={"sources-list"}>
                <strong>Source(s)</strong>
            </div>
            <ul>
                {sources && sources.map((s, idx) => (<li><a href={s} target="_blank">{getMainSource(s)}</a></li>))}
            </ul>
        </div>
    )
}

export const Picture = (props) => {
    return (
        <div className={"picture"}>
            <img src={"/public/playmobil.jpeg"} />
        </div>
    )
}

export const ViewPolitic = ({politic}) => {
    return (
        <div className={"mainContainer"}>
            {politic &&
            <div className={'container'}>
                <div className={"card card-link"}>
                    <div className={'title'}>
                        <strong>Lien pour partager</strong>
                    </div>
                    <div className={'info'}>
                        <Link href={{pathname:`/fiche?id=${politic._id}`}} as={`/fiche/${politic._id}`}>
                            <a target="_blank" className={'font-black'}>
                                Page
                                <FontAwesomeIcon icon={faArrowRight} className={"icon"}/>
                            </a>
                        </Link>
                    </div>
                </div>
                <div className={"file"}>
                    <div className={"information"}>
                        <Name firstname={politic.prenom} lastname={politic.nom}/>
                        {false &&
                        <Card title={"Nombre de voix aux elections"} info={politic.vote}/>
                        }
                        <Card title={"Candidat dans la commune de"} info={politic.commune}/>
                        <Card title={"Affilié au mouvement/parti"} info={politic.affiliation}/>
                    </div>
                    <Picture/>
                </div>
                {politic.hiddenLrem &&
                <Sources affiliation={politic.affiliation} sources={politic.sources} />
                }
            </div>
            }
        </div>
    )
}
