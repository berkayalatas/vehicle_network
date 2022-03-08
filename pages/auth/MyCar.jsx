import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Image from "next/image";
import PrivateRoute from "../PrivateRoute";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import Nav from "../../components/navbar/Nav";
import { db } from "../../firebase_config";
import { CalendarIcon } from "@heroicons/react/outline";
import Error from "../../components/errors/Error";
import notfound from "../../public/images/notfound.png";
import DeleteModal from "../../components/modals/DeleteModal";

function MyCar() {
  const [error, setError] = useState("");
  const { user } = useAuth();
  const router = useRouter();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  /* Receive car data if user has a car in the database */
  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      const myCars = db.collection("cars");
      myCars
        .get()
        .then((data) => {
          if (data.size === 0) {
            console.log("Cars not found.");
          }
          setLoading(false);
          const cars = data.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });
          if (user.uid) {
            const filterCars = cars.filter(
              (theCar) => theCar.user.userID === user.uid
            );
            setCars(filterCars);
          } else {
            setCars(cars);
          }
        })
        .catch((error) => {
          console.error("Failed to bring car", error);
        });
    };
    fetchData();
  }, []);

  // console.log(cars);

  return (
    <div className="overflow-x-hidden">
      <Nav />
      <div className="flex justify-center mt-5">
        <h2
          className="text-3xl text-blue-400 font-display font-semibold lg:text-left xl:text-4xl
                    xl:text-bold"
        >
          My Cars
        </h2>
      </div>

      <div className="flex align-middle justify-center text-center mt-5">
        <nav
          className="bg-blue-50 text-gray-700 border border-blue-200 py-3 px-5 rounded-lg"
          aria-label="Breadcrumb"
        >
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/">
                <div className="flex cursor-pointer">
                  <svg
                    className="w-5 h-5 mr-2.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                  </svg>
                  <span>Home</span>
                </div>
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <Link
                  href="/auth/UserDashboard"
                  className="text-blue-700 hover:text-blue-900 ml-1 md:ml-2 text-sm font-medium"
                >
                  User Dashboard
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <Link
                  href="/auth/ListCar"
                  className="text-blue-700 hover:text-blue-900 ml-1 md:ml-2 text-sm font-medium"
                >
                  List new car
                </Link>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      {error && <Error error={error} />}

      <section className="mt-10 lg:mt-12 pb-10 lg:pb-10 flex justify-center align-center">
        <div className="container m-2 sm:m-4">
          <div className="flex flex-wrap -mx-4 m-2 justify-center">
            {/* Filter user cars here */}
            {cars.length > 0 ? (
              cars.map((car, key) => (
                <div key={key} className="w-full md:w-1/2 xl:w-1/3 px-4">
                  <div className="bg-white rounded-lg overflow-hidden mb-10 border-2 hover:shadow-lg">
                    <img
                      src={car?.car["carImage"]["img1"]}
                      alt="image"
                      className="w-full transform duration-200 hover:scale-110"
                    />
                    <div className="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
                      <h3>
                        <Link href="#">
                          <p
                            className="
                            font-semibold
                            text-dark text-xl
                            sm:text-[22px]
                            md:text-xl
                            lg:text-[22px]
                            xl:text-xl
                            2xl:text-[22px]
                            mb-4
                            block
                            cursor-pointer                    
                            "
                          >
                            {car?.car["brand"]} {car?.car["model"]}
                          </p>
                        </Link>
                      </h3>
                      <p className="text-base text-body-color leading-relaxed mb-7">
                        {car?.car["carDescription"]}
                      </p>
                      <div className="p-4 border-t text-sm text-gray-800 flex flex-col justify-around">
                        <div className="flex items-center">
                          <p>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 lg:h-7 lg:w-7 m-2 mb-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 10.5h4m-4 3h4m9-1.5a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </p>
                          <p className="text-lg text-md font-semibold pb-1 lg:text-lg">
                            {car?.reservationDetails["price"]} € / day
                          </p>
                        </div>
                        <div className="flex justify-start align-middle items-center mb-1">
                          <div className="flex justify-end align-middle">
                            <div>
                              <CalendarIcon className="h-6 w-6 m-2" />
                            </div>
                            <div className="mt-2 text-left text-md font-semibold pb-1 lg:text-lg">
                              from {car?.reservationDetails["startDate"]} to{" "}
                              {car?.reservationDetails["endDate"]}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col lg:flex-row justify-center lg:justify-around align-middle">
                        <div>
                          <button
                            onClick={() => {
                              router.push({
                                /* View details click event (routing) -- push carID, brand and model to the URL*/
                                pathname: "/auth/UpdateCar",
                                query: {
                                  city: car?.car["city"],
                                  carID: car?.car["carID"],
                                  brand: car?.car["brand"],
                                  lng: car?.car["location"]["lng"],
                                  lat: car?.car["location"]["lat"],
                                },
                              });
                            }}
                            className="inline-block py-3 px-4 m-2 w-1/2 lg:w-full border border-[#E5E7EB] rounded-2xl
                          text-base text-body-color font-medium hover:border-primary transition cursor-pointer 
                          bg-blue-500 hover:bg-blue-600 text-gray-100"
                          >
                            Update Car
                          </button>
                        </div>
                        <div>
                          <button
                            onClick={() => setOpen(true)}
                            className="inline-block py-3 px-4 m-2 w-1/2 lg:w-full border border-[#E5E7EB] rounded-2xl
                              text-base text-body-color font-medium hover:border-primary transition cursor-pointer 
                              bg-red-500 hover:bg-red-600 text-gray-100"
                          >
                            Delete Car
                          </button>
                          {open && <DeleteModal setOpen={setOpen} carID={car?.car["carID"]} />}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className=" flex flex-col justify-center align-middle text-center my-2">
                <Image
                  src={notfound}
                  width={200}
                  height={250}
                  alt="No Data"
                />
                <div
                  className="text-center font-semibold text-xl my-3 text-gray-600 font-display lg:text-2xl
                      lg:text-bold "
                >
                  You have not added a car yet
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default PrivateRoute(MyCar);
