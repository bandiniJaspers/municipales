import {useState, useEffect} from 'react';
import getConfig from 'next/config'
import fetch from 'isomorphic-unfetch'

/*async function fetchFiche({query}) {
    const {publicRuntimeConfig} = getConfig()
    const { id } = query;
    try {
        const res = await fetch(`${publicRuntimeConfig.API_URL}/lrem/${id}`);
        const data = await res.json();
        return {
            fiche: data
        };
    } catch (e) {
        return {
            fiche:null
        }
    }
}*/

const Fiche = (props) => {
    const [fiche, setFiche] = useState(null);

    useEffect(() => {
        setFiche(props.fiche)
    }, [props.fiche]);

    return (
        <div>
            {fiche &&
                <div className={'container'}>
                    <div>Prenom: {fiche.prenom}</div>
                    <div>Nom: {fiche.nom}</div>
                    <div>Cette personne est il affilié au mouvement en Marche {fiche.sedissimule ? "Oui" : "Non"}</div>
                    {fiche.sedissimule &&
                    <div>Preuve: {fiche.preuve}</div>
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
