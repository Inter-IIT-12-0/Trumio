"use client";

import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { getCookie, setCookie } from "cookies-next"
// components/GlassyCard.js
import { useRouter } from 'next/navigation'


import { useEffect, useState } from "react";

const OnBoarding = () => {
  const {data:session} = useSession()
  const router = useRouter()
  const [selectedCard, setSelectedCard] = useState(1);
  const handleCardClick = (cardNumber) => {
    setSelectedCard(cardNumber);
  };

  const handleCreateAccount = async () => {
    let role = (selectedCard === 1 ? 'Learner' : selectedCard === 2 ? 'Client': 'Third')
    if (role === 'Third') return router.push('/selectRole')
    setCookie("role", role);
    signIn('google')
  }

  useEffect(() => {
    if (session) {
      if(getCookie('loggedIn') === "true" && getCookie('newUser') === "false") {
        if (session.user.role === 'Learner') {
          return router.push('/upskillingPage')
        }
        else {
          return router.push('/')
        }
      }
      const isNewUser = getCookie("newUser")
      const role = getCookie("role")
      if (isNewUser === "false" ) {
        if (session.user.role === 'Learner') {
          return router.push('/upskillingPage')
        }
        else {
          return router.push('/')
        }
      }
      else if (isNewUser === "true") {
        if (role === 'Third') return router.push("/selectRole")
        router.push("/selectDomains")
      }
    }
  }, [session])

  return (
    <div className="bg-cover bg-center h-screen" style={{"backgroundImage": "url('./Rectangle.png')"}}>
    <div className="flex justify-center items-center w-100 ">
      <div className="glass-card bg-white bg-opacity-80 rounded-md p-8 shadow-lg mt-20">
        <h1 className="text-2xl font-medium leading-normal text-black-600 font-helvetica-neue text-center mb-12">
          You are Joining in as
        </h1>
        <div className="flex space-x-4">
          {/* Subcard 1 */}
          <label
            className={`flex-1 cursor-pointer relative p-4 m-2 rounded-lg hover:shadow-md w-64  transition ${
              selectedCard === 1 ? "border-2 border-blue-500" : ""
            }`}
            onClick={() => handleCardClick(1)}
          >
            <div className="flex">
              <img src="/Learner.svg" className="mr-6"></img>
              <input
                type="radio"
                name="subcard"
                className="mb-28 w-6 h-6"
                checked={selectedCard === 1}
                readOnly
              />
            </div>
            <h1 className="text-2xl font-medium leading-normal text-black font-helvetica-neue mb-6">
              Learner, here to upskill myself
            </h1>
          </label>

          {/* Subcard 2 */}
          <label
            className={`flex-1 cursor-pointer relative p-4 m-2 rounded-lg hover:shadow-md w-64  transition ${
              selectedCard === 2 ? "border-2 border-blue-500" : ""
            }`}
            onClick={() => handleCardClick(2)}
          >
            <div className="flex">
              <img src="/24.png"></img>
              <input
                type="radio"
                name="subcard"
                className="mb-28 w-6 h-6"
                checked={selectedCard === 2}
                readOnly
              />
            </div>
            <h1 className="text-2xl font-medium leading-normal text-black font-helvetica-neue">
              Industry, scouting talent for a project
            </h1>
          </label>

          {/* Subcard 3 */}
          <label
            className={`flex-1 cursor-pointer relative p-4 m-2 rounded-lg hover:shadow-md w-64 mr-16 transition ${
              selectedCard === 3 ? "border-2 border-blue-500" : ""
            }`}
            onClick={() => handleCardClick(3)}
          >
            <div className="flex">
              <img src="/young.png" className="mr-6"></img>
              <input
                type="radio"
                name="subcard"
                className="mb-28 w-6 h-6" // Adjust the size as needed
                checked={selectedCard === 3}
                readOnly
              />
            </div>
            <h1 className="text-2xl font-medium leading-normal text-black font-helvetica-neue">
              University, willing to work
            </h1>
          </label>
        </div>
        <div className="flex flex-col justify-center items-center p-4">
        <button className="w-44 bg-gradient-to-br from-blue-500 via-blue-500 to-aqua-700 text-white py-2 px-4 rounded shadow-md hover:shadow-lg focus:outline-none focus:ring focus:border-blue-300 transition-all duration-300 mb-4" onClick={handleCreateAccount}>
          Create Account
        </button>
        <div className="flex ">
          <h1 className="text-base font-normal text-black font-inter">
            Already have an account  ?
            <span className="text-blue-600 font-semibold p-2 cursor-pointer" onClick={handleCreateAccount}>Log In</span>
          </h1>
        </div>
      </div>
      </div>
    </div>
    </div>
  );
};

export default OnBoarding;
