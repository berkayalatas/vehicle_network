import React, { useContext, createContext, useState, useEffect } from "react";
import { auth } from "../firebase_config";
import { db } from "../firebase_config";
import { useRouter } from "next/dist/client/router";
import {
  writeBatch,
  doc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";

const CarContext = createContext("");

export function useCar() {
  return useContext(CarContext);
}

export function CarProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData(setAllCars) {
    const querySnapshot = await getDocs(collection(db, "cars"));
    var allData = [];
    querySnapshot.forEach((doc) => {
      allData.push(doc.data());
    });
    setAllCars(allData);
    setIsLoading(false);
  }

 
  /* send data (variable or function) here  */
  const values = { fetchData };

  return (
    <CarContext.Provider value={values}>
      {children}
    </CarContext.Provider>
  );
}
