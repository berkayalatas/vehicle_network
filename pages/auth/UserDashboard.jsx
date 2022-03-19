import { useAuth } from "../../contexts/AuthContext";
import PrivateRoute from "../PrivateRoute";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import Nav from "../../components/navbar/Nav";
import Image from "next/image";
import { db } from "../../firebase_config";
import { CalendarIcon, UserGroupIcon } from "@heroicons/react/outline";
import upcoming from "../../public/images/calendar.png";
import previous from "../../public/images/previous.png";
import Breadcrumb from "../../components/breadcrumbs/Breadcrumb";
import UpdateUser from "../../components/updateUser/UpdateUser";

function UserDashboard() {
  const router = useRouter();
  const { user } = useAuth();
  /* States */
  const [room, setRoom] = useState([]);
 
  /* Fetch Data from database */
  useEffect(() => {
    const getInfo = () => {
      const bookedRoom = db.collection("booking");
      bookedRoom
        .get()
        .then((data) => {
          if (data.size === 0) {
            console.log("No Result");
          }
          const room = data.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });
          if (user.uid) {
            const filterRooms = room.filter(
              (theRoom) => theRoom.user.userID === user.uid
            );
            setRoom(filterRooms);
          } else {
            setRoom(room);
          }
        })
        .catch((error) => {
          console.error("Failed to bring room", error);
        });
    };
    getInfo();
  }, []);

  /* Filter upcoming travels */
  const upcomingTravelsArr = room.filter(
    (rm) =>
      new Date(
        rm.reservationDetails["endDate"].replace(
          /(\d{2})-(\d{2})-(\d{4})/,
          "$2/$1/$3"
        )
      ) >= new Date()
  );

  /* Filter previous travels */
  const previousTravelsArr = room.filter(
    (rm) =>
      new Date(
        rm.reservationDetails["endDate"].replace(
          /(\d{2})-(\d{2})-(\d{4})/,
          "$2/$1/$3"
        )
      ) <= new Date()
  );

  return (
    <div>
      <Nav />

      <div className="flex justify-center mt-5">
        <h2
          className="text-3xl text-blue-400 font-display font-semibold lg:text-left xl:text-4xl
                    xl:text-bold"
        >
          User Dashboard
        </h2>
      </div>

      <Breadcrumb
        title1={"List new car"}
        href1={"/auth/ListCar"}
        title2={"My Cars"}
        href2={"/auth/MyCar"}
        title3={"Liked Cars"}
        href3={"/auth/LikedCars"}
      />

      <div className="flex flex-col justify-center mt-4">
        <UpdateUser />

        <div className="mt-2 flex justify-evenly flex-col md:flex-row mb-5">
          <div className="mt-10 flex flex-col justify-start">
            <h3
              className="text-center text-2xl text-blue-400 font-display font-semibold  xl:text-3xl
                            xl:text-bold"
            >
              Upcoming Rentals
            </h3>
            {/* Filter upcoming travels filter expired travels */}
            <div className="mt-2 flex flex-col justify-evenly items-center">
              {upcomingTravelsArr.length > 0 ? (
                upcomingTravelsArr.map((r, key) => (
                  <div key={key} className="w-11/12 sm:w-full py-4 px-2">
                    <div className="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden">
                      <div className="relative pb-48 overflow-hidden">
                        <img
                          className="absolute inset-0 h-full w-full object-cover"
                          src={r.room["roomImg"]}
                          alt="Car Image"
                        />
                      </div>
                      <div className="p-4">
                        <span className="inline-block px-2 py-1 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                          {r.reservationDetails["city"]}
                        </span>
                        <h2 className="mt-2 mb-2 font-bold">
                          {r.room["roomTitle"]}
                        </h2>
                        <p className="text-sm">{r.room["roomDescription"]}</p>
                        <div className="mt-3 flex items-center">
                          <span className="font-bold text-xl">
                            {" "}
                            {r.room["totalRoomPrice"]}
                          </span>
                          &nbsp;
                          <span className="text-sm font-semibold">$</span>
                        </div>
                      </div>

                      <div className="p-4 border-t border-b text-sm text-gray-800">
                        <div className="flex justify-start align-middle items-center mb-1">
                          <div className="flex justify-end align-middle">
                            <div>
                              <CalendarIcon className="h-6 w-6 m-2" />
                            </div>
                            <div className="mt-2">
                              from {r.reservationDetails["startDate"]} to{" "}
                              {r.reservationDetails["endDate"]}
                            </div>
                          </div>
                        </div>
                        <span className="flex items-center">
                          <UserGroupIcon className="h-6 w-6 m-2" />
                          {r.reservationDetails["numberOfGuest"]}
                        </span>
                      </div>
                      <div className="p-4 flex items-center text-sm text-gray-600">
                        <svg
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 fill-current text-blue-500"
                        >
                          <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z"></path>
                        </svg>
                        <span className="ml-2"> {r.room["roomStar"]}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className=" flex flex-col justify-center align-middle text-center my-2">
                  <Image
                    src={upcoming}
                    width={180}
                    height={280}
                    alt="No Data"
                  />
                  <div
                    className="text-center font-semibold text-xl my-3 text-gray-600 font-display xl:text-2xl
                      xl:text-bold "
                  >
                    No upcoming rental data
                  </div>
                  <div>
                    <button
                      onClick={() => router.push("/")}
                      className="bg-blue-500 text-gray-100 p-3 w-4/5 rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline
                                hover:bg-blue-600 shadow-lg"
                    >
                      Find a car
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-10 flex flex-col justify-start items-center">
            <h3
              className="text-center text-2xl text-blue-400 font-display font-semibold  xl:text-3xl
                            xl:text-bold"
            >
              No Trips
            </h3>

            {/* Filter previous travels filter expired travels */}

            <div className="mt-2 flex flex-col justify-evenly items-center">
              {previousTravelsArr.length > 0 ? (
                previousTravelsArr
                  .filter(
                    (rm) =>
                      new Date(
                        rm.reservationDetails["endDate"].replace(
                          /(\d{2})-(\d{2})-(\d{4})/,
                          "$2/$1/$3"
                        )
                      ) <= new Date()
                  )
                  .map((r, key) => (
                    <div key={key} className="w-11/12 sm:w-10/12 py-4 px-2">
                      <div className="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden">
                        <div className="relative pb-48 overflow-hidden">
                          <img
                            className="absolute inset-0 h-full w-full object-cover"
                            src={r.room["roomImg"]}
                            alt="Booked Room Image"
                          />
                        </div>

                        <div className="p-4">
                          <span className="inline-block px-2 py-1 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                            {r.reservationDetails["city"]}
                          </span>
                          <h2 className="mt-2 mb-2 font-bold">
                            {r.room["roomTitle"]}
                          </h2>
                          <p className="text-sm">{r.room["roomDescription"]}</p>
                          <div className="mt-3 flex items-center">
                            <span className="font-bold text-xl">
                              {" "}
                              {r.room["totalRoomPrice"]}
                            </span>
                            &nbsp;
                            <span className="text-sm font-semibold">$</span>
                          </div>
                        </div>

                        <div className="p-4 border-t border-b text-sm text-gray-800">
                          <div className="flex justify-start align-middle items-center mb-1">
                            <div className="flex justify-end align-middle">
                              <div>
                                <CalendarIcon className="h-6 w-6 m-2" />
                              </div>
                              <div className="mt-2">
                                from {r.reservationDetails["startDate"]} to{" "}
                                {r.reservationDetails["endDate"]}
                              </div>
                            </div>
                          </div>
                          <span className="flex items-center">
                            <UserGroupIcon className="h-6 w-6 m-2" />
                            {r.reservationDetails["numberOfGuest"]}
                          </span>
                        </div>
                        <div className="p-4 flex items-center text-sm text-gray-600">
                          <svg
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 fill-current text-blue-500"
                          >
                            <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z"></path>
                          </svg>
                          <span className="ml-2"> {r.room["roomStar"]}</span>
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <div className=" flex flex-col justify-center align-middle text-center my-2">
                  <Image
                    src={previous}
                    width={200}
                    height={300}
                    alt="No Data"
                  />
                  <div
                    className="text-center font-semibold text-xl my-3 text-gray-600 font-display xl:text-2xl
                      xl:text-bold "
                  >
                    No previous rental history
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivateRoute(UserDashboard);
