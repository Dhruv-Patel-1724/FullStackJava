import { Avatar } from "@mui/material";
import React, { useState } from "react";

const PopularUserCard = ({ image, username, description }) => {
  const [followStatus, setFollowStatus] = useState("Follow");

  // ✅ Function to handle follow button click
  const handleFollowClick = () => {
    if (followStatus === "Follow") {
      setFollowStatus(
        description === "Suggested for you" ? "Requested" : "Following"
      );
    } else {
      setFollowStatus("Follow"); // ✅ Clicking again reverts back to "Follow"
    }
  };
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <Avatar
          sx={{ bgcolor: "#212534", color: "rgb(88,199,250)" }}
          className="w-9 h-9 rounded-full"
          src={image}
          alt=""
        />
        <div className="ml-2">
          <p className="text-sm font-semibold">{username}</p>
          <p className="text-sm font-semibold opacity-70">{description}</p>
        </div>
      </div>
      {/* <p className="text-blue-700 text-sm font-semibold">Follow</p> */}
      <button
        onClick={handleFollowClick}
        className={`px-4 py-1 text-sm font-semibold rounded-full transition-all duration-300 
          ${
            followStatus === "Follow"
              ? "bg-blue-500 hover:bg-blue-600 text-white" // ✅ Default "Follow" state
              : "bg-gray-400 text-white" // ✅ Disabled style for "Following" or "Requested"
          }`}
      >
        {/* ✅ Dynamic button text */}
        {followStatus}
      </button>
    </div>
  );
};

export default PopularUserCard;
