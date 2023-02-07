<?php
include 'supplier-page.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <base target="_top">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Quick Start - Leaflet</title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css" integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI=" crossorigin=""/>
<!--    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/tomik23/autocomplete@1.8.6/dist/css/autocomplete.min.css"/>-->
    <script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js" integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM=" crossorigin=""></script>
<!--    <script src="https://cdn.jsdelivr.net/gh/tomik23/autocomplete@1.8.6/dist/js/autocomplete.min.js"></script>-->
    <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/gh/tomik23/autocomplete@1.8.6/dist/css/autocomplete.min.css"
    />
    <script src="https://cdn.jsdelivr.net/gh/tomik23/autocomplete@1.8.6/dist/js/autocomplete.min.js"></script>
    <style>
        .map-options-wrapper {
            position: absolute;
            top: 20px;
            right: 100px;
        }
        .add-address-wrapper {
            margin-bottom: 10px;
        }
        #map {
            width: 600px;
            height: 400px;
        }
        .auto-clear {
            bottom: 20px;
        }
        .located-animation {
            width: 17px;
            height: 17px;
            border: 1px solid #fff;
            border-radius: 50%;
            background: #2a93ee;
            animation: border-pulse 2s infinite;
        }
        @keyframes border-pulse {
            0% {
                box-shadow: 0 0 0 0 rgba(255, 255, 255, 1);
            }

            70% {
                box-shadow: 0 0 0 10px rgba(255, 0, 0, 0);
            }

            100% {
                box-shadow: 0 0 0 0 rgba(255, 0, 0, 0);
            }
        }
        .locate-active {
            fill: red;
        }
        .locate-button {
            position: absolute;
            top: 80px;
            left: 10px;
            width: 16px;
            height: 16px;
            z-index: 999;
            cursor: pointer;
            display: none;
            padding: 5px;
            background: #fff;
            border: none;
            border-radius: 4px;
            box-shadow: 0 1px 5px rgb(0 0 0 / 65%);
        }
        .leaflet-touch .locate-button {
            width: 20px;
            height: 20px;
        }
    </style>
</head>
<body>
    <div class="map-options-wrapper">
        <div class="add-address-wrapper">
            <h3>Search for a location: </h3>
            <div class="auto-search-wrapper">
                <input type="text" id="location" autocomplete="off" placeholder="Enter letter" />
            </div>
            <button><a>Add Store</a></button>
        </div>
        <div id="map"></div>
    </div>
    <script src="map-handler.js"></script>
</body>
</html>
