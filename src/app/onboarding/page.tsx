"use client";

// components/GlassyCard.js

import { useState } from "react";

const OnBoarding = () => {
  const [selectedCard, setSelectedCard] = useState<number>(1);
  const handleCardClick = (cardNumber) => {
    setSelectedCard(cardNumber);
  };

  return (
    <div className="flex justify-center items-center w-100">
      <div className="glass-card bg-white bg-opacity-80 rounded-md p-8 shadow-lg">
        <h1 className="text-2xl font-medium leading-normal text-black-600 font-helvetica-neue text-center mb-12">
          You are Joining in as
        </h1>
        <div className="flex space-x-4">
          {/* Subcard 1 */}
          <label
            className={`flex-1 cursor-pointer relative p-4 m-2 rounded-lg hover:shadow-md w-30  transition ${
              selectedCard === 1 ? "border-2 border-blue-500" : ""
            }`}
            onClick={() => handleCardClick(1)}
          >
            <div className="flex">
              <img src="/Learner.svg" className="mr-6"></img>
              <input
                type="radio"
                name="subcard"
                className="mb-28 w-6 h-6" // Adjust the size as needed
                checked={selectedCard === 1}
                readOnly
              />
            </div>
            <h1 className="text-2xl font-medium leading-normal text-blue-600 font-helvetica-neue mb-6">
              Your Heading Text
            </h1>
          </label>

          {/* Subcard 2 */}
          <label
            className={`flex-1 cursor-pointer relative p-4 m-2 rounded-lg hover:shadow-md w-30  transition ${
              selectedCard === 2 ? "border-2 border-blue-500" : ""
            }`}
            onClick={() => handleCardClick(2)}
          >
            <div className="flex">
              <img src="/Learner.svg" className="mr-6"></img>
              <input
                type="radio"
                name="subcard"
                className="mb-28 w-6 h-6" // Adjust the size as needed
                checked={selectedCard === 2}
                readOnly
              />
            </div>
            <h1 className="text-2xl font-medium leading-normal text-blue-600 font-helvetica-neue">
              Your Heading Text
            </h1>
          </label>

          {/* Subcard 3 */}
          <label
            className={`flex-1 cursor-pointer relative p-4 m-2 rounded-lg hover:shadow-md w-30 mr-16 transition ${
              selectedCard === 3 ? "border-2 border-blue-500" : ""
            }`}
            onClick={() => handleCardClick(3)}
          >
            <div className="flex">
              <img src="/Learner.svg" className="mr-6"></img>
              <input
                type="radio"
                name="subcard"
                className="mb-28 w-6 h-6" // Adjust the size as needed
                checked={selectedCard === 3}
                readOnly
              />
            </div>
            <h1 className="text-2xl font-medium leading-normal text-blue-600 font-helvetica-neue">
              Your Heading Text
            </h1>
          </label>
        </div>
        <div className="flex flex-col justify-center items-center p-4">
        <button className="w-44 bg-gradient-to-br from-blue-500 via-blue-400 to-aqua-500 text-white py-2 px-4 rounded shadow-md hover:shadow-lg focus:outline-none focus:ring focus:border-blue-300 transition-all duration-300 mb-4">
          Click me
        </button>
        <div className="flex ">
          <h1 className="text-base font-normal text-black font-inter">
            Already have an account  ?
            <span className="text-blue-600 font-semibold p-2">Log In</span>
          </h1>
        </div>
      </div>
      </div>
    </div>
  );
};

export default OnBoarding;
