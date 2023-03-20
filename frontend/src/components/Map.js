import React, {useState, useEffect, useRef} from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import shop from '../assets/icons/shop.svg';
import classes from "./Map.module.css";
import ManageShopForm from "./ManageShopForm";
import ManageUsersShops from "./ManageUsersShops";
import ShopFilter from "./ShopFilter";

const zoom = 15;
const lat = 47.49720000;
const lng = 19.04120000;

const shopIcon = L.icon({
    iconUrl: shop,
    iconSize: [50, 50]
});

const fetchShops = async (setShops) => {
    try {
        const response = await fetch('http://localhost:8888/final-project/backend/shop/get-shops.php');
        const data = await response.json();
        setShops(data.shops);
    } catch (error) {
        console.error(error);
    }
};

const saveShop = async (shop) => {
    try {
        await fetch(
            'http://localhost:8888/final-project/backend/shop/save-shop.php',
            {
                method: 'POST',
                mode: "cors",
                credentials: "include",
                body: JSON.stringify(shop)
            });
    } catch (error) {
        console.error(error);
    }
};

export default function Map(props) {
    const [shops, setShops] = useState([]);
    const [showAddMarker, setShowAddMarker] = useState(false);
    const [showUsersShops, setShowUsersShops] = useState(false);
    const mapRef = useRef(null);
    const { id: userId, role_id: roleId} = props.userData;
    const [mapLocation, setMapLocation] = useState([lat, lng]);

    const handleAddShop = () => {
        setShowAddMarker(!showAddMarker);
    };

    const handleGetUsersShops = () => {
        setShowUsersShops(!showUsersShops);
    }

    const onAddShop = async (shop) => {
        const shopToSave = {...shop, userId};
        await saveShop(shopToSave);
        await fetchShops(setShops);
    };

    useEffect(() => {
        let map;

        fetchShops(setShops).then(() => {});

        if (!mapRef.current) {
            map = L.map("map").setView(mapLocation, zoom);

            L.tileLayer(
                "https://tile.jawg.io/jawg-light/{z}/{x}/{y}{r}.png?access-token=1ZU1Tl8qgksGLRZjVgyo4VpSFp2RcByNResEUKhri9GEuaGikhLfYxHKfINtbSHR",
                {}
            ).addTo(map);

            const customControl = L.Control.extend({
                options: {
                    position: "topright",
                },
                onAdd: function () {
                    const container = L.DomUtil.create(
                        "div",
                        "leaflet-bar leaflet-control leaflet-control-custom"
                    );

                    container.style.backgroundColor = "white";
                    container.innerHTML = "current location";

                    container.addEventListener("click", function () {
                        map.locate({ setView: true, maxZoom: 16 });
                    });

                    return container;
                }
            });

            let controlCurrentLocation = new customControl();

            map.addControl(controlCurrentLocation);

            mapRef.current = map;
        } else {
            mapRef.current.setView(mapLocation, zoom);
        }
    }, [mapLocation]);

    useEffect(() => {
        if (Array.isArray(shops)) {
            const map = mapRef.current;

            map.eachLayer((layer) => {
                if (layer instanceof L.Marker) {
                    map.removeLayer(layer);
                }
            });

            shops.forEach((location) => {
                const latLng = L.latLng(location.lat, location.lng);
                const marker = L.marker(latLng, {
                    // draggable: true,
                    // autoPan: true,
                    icon: shopIcon,
                }).addTo(mapRef.current);
                if (location.information) {
                    marker.bindPopup(location.information);
                }
            });
        }
    }, [shops]);

    const onFilterChange = (shop) => {
        console.log(shop);
    }

    return (
        <div className={classes.wrapperDiv}>
            {roleId === 2 && <button onClick={handleAddShop}>Add shop</button>}
            {showAddMarker && <ManageShopForm isAdd={true} onAddShop={onAddShop} />}
            {roleId === 2 && <button onClick={handleGetUsersShops} className={classes.btn}>My shop(s)</button>}
            {showUsersShops && <ManageUsersShops userId={userId} setMapLocation={setMapLocation}/>}
            {roleId === 1 && <ShopFilter onChange={onFilterChange}/>}

            <div id="map" style={{height: "400px", width: "100%", margin: "20px 0", zIndex: -1}}></div>
        </div>
    );
};