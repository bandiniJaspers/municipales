import React, {useState, useEffect, Fragment} from 'react'
import Link  from 'next/link';
import fetch from 'isomorphic-unfetch';
import getConfig from 'next/config'
import Head from 'next/head';

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
            <style jsx global>{`
                  body { 
                    margin:0;
                    background-color: white;
                  }
    `}</style>
        <div className={'container'}>
            <div className={'header'}>
                <h1>Qui se cache derrière vos candidats ?</h1>
                <div className={'header-content'}>
                    Rentrez son nom et voyez le parcours de vos candidats pour les municipales
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
        <style jsx>
            {`
                .mt-md {
                    margin-top: 5rem;
                }
                .mb-md {
                    margin-bottom: 5rem;
                }
                .size-md {
                    font-size: 20px;
                }
                .size-small {
                    font-size: 10px;
                }
                .header { 
                            width: 100%;
                            display: flex;
                            flex-direction: column;
                            text-align:center;
                            align-items:center;
                            margin-bottom:3rem;
                            
                        }
                h1 {
                                max-width:300px;
                            }
                .container { 
                    display:flex;
                    justify-content:center;
                    flex-direction:column;
                    align-items:center;
                }
                a {
                    color:black;
                    text-decoration:none;
                }
                input {
                    width:80%;
                    height:50px;
                    border:none;
                    border-bottom:4px solid #CF7830;
                
                    color:#F35A31;
                }
                
                .lrem-list {
                    width:80%;
                    display:flex;
                    flex-direction:column;
                    justify-content:center;
                }
                .content {
                    width:100%;
                    display:flex;
                    flex-direction:column;
                    align-items:center;
                }
                ul {
                    list-style:none; 
                    max-width:600px; 
                    justify-content: space-between;
                }
            `}
        </style>
        </Fragment>
    )
};

const ListElement = ({lrem}) => (
    <li>
        <div className={"content"}>
        <Link href={{pathname:"/fiche", query: {id:lrem._id}}}>
            <a>{`${lrem.nom} ${lrem.prenom}`}</a>
        </Link>
        </div>
        <div>
            <Link href={{pathname:"/fiche", query: {id:lrem._id}}}>
                <a className={'font-black'}>Voir son profil</a>
            </Link>
        </div>
        <style jsx>
            {`
                .font-black {
                    color: #252422;
                }
                a {
                    color:white;
                    text-decoration:none;
                }
                .content {
                    width:50%;
                    margin-right:10px;
                    background-color:#252422;
                    color:white;
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    height:50px; 
                }
                li {
                    cursor: pointer;
                    display:flex; 
                    align-items:center;
                    flex-direction:row;
                    text-align:center; 
                    font-size: 20px; 
                    margin-bottom:20px;
                }
            `}
        </style>
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
