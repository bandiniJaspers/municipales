import React, {useState, useEffect, Fragment} from 'react';
import Link  from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import getConfig from 'next/config'
import fetch from 'isomorphic-unfetch'

const Name = ({firstname, lastname}) => {
    return (
        <Fragment>
            <div className={'name'}>
                {`${firstname} ${lastname}`}
            </div>
        </Fragment>
    )
}

const Card =({title, info}) => {
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

const Sources = ({affiliation, sources}) => {
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

const Picture = (props) => {
    return (
        <div className={"picture"}>
            <img src={"/public/playmobil.jpeg"} />
        </div>
    )
}
const Fiche = (props) => {
    const [fiche, setFiche] = useState(null);

    useEffect(() => {
        setFiche(props.fiche)
    }, [props.fiche]);

    return (
        <div className={"mainContainer"}>
            {fiche &&
                <div className={'container'}>
                    <div className={"file"}>
                        <div className={"information"}>
                            <Link href={{pathname:"/"}}>
                                <a className={'font-black'}>
                                  <FontAwesomeIcon icon={faArrowLeft} className={"icon"}/>
                                  Retourner à l'accueil
                                </a>
                            </Link>
                            <Name firstname={fiche.prenom} lastname={fiche.nom}/>
                            <Card title={"Candidat dans la commune de"} info={fiche.commune}/>
                            <Card title={"Affilié au mouvement/parti"} info={fiche.affiliation}/>
                        </div>
                        <Picture/>
                    </div>
                    {fiche.sedissimule &&
                        <Sources affiliation={fiche.affiliation} sources={fiche.sources} />
                    }
                </div>
            }
        </div>
    )
}

Fiche.getInitialProps = async ({query}) => {
    const {publicRuntimeConfig} = getConfig()
    const { id } = query;
    try {
        const res = await fetch(`/lrem/${id}`);
        const data = await res.json();
        return {
            fiche: data
        };
    } catch (e) {
        return {
            fiche:null
        }
    }
};

export default Fiche;
