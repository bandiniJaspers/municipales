import React, {useState, useEffect, Fragment} from 'react';
import fetch from 'isomorphic-unfetch'
import getConfig from 'next/config'
import '../assets/sass/global.sass'
import CreateModal from '../components/CreateModal'


const Admin = () => {
    const [communes, setCommunes] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [defaultCommunes, setDefaultCommunes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [ selectedCommune, setSelectedCommune] = useState(null);
    const [filters, setFilter] = useState({});

    const onSubmit = (data) => {
        console.log("Submit::", data);
    }
    useEffect(() => {
        (async function() {
            setLoading(true);
            const res = await fetch(`commune`);
            const result = await res.json();
            if (result.length > 0) {
                setCommunes(result);
                setLoading(false);
                setDefaultCommunes(result);
            }
        }())
    }, [])

    const closeModal = () => setIsOpen(false);
    const openModal = () => setIsOpen(true);
    const search = (e) => {
        const reg = new RegExp(e.target.value, 'i')
        const updatedCommunes =  defaultCommunes.filter((c) => c.nom.match(reg))
        setCommunes(updatedCommunes);
    }
    const onChangeInput = async (e) => {
        const res = await fetch(`commune/search?search=${e.target.value}`);
        try {
            const result = await res.json();
            if (result.length > 0) {
                setCommunes(result);
            }
        }
        catch (e) {
            console.error(e);
        }
    }
    return (
        <div className={'commune_container'}>
            <div className={'main_commune'}>
            <div className={'filter_container'}>
                <div>Toutes les communes</div>
                <div>- de 9000 habitants</div>
            </div>
            <div className={'header'}>
                <h1>Rechercher par commune ?</h1>
                {defaultCommunes.length > 0 &&
                    <div onClick={openModal}>
                        + Créer un candidat
                    </div>
                }
            </div>
            <div className={'content'}>
                <input placeholder={"Nom"} onChange={(e) => search(e)}/>
                <div className={"lrem-list"}>
                    {!loading ?
                        <Fragment>
                    <div className={"size-md mt-md mb-md"}><strong>Résultat de recherche : {communes.length}</strong></div>
                    <ul>
                        {communes.slice(0, 30).map((commune, idx) => (
                            <div className={"communeElement"} onClick={() => setSelectedCommune(commune)}>{commune.nom}</div>
                        ))}
                    </ul>
                        </Fragment>  : <div>Chargement...</div>
                        }
                </div>
            </div>
            <CreateModal toggle={closeModal} isOpen={isOpen} onSubmit={onSubmit} communes={communes.slice(0, 30).map((c) => ({label:c.nom, code:c.codeCommune, value:c._id}))}/>
            </div>
            <div className={"selected_commune"}>

            </div>
        </div>
    )
}

/*Admin.getInitialProps = async () => {
    const {publicRuntimeConfig} = getConfig()
    console.log("publicRunTimeConfig::", publicRuntimeConfig);
    try {
        const res = await fetch(`${publicRuntimeConfig.API_URL}/commune`);
        const data = await res.json();
        console.log("Admixn::", data);
        return {
            communes: data
        };
    } catch (e) {
        return {
            communes:[]
        }
    }

};*/

export default Admin;
