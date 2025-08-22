import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const StoryCircle = ({ image, username, userId }) => {
  // const navigate = useNavigate();
  // const handleNavigate = () => {
  //   navigate(`story/${userId}`);
  // };
  const navigate = useNavigate();
  const [isViewed, setIsViewed] = useState(false);

  // 🔹 Check if story has been viewed (stored in localStorage)
  useEffect(() => {
    const viewedStories =
      JSON.parse(localStorage.getItem("viewedStories")) || [];
    setIsViewed(viewedStories.includes(userId));
  }, [userId]);

  const handleNavigate = () => {
    navigate(`story/${userId}`);

    // 🔹 Mark story as viewed in localStorage
    const viewedStories =
      JSON.parse(localStorage.getItem("viewedStories")) || [];
    if (!viewedStories.includes(userId)) {
      viewedStories.push(userId);
      localStorage.setItem("viewedStories", JSON.stringify(viewedStories));
    }

    setIsViewed(true); // 🔹 Update UI immediately
  };
  return (
    <div
      className="cursor-pointer flex flex-col items-center mr-4"
      onClick={handleNavigate}
    >
      <Avatar
        sx={{
          width: "5rem",
          height: "5rem",
          border: isViewed ? "none" : "3px solid red", // 🔴 Red border for unseen stories
        }}
        className="w-16 h-16 rounded-full"
        src={image}
        alt=""
      />
      <p>
        {username?.length > 9 ? username.substring(0, 9) + "..." : username}
      </p>
    </div>
  );
};

export default StoryCircle;
