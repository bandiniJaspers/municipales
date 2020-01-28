import React, {useState, useEffect, Fragment} from 'react';
import Link  from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import fetch from 'isomorphic-unfetch'
import '../front/assets/sass/global.sass'
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

    useEffect(() => {
        (async function() {

            const res = await fetch(`/lrem/${props.id}`);
            const data = await res.json();
           if (data)
               setFiche(data);
        }())
    }, [props.id])

    return (
        <div className={"mainContainer"}>
            {fiche &&
                <div className={'container'}>
                    <div className={"file"}>
                        <div className={"information"}>
                            <Link href={{pathname:`/${props.previous ? props.previous : ''}`}}>
                                <a className={'font-black'}>
                                  <FontAwesomeIcon icon={faArrowLeft} className={"icon"}/>
                                  Retourner à l'accueil
                                </a>
                            </Link>
                            <Name firstname={fiche.prenom} lastname={fiche.nom}/>
                            <Card title={"Nombre de voix aux elections"} info={fiche.vote}/>
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
    const { id, previous } = query;
    console.log("ID::", id);
    try {
        return {
            id:id,
            previous: previous
        };
    } catch (e) {
        return {
            fiche:null,
            previous:null
        }
    }
};

export default Fiche;
