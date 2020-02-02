import React, {useEffect, useState, Fragment} from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet-universal'
import Head from 'next/head'
import {useFetch} from '../components/FetchHook/useFetch'


const ViewMap = (props) => {
    const [isBrowser ,setIsBrowser] = useState(false);
    const { data, updateFilters, loading, searchFilter, filters, setFilters, setSearchFilter, load, setSearchValue} = useFetch('commune/search', ["hiddenLrem=true"]);
    const DEFAULT_VIEWPORT = {
        center: [48.019, -0.428],
        zoom: 6,
    }
    useEffect(() => {
        setIsBrowser(true)
    }, [])

    return (
        <div>
            {isBrowser &&
            <Map viewport={DEFAULT_VIEWPORT} style={{ height: "90vh" }}>
                {() => {
                    return (
                        <Fragment>
                            <Head>
                                <title>Lrem</title>
                                <meta name="viewport" content="width=device-width, initial-scale=1" />
                                <meta charSet="utf-8" />
                                <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
                                      integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
                                      crossOrigin=""/>
                            </Head>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                            />
                           {data && data.map((d) => {
                               const politic = d.politics.find((l) => l.hiddenLrem === true);
                               return <Marker position={[parseFloat(d.latitude), parseFloat(d.longitude)]}>
                                   <Popup><div>
                                       <div>
                                           <h1>{d.nom}</h1>
                                       </div>
                                       <div>
                                           <span>{politic.nom}{politic.prenom}</span>
                                       </div>
                                   </div></Popup>
                               </Marker>
                           })}
                        </Fragment>
                    )
                }}
            </Map>
            }
        </div>
    )
}

export default ViewMap
