import React, { Fragment } from 'react'
import Link from 'next/link'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'

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

export const Sources = ({affiliation, sources}) => {
    return (
        <div className={'sources'}>
            <div className={'title'}>
                <strong>{`Cette personne refuse d'afficher son appartenance au parti`}<br/><span className="affiliation">{`${affiliation}`}</span></strong>
            </div>
            <div className={"sources-list"}>
                <strong>Source(s)</strong>
            </div>
            <ul>
                {sources && sources.map((s, idx) => (<li><a href={s} target="_blank">{`Source_${idx}`}</a></li>))}
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
                <div className={"file"}>
                    <div className={"information"}>
                        <Name firstname={politic.prenom} lastname={politic.nom}/>
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
