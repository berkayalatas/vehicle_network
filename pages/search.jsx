import React, { useState, useEffect } from "react";
import Nav from "../components/navbar/Nav";
import Footer from "../components/footer/Footer";
import { useRouter } from "next/dist/client/router";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase_config";
import Error from "../components/errors/Error";
import CarCards from "../components/car_cards/CarCards";
import { format } from "date-fns";
import Map from "../components/map/Map";

function Search() {
  const router = useRouter();
  const { user } = useAuth();
  const { location, startDate, endDate } = router.query;
  const [cars, setCars] = useState([]);
  const [error, setError] = useState("");


  function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = date + " " + month + " " + year;
    return time;
  }
  console.log(Date.parse(startDate))
  const formattedStartDate = timeConverter(Date.parse(startDate));
  const formattedEndDate = timeConverter(Date.parse(endDate));
  const range = `from ${formattedStartDate} - to ${formattedEndDate}`;


  // FETCH DATA ACCORDING TO SEARCH INPUT
  useEffect(() => {
    const fetchCarData = () => {
      const myCars = db.collection("cars");
      myCars
        .get()
        .then((data) => {
          if (data.size === 0) {
            console.log("Cars not found.");
          }
          const cars = data.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });
          if (user.uid) {
            const filterByInput = cars?.filter(
              (theCar) =>
                theCar.car.city.toLowerCase() == location.toLowerCase()
            );
            setCars(filterByInput);
          } else {
            setCars(cars);
          }
        })
        .catch((error) => {
          console.error("Failed to bring cars", error);
          setError("Failed to bring cars");
        });
    };

    fetchCarData();
  }, []);

  /* ALTERNATIVE WAY TO FETCH DATA */
  // async function fetchData() {
  //   const querySnapshot = await getDocs(collection(db, "cars"));
  //   var allData = [];
  //   querySnapshot.forEach((doc) => {
  //     allData.push(doc.data());
  //     console.log("Document data:", doc.data());
  //   });
  //   const matchedData = allData?.filter(
  //     (car) => car.car["city"].toLowerCase() == searchInput.toLowerCase()
  //   );
  //   setCars([...matchedData]);
  // }

  console.log(cars);

  return (
    <div>
      <Nav
        placeholder={`${location.charAt(0).toUpperCase() + location.slice(1)} `}
      />
      {error ? (
        <Error error={error} />
      ) : (
        <main className="flex flex-col xl:flex-row justify-center align-items-center gap-2 xl:min-h-[100vh]">
          <section className="flex-col xl:overflow-y-scroll xl:max-h-[100vh]">
            <h1 className="text-2xl md:text-3xl font-semibold mt-2 mb-6 md:pl-5">
              Cars in {location.charAt(0).toUpperCase() + location.slice(1)}
            </h1>
            <p className="text-md md:text-lg font-semibold m-3 pl-2 pb-2 text-gray-900 ">
              {location.charAt(0).toUpperCase() + location.slice(1)}, {range}
            </p>
            <div
              className="flex pl-2 mb-5 space-x-3 
          text-gray-700 whitespace-nowrap justify-evenly "
            >
              {/* TODO: Add filters here */}
              <button className="button">Car Price</button>
              {/* <button className="button">Rooms Star</button> */}
            </div>
            <div className="flex flex-col">
              {cars?.map((car, key) => (
                <div key={key}>
                  <CarCards carData={car} />
                </div>
              ))}
            </div>
          </section>
          <section className="flex flex-wrap justify-center xl:min-w-[600px]">
            <Map carData={cars} />
          </section>
        </main>
      )}

      <Footer />
    </div>
  );
}

export default Search;
