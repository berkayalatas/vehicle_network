import Image from "next/image";
import {
  SearchIcon,
  GlobeAltIcon,
  MenuIcon,
  UsersIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";
import React, { useState } from "react";
import "react-date-range/dist/styles.css"; // main style file for date picker
import "react-date-range/dist/theme/default.css"; // theme css file date picker
import { DateRangePicker } from "react-date-range";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { useAuth } from "../../contexts/AuthContext";
import logo from "../../public/logo.jpg";

function Nav() {
  const [searchInput, setSearchInput] = React.useState("");
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [numberOfGuest, setNumberOfGuest] = React.useState(1);

  const router = useRouter();
  const { currentUser, logout } = useAuth();

  const handleDatePicker = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const resetSearchInput = () => {
    setSearchInput("");
  };

  const [active, setActive] = useState(false);

  const handleNavClick = () => {
    setActive(!active);
  };

  async function handleLogout() {
    try {
      await logout();
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  }
  const search = () => {
    if (searchInput.length > 2 && searchInput.charAt(0) != " ") {
      if (startDate && endDate >= new Date()) {
        if (
          searchInput.toLowerCase() === "london" ||
          searchInput.toLowerCase() === "berlin" ||
          searchInput.toLowerCase() === "vienna" ||
          searchInput.toLowerCase() === "paris" ||
          searchInput.toLowerCase() === "rome" ||
          searchInput.toLowerCase() === "amsterdam"
        ) {
          router.push({
            pathname: "/search",
            query: {
              location: searchInput,
              startDate: startDate.toISOString(),
              endDate: endDate.toISOString(),
              numberOfGuest: numberOfGuest,
            },
          });
        } else {
          router.push("/NotFound");
        }
      } else {
        alert("Date must be greater than today's date");
      }
    } else {
      alert("Please enter a valid city");
    }
  };

  const dateRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  return (
    <>
      <header
        className="sticky top-0 z-50 flex md:grid md:grid-cols-3 bg-white shadow-md 
      p-4 md:px-10 justify-between "
      >
        <div className="relative flex items-center h-7 md:h-12 my-auto">
          <Image
            src={logo}
            alt="logo"
            width={180}
            height={80}
            objectFit="contain"
            objectPosition="left"
            className="cursor-pointer"
            onClick={() => router.push("/")}
          />
        </div>

        <div
          className="flex items-center ml-2 sm:border-2 md:inline-flex 
                      rounded-full py-2 md:shadow-sm"
        >
          <input
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            type="text"
            className="flex-grow md:pl-5 ml-2 w-full border-2 py-1 sm:border-none rounded-full bg-transparent outline-none
                     text-gray-600 placeholder-gray-500"
            placeholder={"Seach City"}
          />
          <SearchIcon
            onClick={search}
            className="h-8 w-8 hidden lg:inline-flex bg-blue-400 text-white rounded-full p-2 cursor-pointer md:mx-2"
          />
        </div>
        <div className="flex items-center justify-end text-gray-500 space-x-4">
          <div
            onClick={() => {
              currentUser
                ? router.push("/auth/ListCar") // !TODO push to add a new car (became a host)
                : router.push("/auth/LoginPage");
            }}
          >
            <p className="hidden lg:inline cursor-pointer">Become a host</p>

            <GlobeAltIcon className="h-6 ml-2 mb-0.5 cursor-pointer hidden lg:inline" />
          </div>

          <div
            className={`flex items-center space-x-3 border-2 px-1 py-1.5 md:px-2 rounded-full cursor-pointer`}
            onClick={handleNavClick}
          >
            <MenuIcon className="h-5 w-5 lg:h-6 lg:w-6" />
            {currentUser ? (
              <div
                className="p-2 w-7 h-7 lg:w-9 lg:h-7 flex justify-center items-center 
                  rounded-full bg-gray-500 text-lg text-white uppercase"
              >
                {currentUser.displayName?.charAt(0) ||
                  currentUser.email?.charAt(0)}
              </div>
            ) : (
              <UserCircleIcon className="h-6 w-6 lg:h-7 lg:w-7 text-blue-400" />
            )}

            <div
              className={`${
                active ? "" : "hidden"
              } origin-top-right absolute right-5 top-16 w-44 rounded-md shadow-lg 
            bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
            >
              {currentUser ? (
                <div className="p-1">
                  <Link className="navItem" href="/auth/UserDashboard">
                    <div className="navItem flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      User Dashboard
                    </div>
                  </Link>

                  <Link href="/auth/ListCar">
                    <div className="navItem flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      List your car
                    </div>
                  </Link>

                  <Link href="/auth/MyCar">
                    <div className="navItem flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                        />
                      </svg>
                      My cars
                    </div>
                  </Link>
                  <Link href="/contact">
                    <div className="navItem flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <div className="ml-2">Contact</div>
                    </div>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-gray-700 block w-full text-sm hover:bg-gray-100"
                  >
                    <div className="navItem flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Log out
                    </div>
                  </button>
                </div>
              ) : (
                <div className="p-1">
                  <Link className="navItem" href="/auth/LoginPage">
                    <div className="navItem flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                        />
                      </svg>
                      <div className=" ml-2">Login</div>
                    </div>
                  </Link>

                  <Link href="/auth/SignUpPage">
                    <div className="navItem flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                        />
                      </svg>
                      <div className="ml-2">Sign up</div>
                    </div>
                  </Link>

                  <Link href="/contact">
                    <div className="navItem flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <div className="ml-2">Contact</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      <div className="flex justify-center align-middle">
        {searchInput && (
          <div className="flex flex-col col-span-3 mb-4">
            <DateRangePicker
              ranges={[dateRange]}
              minDate={new Date()}
              rangeColors={["#FD5B61"]}
              onChange={handleDatePicker}
              scroll={{ enabled: false }}
            />
            <div className="flex items-center border-b-20 lg:w-5/6 mb-2">
              <h2 className="text-lg sm:text-2xl ml-3 flex-grow font-semibold text-gray-800">
                {" "}
                Number of person
              </h2>
              <UsersIcon className="h-5 text-gray-800" />
              <input
                value={numberOfGuest}
                onChange={(e) => setNumberOfGuest(e.target.value)}
                type="number"
                min={1}
                max={10}
                className="w-12 pl-2 text-lg outline-none text-red-500"
              />
            </div>
            <div className="flex justify-center align-middle sm:w-4/5 ">
              <button
                onClick={resetSearchInput}
                className="flex-grow relative text-gray-500"
              >
                Cancel
              </button>
              <button className="flex-grow text-red-500" onClick={search}>
                Search
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Nav;
