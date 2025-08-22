import React, { useState } from "react";
import PopularUserCard from "./PopularUserCard";
import { Avatar, Card, CardHeader, IconButton } from "@mui/material";
import { red } from "@mui/material/colors";
import SearchUser from "../SearchUser/SearchUser";
import { useNavigate } from "react-router-dom";

const popularUser = [
  {
    id: 1,
    username: "Dhruv Patel",
    userImage:
      "https://cdn.pixabay.com/photo/2015/07/08/07/41/person-835453_1280.jpg",
    description: "Follows you",
  },
  {
    id: 2,
    username: "Ramm Patel",
    userImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNCvpKHYprE3kRWQQOC9xEiFKHJ03vuNpnLg&s",
    description: "Follows you",
  },
  {
    id: 3,
    username: "Shiddhi Sharma",
    userImage:
      "https://cdn.pixabay.com/photo/2016/11/21/11/17/model-1844729_640.jpg",
    description: "Suggested for you",
  },
  {
    id: 4,
    username: "Neha Verma",
    userImage:
      "https://cdn.pixabay.com/photo/2021/03/14/10/13/girl-6093779_1280.jpg",
    description: "Follows you",
  },
  {
    id: 5,
    username: "Kunal Mehta",
    userImage:
      "https://cdn.pixabay.com/photo/2016/11/29/05/11/adult-1867471_1280.jpg",
    description: "Suggested for you",
  },
  {
    id: 6,
    username: "Pooja Shah",
    userImage:
      "https://cdn.pixabay.com/photo/2016/06/06/17/05/woman-1439909_1280.jpg",
    description: "Follows you",
  },

  {
    id: 7,
    username: "Arya Patel",
    userImage:
      "https://cdn.pixabay.com/photo/2023/09/26/17/32/woman-8277925_1280.jpg",
    description: "Follows you",
  },
  {
    id: 8,
    username: "Raju Patel",
    userImage:
      "https://cdn.pixabay.com/photo/2016/11/29/09/38/adult-1868750_1280.jpg",
    description: "Suggested for you",
  },
  {
    id: 9,
    username: "Shiddhi Sharma",
    userImage:
      "https://cdn.pixabay.com/photo/2019/11/06/05/57/woman-4605248_1280.jpg",
    description: "Follows you",
  },
  {
    id: 10,
    username: "Akay Patel",
    userImage:
      "https://cdn.pixabay.com/photo/2022/12/24/21/14/portrait-7676482_1280.jpg",
    description: "Follows you",
  },
  {
    id: 11,
    username: "Devansh Patel",
    userImage:
      "https://cdn.pixabay.com/photo/2017/01/11/00/30/man-1970609_1280.jpg",
    description: "Suggested for you",
  },
  {
    id: 12,
    username: "Rohit Sharma",
    userImage:
      "https://cdn.pixabay.com/photo/2021/05/10/14/15/corset-6243486_1280.jpg",
    description: "Follows you",
  },
  {
    id: 13,
    username: "Roy Patel",
    userImage:
      "https://cdn.pixabay.com/photo/2019/03/19/15/03/fantasy-4065924_1280.jpg",
    description: "Suggested for you",
  },
  {
    id: 14,
    username: "Om Sharma",
    userImage:
      "https://cdn.pixabay.com/photo/2019/04/12/21/19/man-4123268_1280.jpg",
    description: "Follows you",
  },
  {
    id: 15,
    username: "Dhulo Patel",
    userImage:
      "https://cdn.pixabay.com/photo/2015/06/01/00/20/man-792821_1280.jpg",
    description: "Follows you",
  },
  {
    id: 16,
    username: "Akay Patel",
    userImage:
      "https://cdn.pixabay.com/photo/2022/12/24/21/14/portrait-7676482_1280.jpg",
    description: "Follows you",
  },
  {
    id: 17,
    username: "Devansh Patel",
    userImage:
      "https://cdn.pixabay.com/photo/2017/01/11/00/30/man-1970609_1280.jpg",
    description: "Suggested for you",
  },
  {
    id: 18,
    username: "Rohit Sharma",
    userImage:
      "https://cdn.pixabay.com/photo/2021/05/10/14/15/corset-6243486_1280.jpg",
    description: "Follows you",
  },
  {
    id: 19,
    username: "Roy Patel",
    userImage:
      "https://cdn.pixabay.com/photo/2019/03/19/15/03/fantasy-4065924_1280.jpg",
    description: "Suggested for you",
  },
  {
    id: 20,
    username: "Om Sharma",
    userImage:
      "https://cdn.pixabay.com/photo/2019/04/12/21/19/man-4123268_1280.jpg",
    description: "Follows you",
  },
  {
    id: 21,
    username: "Dhulo Patel",
    userImage:
      "https://cdn.pixabay.com/photo/2015/06/01/00/20/man-792821_1280.jpg",
    description: "Follows you",
  },
];
const HomeRight = () => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);

  const handleUserClick = (userId) => {
    navigate(`/profile/${userId}`);
  };
  return (
    <div className="pr-5">
      <SearchUser handleClick={handleUserClick} />
      <div className="card p-5">
        <div className="flex justify-between py-5 items-center">
          <p className="font-semibold opacity-70">Suggestions for you</p>
          <p
            className="text-xs font-semibold opacity-95 cursor-pointer transition-all hover:text-blue-500"
            onClick={() => setShowAll(!showAll)} // ✅ Toggle scrolling effect
          >
            View All
          </p>
          {/* <p className="text-xs font-semibold opacity-95">View All</p> */}
        </div>

        {/* <div className="space-y-5"> */}
        <div
          className={`transition-all duration-500 space-y-5 ${
            showAll
              ? "max-h-[400px] overflow-y-auto"
              : "max-h-[200px] overflow-hidden"
          } custom-scrollbar`}
          style={{
            scrollbarWidth: "none", // ✅ Hide scrollbar in Firefox
            msOverflowStyle: "none", // ✅ Hide scrollbar in IE & Edge
          }}
        >
          {popularUser.map((item, index) => (
            <PopularUserCard
              key={item.id} // ✅ ADD unique key for each item (id ઉમેર્યું)
              image={item.userImage} // ✅ ADD dynamic user image (image ની value dynamic કરી)
              username={item.username} // ✅ ADD dynamic username (username dynamic pass કર્યો)
              description={item.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeRight;
