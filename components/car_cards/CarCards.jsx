import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import seat from "../../public/logos/seat.png";
import carDoor from "../../public/logos/car-door.png";
import Like from "../../components/likeButton/Like";

function CarCards({ carData }) {
  const router = useRouter();

  const { startDate, endDate } = router.query;

  /* Number of days between startDate and endDate*/
  const totalDay =
    (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);

  console.log(carData);

  const [toggleLike, setToggleLike] = useState(false);

  useEffect(() => {
    const handleLikeClick = () => {
      const fetchLikedCars = JSON.parse(localStorage.getItem("likedCars"));
      if (fetchLikedCars != null) {
        // const filteredCars = fetchLikedCars.filter((car)=> car.carID != carID);
        for (let i = 0; i < fetchLikedCars.length; i++) {
          if (carData["car"]["carID"] == fetchLikedCars[i]["carID"]) {
            fetchLikedCars[i].active
              ? setToggleLike(true)
              : setToggleLike(false);
          }
        }
      }
    };
    handleLikeClick();
  }, []);

  return (
    <div
      className="flex flex-col md:flex-row pt-4 pb-7 px-2 pr-4 border-b
      hover:opacity-90 hover:shadow-lg transition duration-200 ease-out first:border-t"
    >
      <div
        className="relative h-64 w-full object-contain md:h-52 md:w-80 flex-shrink-0 cursor-pointer"
        onClick={() => {
          router.push({
            pathname: "/carDetails",
            query: {
              location: carData["car"]["city"],
              carID: carData["car"]["carID"],
              startDate: carData["reservationDetails"]["startDate"],
              endDate: carData["reservationDetails"]["endDate"],
            },
          });
        }}
      >
        <Image
          src={carData["car"]["carImage"]["img1"]}
          alt={carData["car"]["model"]}
          layout="fill"
          objectFit="cover"
          className="rounded-2xl "
        />
      </div>

      <div className="flex flex-col flex-grow pl-1 md:pl-5 mt-2">
        <div className="flex justify-between">
          <h4
            className="text-xl cursor-pointer "
            onClick={() => {
              router.push({
                pathname: "/carDetails",
                query: {
                  location: carData["car"]["city"],
                  carID: carData["car"]["carID"],
                  startDate: carData["reservationDetails"]["startDate"],
                  endDate: carData["reservationDetails"]["endDate"],
                },
              });
            }}
          >
            {carData["car"]["brand"] + " " + carData["car"]["model"]}
          </h4>

          <Like
            carID={carData["car"]["carID"]}
            active={toggleLike}
            setActive={setToggleLike}
            carImg={carData["car"]["carImage"]["img1"]}
            brand={carData["car"]["brand"]}
            model={carData["car"]["model"]}
            description={carData["car"]["carDescription"]}
            price={carData["reservationDetails"]["price"]}
            city={carData["car"]["city"]}
          />
        </div>

        <div className="border-b w-10 p-2" />

        <p className="pt-2 text-sm text-gray-500 flex-grow">
          {carData["car"]["carDescription"]}
        </p>

        <div className="flex my-2">
          <div className="flex m-2">
            <Image src={carDoor} width={30} height={30} alt="Car Seat" />
            <div className="text-lg ml-2 font-semibold lg:text-xl">
              {carData["car"]["numberOfDoor"]}
            </div>
          </div>
          <div className="flex m-2 ml-4">
            <Image src={seat} width={30} height={30} alt="Car Seat" />
            <div className="text-lg ml-2 font-semibold lg:text-xl">
              {carData["car"]["numberOfSeat"]}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-end pt-5">
          <div>
            <p className="text-md font-semibold pb-2 lg:text-lg">
              {"Total: " +
                totalDay * carData["reservationDetails"]["price"] +
                " €"}
            </p>
          </div>

          <div>
            <p className="text-lg font-semibold pb-2 lg:text-2xl">
              {carData["reservationDetails"]["price"] + " € / day"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarCards;
