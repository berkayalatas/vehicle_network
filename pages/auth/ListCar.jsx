import React, { useRef, useEffect, useState } from "react";
import PrivateRoute from "../PrivateRoute";
import Nav from "../../components/navbar/Nav";
import { useRouter } from "next/dist/client/router";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase_config";
import "react-date-range/dist/styles.css"; // main style file for date picker
import "react-date-range/dist/theme/default.css"; // theme css file date picker
import { DateRangePicker } from "react-date-range";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import style from "../../styles/carListing.module.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import Breadcrumb from "../../components/breadcrumbs/Breadcrumb";
import { toast, ToastContainer } from "react-toastify";

function ListCar() {
  const router = useRouter();
  const { user, currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  /* User */
  const [phoneNumber, setPhoneNumber] = useState("");
  const [drivingLicenceNo, setDrivingLicenceNo] = useState("");
  const [roomNo, setRoomNo] = useState("");
  /* Car Info*/
  const [city, setCity] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState(null);
  const [carDescription, setCarDescription] = useState("");
  const [numberOfDoor, setNumberOfDoor] = useState("");
  const [numberOfSeat, setNumberOfSeat] = useState("");
  const [power, setPower] = useState("");
  const [available, setAvailable] = useState(true);

  /* Reservation Details */
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [price, setPrice] = useState("");

  /* Date Range*/
  const dateRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  /* Map related states */
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(8.8127);
  const [lat, setLat] = useState(49.2485);
  const [zoom, setZoom] = useState(4);

  /* Mapbox Access Token */
  mapboxgl.accessToken = process.env.mapbox_access_token;

  /* Notification */
  const notifySuccess = () =>
    toast.success("Car successfully listed!", {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  /* Mapbox geolocation and find user location, define marker here */
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/berkayalatas/cl082a0ql001r14p4m2jypcqr",
      center: [lng, lat],
      zoom: zoom,
    });
    let geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      marker: {
        color: "#3f97f2",
      },
      mapboxgl: mapboxgl,
    });
    map.current.addControl(geocoder);
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true,
      })
    );
  }, []);

  /* Click event and create marker */
  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    const marker = new mapboxgl.Marker({
      color: "#3f97f2",
    });
    map.current.on("click", (event) => {
      marker.setLngLat(event.lngLat).addTo(map.current);
      setLng(event.lngLat.lng.toFixed(4));
      setLat(event.lngLat.lat.toFixed(4));
    });
  }, []);

  /* Change longitude and latitude on move */
  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  }, []);

  /* using timestamp generate a car id */
  function toTimestamp(strDate) {
    var datum = Date.parse(strDate);
    return datum / 1000;
  }

  /* Firebase Database JSON structure for car listing */
  const newListing = {
    user: {
      userID: user.uid,
      userEmail: user.email,
      phoneNumber: phoneNumber,
      drivingLicenceNo: drivingLicenceNo,
      roomNo: roomNo, // TODO: chat application integration
    },
    car: {
      carID: toTimestamp(new Date()), // timestamp (unique ID)
      location: {
        lng: lng,
        lat: lat,
      },
      city: city,
      brand: brand,
      model: model,
      carImage: {
        img1: img1,
        img2: img2,
      },
      carDescription: carDescription,
      numberOfDoor: numberOfDoor,
      numberOfSeat: numberOfSeat,
      power: power, //gas or electric
      available: available,
    },
    reservationDetails: {
      startDate: startDate.getTime() / 1000, //Store the date as a unix timestamp (in milliseconds) using
      endDate: endDate.getTime() / 1000, //Store the date as a unix timestamp (in milliseconds) using
      price: price, //per day
    },
  };

  /* Date Picker function for selection */
  const handleDatePicker = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  /* Save to Database if everything is okay*/
  function handleNewListing(event) {
    event.preventDefault();
    db.collection("cars")
      .add(newListing)
      .then(() => {
        notifySuccess();
        setTimeout(()=>{
          router.push("/auth/UserDashboard"); //redirect to the dashboard
        },2000)
      })
      .catch((error) => {
        setError(error);
        console.log(error);
      });
  }

  return (
    <>
      <Nav />
      <div className="flex flex-col text-center justify-center align-middle">
        <h2
          className="text-center mt-2 text-4xl text-blue-400 font-display font-semibold xl:text-4xl
                    xl:text-bold"
        >
          List Your Car
        </h2>

        <Breadcrumb
          title1={"User Dashboard"}
          href1={"/auth/UserDashboard"}
          title2={"My Cars"}
          href2={"/auth/MyCar"}
          title3={"Liked Cars"}
          href3={"/auth/LikedCars"}
        />

        <div className="m-3 sm:m-0 mt-2 flex justify-center ">
          <form onSubmit={handleNewListing}>
            <div className="mt-4">
              <div className="flex flex-col">
                <div className="lg:text-md text-left font-bold text-gray-700 tracking-wide">
                  Your City
                </div>
                <div className="text-sm text-gray-500 text-left ">
                  For now, we're only available in Paris, Berlin, and Vienna.
                </div>
              </div>
              <select
                id="city"
                name="city"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="
                w-full text-lg py-2 border-2 mt-2 border-gray-600  focus:border-blue-300
                focus:ring-indigo-500 h-full pl-2 pr-7 bg-transparent text-gray-500 sm:text-sm rounded-md"
              >
                <option defaultValue="">Select City</option>
                <option value="Paris">Paris</option>
                <option value="Berlin">Berlin</option>
                <option value="Vienna">Vienna</option>
              </select>
            </div>

            <div className="mt-5">
              <div className="flex justify-between items-center">
                <div className="m-2 font-bold text-left text-gray-700 lg:text-md tracking-wide">
                  Find your car location{" "}
                  <div className="text-sm text-gray-500 text-left ">
                    Search your city or locate yourself using the find my
                    location button. <br />
                    Click on the map to indicate your car location.
                  </div>
                </div>
              </div>
              <div className={style.sidebar}>
                Longitude: {lng} | Latitude: {lat}
              </div>
              <div ref={mapContainer} className={style.map_container} />
            </div>
            <div className="mt-4">
              <div className="flex justify-between items-center">
                <div className="lg:text-md font-bold text-gray-700 tracking-wide">
                  Phone Number
                </div>
              </div>
              <input
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-blue-300"
                type="text"
                required
                placeholder="+15718312255"
                minLength="9"
                maxLength="15"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(event) => {
                  const numberValidate = event.target.value.slice(0, 15);
                  setPhoneNumber(numberValidate);
                }}
              />
            </div>
            <div className="mt-4">
              <div className="flex justify-between items-center">
                <div className="lg:text-md font-bold text-gray-700 tracking-wide">
                  Driving Licence No
                </div>
              </div>
              <input
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-blue-300"
                type="text"
                required
                placeholder="Driving Licence Number"
                minLength="4"
                maxLength="15"
                name="drivingLicenceNo"
                value={drivingLicenceNo}
                onChange={(event) => setDrivingLicenceNo(event.target.value)}
              />
            </div>
            <div className="mt-4 flex justify-between ">
              <div>
                <div className="flex justify-between items-center">
                  <div className="lg:text-md font-bold text-gray-700 tracking-wide">
                    Brand
                  </div>
                </div>
                <input
                  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-blue-300"
                  type="text"
                  required
                  placeholder="Audi"
                  minLength="3"
                  maxLength="20"
                  name="brand"
                  value={brand}
                  onChange={(event) => setBrand(event.target.value)}
                />
              </div>
              <div className="flex justify-around items-center">
                <div>
                  <div className="lg:text-md text-left font-bold text-gray-700 tracking-wide">
                    Model
                  </div>
                  <input
                    className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-blue-300"
                    type="text"
                    required
                    placeholder="Q7"
                    minLength="1"
                    maxLength="20"
                    name="model"
                    value={model}
                    onChange={(event) => setModel(event.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between items-center">
                <div className="lg:text-md font-bold text-gray-700 tracking-wide">
                  Car Image
                </div>
              </div>
              <input
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-blue-300"
                type="url"
                required
                placeholder="Image URL*"
                name="img1"
                value={img1}
                onChange={(event) => setImg1(event.target.value)}
              />
            </div>
            <div className="mt-4">
              <div className="flex justify-between items-center">
                <div className="lg:text-md font-bold text-gray-700 tracking-wide">
                  Car Description
                </div>
              </div>
              <textarea
                name="message"
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-blue-300"
                required
                rows="2"
                minLength="6"
                maxLength="200"
                placeholder="Car Description"
                value={carDescription}
                onChange={(event) => setCarDescription(event.target.value)}
              ></textarea>
            </div>
            <div className="mt-4 flex justify-between ">
              <div>
                <div className="flex justify-between items-center">
                  <div className="lg:text-md font-bold text-gray-700 tracking-wide">
                    Number of Door
                  </div>
                </div>
                <input
                  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-blue-300"
                  type="number"
                  required
                  placeholder="4"
                  name="numberOfDoor"
                  value={numberOfDoor}
                  onChange={(event) => setNumberOfDoor(event.target.value)}
                />
              </div>
              <div className="flex justify-around items-center">
                <div>
                  <div className="lg:text-md text-left font-bold text-gray-700 tracking-wide">
                    Number of Seat
                  </div>
                  <input
                    className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-blue-300"
                    type="number"
                    required
                    min="2"
                    max="4"
                    placeholder="4"
                    name="numberOfSeat"
                    value={numberOfSeat}
                    onChange={(event) => setNumberOfSeat(event.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between items-center">
                <div className="lg:text-md font-bold text-gray-700 tracking-wide">
                  Power
                </div>
              </div>
              <select
                id="power"
                name="power"
                type="text"
                value={power}
                onChange={(e) => setPower(e.target.value)}
                className="
                w-full text-lg py-2 border-2 mt-2 border-gray-600 focus:border-blue-300
                focus:ring-indigo-500 h-full pl-2 pr-7 bg-transparent text-gray-500 sm:text-sm rounded-md"
              >
                <option defaultValue="">Select Type of Power</option>
                <option value="Gas">Gas</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid ">Hybrid </option>
              </select>
            </div>
            <div className="mt-4">
              <div className="flex justify-between items-center">
                <div className="lg:text-md font-bold text-gray-700 tracking-wide">
                  Price
                </div>
              </div>
              <input
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-blue-300"
                type="number"
                required
                placeholder="Car price per day"
                name="price"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              />
            </div>
            <div className="mt-4">
              <div className="flex justify-between items-center">
                <div className="lg:text-md font-bold text-gray-700 tracking-wide">
                  Car availability
                </div>
              </div>
              <DateRangePicker
                showDateDisplay={false}
                ranges={[dateRange]}
                minDate={new Date()}
                rangeColors={["#3f97f2"]}
                onChange={handleDatePicker}
              />
            </div>

            <div className="mt-8 mb-4 flex justify-center items-center">
              <button
                disabled={loading}
                type="submit"
                className="bg-blue-400 text-gray-100 p-3 w-2/3 rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline
                                hover:bg-blue-500 shadow-lg"
              >
                Add new car
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
export default PrivateRoute(ListCar);
