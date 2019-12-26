import React, {useState, useEffect, Fragment} from 'react'
import Link  from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import fetch from 'isomorphic-unfetch';
import getConfig from 'next/config'
import Head from 'next/head';
import '../assets/sass/global.sass'

const Index = (props) => {
    const [ lrems, setLrems] = useState([]);

    useEffect(() => {
        if (props.hasOwnProperty('lrems'))
            setLrems(props.lrems)

    }, [props])

    const onChangeInput = async (e) => {
        const res = await fetch(`lrem/search?search=${e.target.value}`);
        try {
            const result = await res.json();
            if (result.length > 0) {
                setLrems(result);
            }
        }
        catch (e) {
            console.error(e);
        }
    }

    return (
        <Fragment>
            <Head>
                <title>Lrem</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta charSet="utf-8" />
            </Head>

        <div className={'container'}>
            <div className={'header'}>
                <h1>Qui se cache derrière vos candidats ?</h1>
                <div className={'header-content'}>
                    Rentrez son nom, son prénom et voyez le parcours de vos candidats pour les municipales !
                </div>
            </div>
            <div className={'content'}>
                <input placeholder={"Nom"} onChange={(e) => onChangeInput(e)}/>
                <div className={"lrem-list"}>
                    <div className={"size-md mt-md mb-md"}><strong>Résultat de recherche</strong></div>
                    <ul>
                        {lrems.map((lrem, idx) => (
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
        <div className={"name"}>
            {`${lrem.nom} ${lrem.prenom}`}
        </div>
        <div className={"profil"}>
            <Link href={{pathname:"/fiche", query: {id:lrem._id}}}>
                <a className={'font-black'}>
                  Voir son profil
                  <FontAwesomeIcon icon={faArrowRight} className={"icon"}/>
                </a>
            </Link>
        </div>
    </li>
)

Index.getInitialProps = async () => {
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

export default Index;
