import React, { useState } from "react";
import style from "../../styles/LikeBtn.module.css";
import { toast } from 'react-toastify';
 
function Like({ active, setActive, carID, carImg, brand, model, description, price, city }) {

  const notifySuccess = () => toast.success(' Car added to liked cars!', {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  const notifyWarning = () => toast.info('Removed from liked cars!', {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  const toggleClass = () => {
    setActive(!active);
    active ? removeFromLocalStorage(carID) : addItemToStorage(active, carID, carImg, brand, model, description, price, city);     
  };

  function addItemToStorage(active, carID, carImg, brand, model, description, price , city){
    var cars = JSON.parse(localStorage.getItem("likedCars")||"[]"); // get current objects
    var carData = {
      carID : carID,
      active:true, 
      carImg :carImg,
      brand : brand,
      model : model,
      description : description, 
      city:city,
      price: price
    };
    cars.push(carData); //push new one
    
    localStorage.setItem("likedCars" ,JSON.stringify(cars))
    notifySuccess();
}

  const removeFromLocalStorage = (carID) =>{
    const likedCars = JSON.parse(localStorage.getItem("likedCars"))
    
    const filteredCars = likedCars.filter((car)=> car.carID != carID);
    localStorage.setItem("likedCars" ,JSON.stringify(filteredCars))
    notifyWarning();
  }

  return (
    <>    
    <button
      className={active ? `${style.liked} ${style.likeBtn}` : style.likeBtn}
      onClick={toggleClass}
    ></button>

    </>
  );
}

export default Like;
