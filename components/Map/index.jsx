import React from 'react'
import ReactMapGL, {Marker, Popup} from 'react-map-gl'
import  getCenter  from 'geolib/es/getCenter'

import {LocationMarkerIcon} from '@heroicons/react/solid'

function Map({searchResult}) {

    // Transformn the search result object into getCenter
    const [selectedLocation, setSelectedLocation] = React.useState({});
    const coordinates = searchResult.map(result =>({
        longitude: result.long,
        latitude:result.lat
    }));
    
    const center = getCenter(coordinates);

    const [viewport, setViewport] = React.useState({
        latitude: center.latitude,
        longitude:center.longitude,
        width:'100%',
        height:'100%',
        zoom:11
    })



    return (
        <div className="w-[600px]">
                <ReactMapGL
                    {...viewport}
                    mapStyle='mapbox://styles/alfianfl/cktjd6j0o261c18qfjwjrknzz'
                    mapboxApiAccessToken={process.env.mapbox_key}
                    onViewportChange={(viewport) => setViewport(viewport)}
                >
                    {searchResult.map((result)=> (
                        <div key={result.long}>
                            <Marker
                                longitude={result.long}
                                latitude={result.lat}
                                offsetLeft={-20}
                                offsetTop={-10}
                            >
                              <LocationMarkerIcon role="img" area-label="push-pin" onClick={() => setSelectedLocation(result)} className='h-6 cursor-pointer text-2xl animate-bounce text-blue-400'/>
                            </Marker>

                            {/* this the pop up should show if click the marker */}

                            {selectedLocation.long=== result.long  ? (
                                <Popup
                                   closeOnClick={true} 
                                   onClose={() => setSelectedLocation({})}
                                   latitude={result.lat}
                                   longitude={result.long}
                                >
                                    {result.title}
                                    </Popup>
                            ) : (
                                false
                            )}
                        </div>
                    ))}
                </ReactMapGL>
        </div>
    )
}

export default Map
