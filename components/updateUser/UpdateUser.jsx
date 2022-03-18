import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import Link from "next/link";

function UpdateUser() {
  const { currentUser } = useAuth();
  return (
    <>
      <div className="m-2 p-2 align-middle text-center">
        <h3
          className="text-center font-semibold text-xl mt-2 text-gray-700 font-display xl:text-2xl
              xl:text-bold"
        >
          Welcome {currentUser.displayName || currentUser.email}{" "}
        </h3>
      </div>
      <div className="mt-7 flex flex-col justify-center items-center ">
        <div className=" flex flex-col sm:flex-row ">
          <div className="flex flex-col sm:mr-4">
            <div className="text-md sm:text-lg font-bold text-gray-600 tracking-wide">
              Username
            </div>
            <div className="flex flex-row">
              <div className="text-md mt-2 font-semibold text-gray-500">
                {currentUser.displayName || "Please add a username"}{" "}
              </div>
              <div className="ml-3 cursor-pointer">
                <Link href="/auth/UpdateProfile">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#e78514"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-6 sm:mt-0 sm:ml-4">
            <div className="text-md sm:text-lg font-bold text-gray-600 tracking-wide sm:text-center">
              Email Address
            </div>
            <div className="flex flex-row text-center">
              <div className="text-md mt-2 font-semibold text-gray-500">
                {currentUser.email}{" "}
              </div>
              <div className="ml-3 cursor-pointer">
                <Link href="/auth/UpdateProfile">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#e78514"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-3">
          <div className="mt-6 flex justify-center pb-5 text-sm font-display font-semibold text-gray-700 text-center">
            Do you want to update your profile ?{" "}
            <div className="cursor-pointer ml-3 text-blue-400 hover:text-blue-500">
              <Link href="/auth/UpdateProfile">Update</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateUser;
