import React, {useState, useEffect, Fragment} from 'react';
import getConfig from 'next/config'
import fetch from 'isomorphic-unfetch'

const Name = ({firstname, lastname}) => {
    return (
        <Fragment>
            <div className={'name'}>
                {`${firstname} ${lastname}`}
            </div>
            <style jsx>
                {`
                    .name {
                        margin-right:10px;
                        background-color:#252422;
                        margin-bottom:30px;
                        color:white;
                        font-size:25px;
                        display:flex;
                        justify-content:center;
                        align-items:center;
                        height:50px;
                    }
                `}
            </style>
        </Fragment>
    )
}

const Card =({title, info}) => {
    return (
        <div className={"mb-medium"}>
            <div className={'title'}>
                <strong>{title}</strong>
            </div>
            <div className={'info'}>
                {info}
            </div>
            <style jsx>
                {`
                    .mb-medium {
                        margin-bottom:30px;
                    }
                    .title {
                        font-size:25px;
                    }
                    .info {
                        color:#F35A31;
                        font-size:20px;
                    }
                `}
            </style>
        </div>
    )
}

const Sources = ({affiliation, sources}) => {
    return (
        <div className={'mb-medium'}>
            <div className={'title'}>
                <strong>{`Cette personne refuse d'afficher son appartenance au parti ${affiliation}`}</strong>
            </div>
            <div className={"title mb-medium"}>
                <strong>Source(s)</strong>
            </div>
            <ul>
                {sources && sources.map((s, idx) => (<li><a href={s} target="_blank">{`Source_${idx}`}</a></li>))}
            </ul>
            <style jsx>
                {`
                    .mb-medium {
                        margin-bottom:30px;
                    }

                    .title {
                        font-size:25px;
                    }
                    ul {
                    list-style:none;
                    justify-content: space-between;
                    }
                    li {
                      cursor: pointer;
                    }
                     a {
                        color:#F35A31;
                        text-decoration:none;
                    }
                `}
            </style>
        </div>
    )
}

const Picture = (props) => {
    return (
        <div>
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
                    <div className={"main"}>
                        <div className={"information"}>
                            <Name firstname={fiche.prenom} lastname={fiche.nom}/>
                            <Card title={"Candidat dans la commune de"} info={fiche.commune}/>
                            <Card title={"Affilié au mouvement/partie"} info={fiche.affiliation}/>
                        </div>
                        <Picture/>
                    </div>
                    {fiche.sedissimule &&
                        <Sources affiliation={fiche.affiliation} sources={fiche.sources} />
                    }
                </div>
            }
            <style jsx>
                {`
                    .mainContainer {
                        width:60%;
                        margin-right:25%;
                        margin-left:25%;
                        margin-top:15%;
                    }
                    .main {
                        display:flex;
                        flex-direction:row;
                        justify-content:space-between;
                        margin-bottom:30px;
                    }
                `}
            </style>
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
