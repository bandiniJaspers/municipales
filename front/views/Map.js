import React, {useEffect, useState, Fragment} from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet-universal'
import {useFetch} from '../components/FetchHook/useFetch'
import {ViewPolitic} from '../components/DisplayPolitics/ViewPolitic'


const ViewMap = (props) => {
    const [isBrowser ,setIsBrowser] = useState(false);
    const { data, updateFilters, loading, searchFilter, filters, setFilters, setSearchFilter, load, setSearchValue} = useFetch('commune/search', ["hiddenLrem=true"]);
    const DEFAULT_VIEWPORT = {
        center: [48.019, -0.428],
        zoom: 6,
    }
    useEffect(() => {
        if (loading)
            return
        setIsBrowser(true)
    }, [loading])

    return (
        <div>
            {isBrowser &&
            <Map viewport={DEFAULT_VIEWPORT} style={{ height: "90vh" }}>
                {() => {
                    return (
                        <Fragment>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                            />
                           {data && data.map((d, idx) => {
                               const politic = d.politics.find((l) => l.hiddenLrem === true);
                               return <Marker key={`marker_${idx}`} position={[parseFloat(d.latitude), parseFloat(d.longitude)]}>
                                   <Popup>
                                               <div className={"popup-header"}>
                                                   <h1>{d.nom}</h1>
                                               </div>
                                               <ViewPolitic politic={politic} />
                                   </Popup>
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
