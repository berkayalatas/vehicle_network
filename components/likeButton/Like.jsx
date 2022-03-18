import React, { useState } from "react";
import style from "../../styles/LikeBtn.module.css";

function Like({ active, setActive, carID, carImg, brand, model, description, price, city }) {
 
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
    
    console.log(cars)
    localStorage.setItem("likedCars" ,JSON.stringify(cars))
}

  const removeFromLocalStorage = (carID) =>{
    const likedCars = JSON.parse(localStorage.getItem("likedCars"))
    
    const filteredCars = likedCars.filter((car)=> car.carID != carID);
    localStorage.setItem("likedCars" ,JSON.stringify(filteredCars))

  }

 console.log(active);
  return (
    <button
      className={active ? `${style.liked} ${style.likeBtn}` : style.likeBtn}
      onClick={toggleClass}
    ></button>
  );
}

export default Like;
