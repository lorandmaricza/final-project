// this component is not used since I am refactoring it in the Map2 component

import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import shop from '../assets/icons/shop.svg';
import "leaflet-easybutton/src/easy-button.js";
import "leaflet-easybutton/src/easy-button.css";

const Zoom = 15;
const Locations = [
    {lat: 52.22977, lng: 21.01178, info: '<b>Shop X</b><br />One day I am going to represent X shops supply...'},
    {lat: 52.2292, lng: 21.017706, info: '<b>Shop XYZ</b><br />Another store.'},
    {lat: 52.227,lng: 21.01178, info: '<b>Shop XY</b><br />One day I am gonna represent XY shops supply. 🤩'}
];
const Lat = 52.228;
const Lng = 21.011;

const Map1 = () => {
    const [map, setMap] = useState(null);

    useEffect(() => {
        if (!map) {
            const leafletMap = L.map('map').setView([Lat, Lng], Zoom);

            L.tileLayer('https://tile.jawg.io/jawg-light/{z}/{x}/{y}{r}.png?access-token=1ZU1Tl8qgksGLRZjVgyo4VpSFp2RcByNResEUKhri9GEuaGikhLfYxHKfINtbSHR', {}).addTo(leafletMap);

            const shopIcon = L.icon({
                iconUrl: shop,
                iconSize: [50, 50]
            });

            Locations.map(location => {
                const latLng = L.latLng(location.lat, location.lng);
                L.marker(latLng, {
                    draggable: true,
                    autoPan: true,
                    icon: shopIcon
                }).addTo(leafletMap)
                    .bindPopup(location.info);

                return true;
            });

            leafletMap.on('click', e => {
                L.popup()
                    .setLatLng(e.latlng)
                    .setContent(`You clicked the map at ${e.latlng.toString()}`)
                    // .setContent(<ManageMap />)
                    .openOn(leafletMap);
            });

            setMap(leafletMap);
        }
    }, [map]);

    return <div id="map" style={{height: "400px", width: "100%", margin: "20px 0"}}></div>;
};

export default Map1;
