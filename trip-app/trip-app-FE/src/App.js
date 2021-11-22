import './App.css';
import React, { Component, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import L from "leaflet";
import { Routing } from "leaflet-routing-machine";
import * as tripData from "./trip-data.json";

function App() {
  return (<MapContainer center={[51.339695, 12.373075]} zoom={13} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <LoadTrips />
    <LocationMarker />
  </MapContainer>);
}

function LoadTrips() {
  var map = new useMap();
  let points = [];
  tripData.Trips.forEach(ele => {
    points = [];
    ele.Trip.forEach(loc => {
      points.push(new L.LatLng(loc.lat, loc.lng));
    });
    L.Routing.control({
      waypoints: points,
      addWaypoints: false,
    }).addTo(map);
  });
  return null;
}

function LocationMarker() {
  const [position] = useState(null);
  let [firstPoint, secondPoint, startBtn, destBtn] = useState(null);
  const map = useMapEvents({
    click(e) {
      var container = L.DomUtil.create('div'),
        destBtn = createButton('End Trip', container, firstPoint != null),
        startBtn = createButton('Start Trip', container, firstPoint != null);

      L.popup()
        .setContent(container)
        .setLatLng(e.latlng)
        .openOn(map);

      L.DomEvent.on(startBtn, 'click', function () {
        firstPoint = e.latlng;
        map.addLayer(L.marker(e.latlng))
        map.flyTo(e.latlng, map.getZoom());
        map.closePopup();
      });

      L.DomEvent.on(destBtn, 'click', function () {
        secondPoint = e.latlng;
        if (firstPoint !== null && secondPoint !== null) {
          L.Routing.control({
            waypoints: [firstPoint, secondPoint],
            addWaypoints: false,
          }).addTo(map);
          firstPoint = null;
          secondPoint = null;
        }
        map.closePopup();
      });
    },
  });





  function createButton(label, container, hidden) {
    var btn = L.DomUtil.create('button', '', container);
    btn.setAttribute('type', 'button');
    console.log(label);
    console.log(hidden);
    if (hidden) {
      btn.setAttribute('hidden', 'true');
      if (label === "End Trip") {
        btn.removeAttribute('hidden');
      }
    } else {
      if (label === "End Trip") {
        btn.setAttribute('hidden', 'true');
      }
    }

    btn.innerHTML = label;
    return btn;
  }

  function removeMarker() {
  }

  return position === null ? null : (
    <Marker position={position} draggable={true}>
      <Popup>
        <span onClick={removeMarker}>Cancel Trip</span>
      </Popup>
    </Marker>
  )
}


export default App;
