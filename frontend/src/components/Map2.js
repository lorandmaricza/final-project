import React, {useState} from "react";
import {MapContainer, Marker, Popup, TileLayer, useMapEvents} from 'react-leaflet';
import shop from '../assets/icons/shop.svg';
import L from "leaflet";

const Zoom = 15;
const Lat = 47.497913;
const Lng = 19.040236;

const LeafIcon = L.Icon.extend({
    options: {}
});

const shopIcon = new LeafIcon({
    iconUrl: shop,
    iconSize: [50, 50]
});

const locations = [
    {lat: 47.4972, lng: 19.0412, info: '<b>Shop X</b><br />One day I am going to represent X shops supply...'},
    {lat: 47.4975, lng: 19.0392, info: '<b>Shop XYZ</b><br />Another store.'},
    {lat: 47.4979,lng: 19.0362, info: '<b>Shop XY</b><br />One day I am gonna represent XY shops supply. 🤩'}
];

export default function Map2() {
    // const [addMarkerMode, setAddMarkerMode] = useState(false);
    // console.log(addMarkerMode);

    const LocationMarker = (props) => {
        const [position, setPosition] = useState(null)
        // const addMarkerMode = props.addMarkerMode;

        const map = useMapEvents({
            click(e) {
                map.locate()

                // if (addMarkerMode) {
                //     map.locate()
                // } else {
                //     locations.push({lat: e.latlng.lat, lng: e.latlng.lng, info: 'nothing'});
                //     setPosition(e.latlng)
                // }
            },
            locationfound(e) {
                setPosition(e.latlng)
                map.flyTo(e.latlng, map.getZoom())
            },
        })

        return position === null ? null : (
            <Marker position={position}>
                <Popup>You are here</Popup>
            </Marker>
        )
    }

    // const handleManageLocationMode = () => {
    //     setAddMarkerMode(!addMarkerMode);
    // }

    return (
        <div>
            <br/>manage locations mode:
            <label className="switch">
                {/*<input type="checkbox" onClick={handleManageLocationMode}/>*/}
                <input type="checkbox"/>
                <span className="slider round"></span>
            </label>
            <MapContainer center={[Lat, Lng]}  zoom={Zoom}>
                <TileLayer url="https://tile.jawg.io/jawg-light/{z}/{x}/{y}{r}.png?access-token=1ZU1Tl8qgksGLRZjVgyo4VpSFp2RcByNResEUKhri9GEuaGikhLfYxHKfINtbSHR"/>

                <div>
                    {locations.map((location) => (
                        <Marker
                            key={location.lat}
                            position={[location.lat, location.lng]}
                            icon={shopIcon}
                        >
                            <Popup>
                                <div dangerouslySetInnerHTML={{ __html: location.info }} />
                            </Popup>
                        </Marker>
                    ))}
                </div>

                {/*<LocationMarker addMarkerMode={addMarkerMode}/>*/}
                <LocationMarker/>
            </MapContainer>
        </div>
    );
}
