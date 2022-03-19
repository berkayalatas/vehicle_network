import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import Image from "next/image";
import { getCenter } from "geolib";
import MapCard from "./MapCard";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import carImg from "../../public/images/car.png";

mapboxgl.accessToken = process.env.mapbox_access_token;

function Map({ carData }) {
  const [selectedPin, setSelectedPin] = useState({});
  const [cars, setCars] = useState(carData);
  const [findCord, setFindCord] = useState([]);

  // function a() {
  //   if (carData != []) {
  //     var cordinates = carData?.map((data) => ({
  //       longitude: data["car"]["location"]["lng"],
  //       latitude: data["car"]["location"]["lat"],
  //     }));
  //   }  if (carData == [])  {
  //     setTimeout(() => {
  //       var cordinates = carData?.map((data) => ({
  //         longitude: data["car"]["location"]["lng"],
  //         latitude: data["car"]["location"]["lat"],
  //       }));
  //       setFindCord(cordinates)
  //     }, 1000);
  //   }

  //   return cordinates;
  // }

  // //console.log(cordinates);
  // const center = getCenter(a());
  // console.log(center);

  //latitude and longitude of the center of locations
  //!TODO GET CENTER OF CITY

  //console.log(center?.longitude);
  //console.log(  center?.longitude, center?.latitude);

  //!TODO CHANGE DATA WITH DYNAMIC VALUES
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    longitude: 8.8127,
    latitude: 49.2485,
    zoom: 4,
  });

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/berkayalatas/cl082a0ql001r14p4m2jypcqr"
      mapboxApiAccessToken={mapboxgl.accessToken}
      {...viewport}
      onMove={(nextViewport) => setViewport(nextViewport)} // movement on the map
    >
      {carData?.map((marker, key) => (
        <div key={key}>
          <Marker
            longitude={marker["car"]["location"]["lng"]}
            latitude={marker["car"]["location"]["lat"]}
            offsetLeft={-20}
            offsetRight={-10}
          >
            <p
              role="img"
              className="cursor-pointer text-2xl animate-bounce"
              onClick={() => {
                setTimeout(() => {
                  setSelectedPin(marker["car"]["location"]);
                });
              }}
              aria-label="car"
            >
              <Image src={carImg} width={35} height={35} alt="CAR" />
            </p>
          </Marker>
          {/* {console.log(selectedPin.lng, marker["car"]["location"]["lng"])} */}
          {/* popup will show up if we click on a marker */}
          {selectedPin.lng == marker["car"]["location"]["lng"] ? (
            <Popup
              onClose={() => {
                setSelectedPin({});
              }}
              className="z-10 "
              maxWidth="330"
              closeOnClick={true}
              latitude={marker["car"]["location"]["lat"]}
              longitude={marker["car"]["location"]["lng"]}
            >
              <MapCard
                carImg={marker["car"]["carImage"]["img1"]}
                description={marker["car"]["carDescription"]}
                model={marker["car"]["model"]}
                brand={marker["car"]["brand"]}
                price={marker["reservationDetails"]["price"]}
              />
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
}

export default Map;
