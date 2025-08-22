import React, { useEffect, useState } from "react";
import styled from "styled-components";
import StoryProgressBar from "./StoryProgress";
import EmojiPicker from "emoji-picker-react";
//import EmojiPicker from "@emoji-mart/react";

const StoryViewerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.9);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const StoryContent = styled.div`
  max-height: 70vh;
  max-width: 40vw;
  object-fit: contain;
  border-radius: 10px;
`;

const InputContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.2);
  padding: 8px 12px;
  border-radius: 30px;
`;

const TextInput = styled.input`
  width: 250px;
  padding: 10px;
  border-radius: 30px;
  border: none;
  font-size: 14px;
  outline: none;
  background: white;
`;

const EmojiButton = styled.button`
  margin-left: 8px;
  font-size: 20px;
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
`;

const EmojiPickerWrapper = styled.div`
  position: absolute;
  bottom: 50px;
  left: -20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`;

const LikeButton = styled.button`
  margin-left: 8px;
  font-size: 20px;
  background: none;
  border: none;
  cursor: pointer;
`;

const allStories = [
  {
    type: "image",
    url: "https://cdn.pixabay.com/photo/2016/11/14/04/45/elephant-1822636_1280.jpg",
    username: "User 1",
  },
  {
    type: "video",
    url: "https://cdn.pixabay.com/video/2024/08/30/228847_tiny.mp4",
    username: "User 2",
  },
  {
    type: "image",
    url: "https://cdn.pixabay.com/photo/2021/08/02/16/22/beach-6517214_1280.jpg",
    username: "User 3",
  },
  {
    type: "video",
    url: "https://cdn.pixabay.com/video/2018/02/09/14205-255658030_large.mp4",
    username: "User 4",
  },
  {
    type: "image",
    url: "https://cdn.pixabay.com/photo/2018/08/12/16/59/parrot-3601194_1280.jpg",
    username: "User 5",
  },
  {
    type: "video",
    url: "https://cdn.pixabay.com/video/2023/04/21/159948-820010982_tiny.mp4",
    username: "User 6",
  },
  {
    type: "image",
    url: "https://cdn.pixabay.com/photo/2023/05/23/14/38/mountain-8012898_1280.jpg",
    username: "User 7",
  },
  {
    type: "image",
    url: "https://cdn.pixabay.com/photo/2023/11/16/15/17/sea-8392560_1280.jpg",
    username: "User 8",
  },
  {
    type: "video",
    url: "https://cdn.pixabay.com/video/2023/10/15/185096-874643413_tiny.mp4",
    username: "User 9",
  },
  {
    type: "image",
    url: "https://cdn.pixabay.com/photo/2014/11/30/19/47/lightning-552038_1280.jpg",
    username: "User 10",
  },
  {
    type: "image",
    url: "https://cdn.pixabay.com/photo/2024/05/18/11/02/egypt-8770081_1280.png",
    username: "User 11",
  },
  {
    type: "video",
    url: "https://cdn.pixabay.com/video/2022/03/18/111204-689949818_tiny.mp4",
    username: "User 12",
  },
  {
    type: "image",
    url: "https://cdn.pixabay.com/photo/2022/07/30/03/13/eibsee-7352987_1280.jpg",
    username: "User 13",
  },
  {
    type: "image",
    url: "https://cdn.pixabay.com/photo/2013/06/07/06/51/tree-117582_1280.jpg",
    username: "User 14",
  },
  {
    type: "video",
    url: "https://cdn.pixabay.com/video/2018/09/25/18420-292228405_tiny.mp4",
    username: "User 15",
  },
  {
    type: "image",
    url: "https://cdn.pixabay.com/photo/2023/07/10/06/13/mountain-8117525_1280.jpg",
    username: "User 16",
  },
  {
    type: "image",
    url: "https://cdn.pixabay.com/photo/2022/12/21/16/07/snow-7670491_1280.jpg",
    username: "User 17",
  },
  {
    type: "video",
    url: "https://cdn.pixabay.com/video/2023/11/28/191159-889246512_tiny.mp4",
    username: "User 18",
  },
  {
    type: "image",
    url: "https://cdn.pixabay.com/photo/2018/07/23/06/10/man-3556090_1280.jpg",
    username: "User 19",
  },
  {
    type: "image",
    url: "https://cdn.pixabay.com/photo/2020/09/02/20/52/dock-5539524_1280.jpg",
    username: "User 20",
  },
];

const getRandomStories = () => {
  return allStories.sort(() => 0.5 - Math.random()).slice(0, 4);
};

function StoryViewer({ stories = [], onClose = () => {} }) {
  const [storyList] = useState(
    stories.length > 0 ? stories : getRandomStories()
  );
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [text, setText] = useState("");
  const [liked, setLiked] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleNextStory = () => {
    if (currentStoryIndex < storyList.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
      setActiveIndex(activeIndex + 1);
    } else {
      window.location.href = "http://localhost:3000/";
    }
  };

  useEffect(() => {
    let intervalId;
    const currentStory = storyList[currentStoryIndex];

    if (currentStory.type === "video") {
      const videoElement = document.getElementById("story-video");
      if (videoElement) {
        videoElement.muted = true;
        videoElement
          .play()
          .catch((error) => console.error("Autoplay failed:", error));
        videoElement.onended = handleNextStory;
      }
    } else {
      intervalId = setTimeout(handleNextStory, 5000);
    }

    return () => clearTimeout(intervalId);
  }, [currentStoryIndex]);

  return (
    <StoryViewerContainer>
      {storyList[currentStoryIndex].type === "video" ? (
        <StoryContent
          as="video"
          id="story-video"
          src={storyList[currentStoryIndex].url}
          autoPlay
          playsInline
          onLoadedMetadata={(e) => e.target.play()}
        />
      ) : (
        <StoryContent
          as="img"
          src={storyList[currentStoryIndex].url}
          alt="story image"
        />
      )}

      <div className="absolute top-5 w-full flex justify-center">
        {storyList.map((story, index) => (
          <StoryProgressBar
            key={index}
            duration={5000}
            index={index}
            activeIndex={activeIndex}
          />
        ))}
      </div>

      {/* Input, Emoji, and Like Button */}
      <InputContainer>
        <TextInput
          type="text"
          placeholder="Reply..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && setText("")} // Reset input on Enter
        />

        <EmojiButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
          😊
        </EmojiButton>

        {showEmojiPicker && (
          <EmojiPickerWrapper>
            <EmojiPicker
              onEmojiClick={(emojiData) => setText(text + emojiData.emoji)}
            />
          </EmojiPickerWrapper>
        )}

        <LikeButton onClick={() => setLiked(!liked)}>
          {liked ? "❤️" : "🤍"}
        </LikeButton>
      </InputContainer>
    </StoryViewerContainer>
  );
}

export default StoryViewer;
