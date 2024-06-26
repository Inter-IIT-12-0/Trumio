"use client"
import React from "react";

const RightCard = () => {
  return (
    <div className="flex w-3/4 xl:max-w-md h-32 mx-auto bg-white shadow-md rounded-2xl overflow-hidden ">
      {/* Left side with text */}
      <div className="p-4 flex-1">
        <h2 className="text-xl font-semibold mb-2">Rewards & Badges</h2>
        <p className="text-gray-500 font-helvetica text-sm font-light leading-normal tracking-tight">
        Collect Badges and Reward as you complete the challenges.
        </p>
        <p className="text-blue-700 font-helvetica-neue text-base font-bold leading-normal tracking-tighter mu-12">
        View Rewards →
        </p>
      </div>
      {/* Right side with SVG or image */}
      <div className="w-35%">
        {/* Use your SVG or image here */}
        <img
          src="/Reward.svg"
          alt="Your Image"
          className="scale-75 object-cover"
        />
      </div>
    </div>
  );
};

export default RightCard;
