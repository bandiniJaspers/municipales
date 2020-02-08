import React, { useState, Fragment } from 'react';
import Head from 'next/head'

import '../front/assets/sass/global.sass'
import Candidat from '../front/views/Candidat'
import Commune from '../front/views/Commune'
import ViewMap from '../front/views/Map'

const MenuElement = ({title, currentLayout, layoutType, onClick}) => {
    return (
        <div className={`${currentLayout === layoutType ? 'menu_black' : 'menu_grey'}`} onClick={() => onClick(layoutType)}><span><strong>{title}</strong></span></div>
    )
}
const Index = () => {
    const layoutEnum = {
        COMMUNE: "commune",
        CANDIDAT: "candidat",
        CARTE: "carte"
    }
    const [layout, setLayout] = useState(layoutEnum.CANDIDAT);

    return (
        <Fragment>
            <Head>
                    <title>Qui se cache ?</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta charSet="utf-8" />
                <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
                      integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
                      crossOrigin=""/>
            </Head>
            <div className={''}>
                {layout === layoutEnum.COMMUNE &&
                   <Commune />
                }
                {layout === layoutEnum.CANDIDAT &&
                    <Candidat/>
                }
                {layout === layoutEnum.CARTE &&
                    <ViewMap />
                }
            </div>
            <div className={"menu"}>
                <MenuElement title={"Rechercher par nom"} currentLayout={layout} layoutType={layoutEnum.CANDIDAT} onClick={setLayout} />
                <MenuElement title={"Rechercher par commune"} currentLayout={layout} layoutType={layoutEnum.COMMUNE} onClick={setLayout} />
                <MenuElement title={"Voir la carte"} currentLayout={layout} layoutType={layoutEnum.CARTE} onClick={setLayout} />
            </div>
        </Fragment>
    )
}

export default Index
