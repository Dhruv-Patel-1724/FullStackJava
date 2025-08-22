import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { pink, red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useDispatch } from "react-redux";
import { createComment, likeComment } from "../../Redux/Comment/comment.action";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Divider, Menu, MenuItem } from "@mui/material";
import { likePost, savePost, deletePost } from "../../Redux/Post/post.action";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import moment from "moment";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Snackbar,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export default function PostCard({ item }) {
  const postTimeAgo = moment(item?.createdAt).fromNow();
  const [showComment, setShowComment] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [showSharePopup, setShowSharePopup] = React.useState(false); // ✅ Share popup state
  const [copySuccess, setCopySuccess] = React.useState(false);
  const dispatch = useDispatch();
  const [commentContent, setCommentContent] = React.useState("");

  const postUrl = window.location.href;

  const handleCreateComment = (content) => {
    if (content.trim()) {
      dispatch(createComment({ postId: item?.id, data: { content } }));
      setCommentContent(""); // Clear input after submission
    }
  };

  const handlePostLike = () => {
    dispatch(likePost(item?.id));
  };

  const handleSavePost = () => {
    dispatch(savePost(item?.id));
  };
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // ✅ Function to close the menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // ✅ Function to handle post deletion
  const handleDeletePost = () => {
    dispatch(deletePost(item?.id)); // Calls the delete action
    handleMenuClose();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(postUrl);
    setCopySuccess(true);
  };

  return (
    <div className="card" sx={{ w: "100%" }}>
      <CardHeader
        className=""
        avatar={
          <Avatar
            sx={{ bgcolor: "#212534", color: "rgb(88,199,250)" }}
            aria-label="recipe"
          >
            {item?.user?.firstName[0]}
          </Avatar>
        }
        action={
          <>
            {/* ✅ Three-dot button to open the popup menu */}
            <IconButton
              color="primary"
              aria-label="settings"
              onClick={handleMenuOpen}
            >
              <MoreVertIcon />
            </IconButton>

            {/* ✅ Popup menu for additional actions */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleDeletePost}>Delete Post</MenuItem>{" "}
              {/* ✅ New Delete Post option */}
            </Menu>
          </>
        }
        //   title={item?.user?.firstName + " " + item?.user?.lastName}
        //   subheader={
        //     "@" +
        //     item?.user?.firstName.toLowerCase() +
        //     "_" +
        //     item?.user?.lastName.toLowerCase()
        //   }
        // />
        title={
          <div className="flex items-center">
            <span>{item?.user?.firstName + " " + item?.user?.lastName}</span>
            <span className="text-gray-400 ml-3 text-sm">
              {postTimeAgo}
            </span>{" "}
            {/* ✅ Time Added */}
          </div>
        }
        subheader={
          "@" +
          item?.user?.firstName.toLowerCase() +
          "_" +
          item?.user?.lastName.toLowerCase()
        }
      />
      {/* {item.image && <CardMedia
        component="img"
        height="194"
        image={item?.image}
        alt={item.caption}
      />} */}

      {/* {item?.video && (
        <video controls width="100%">
          <source src={item.video} type="video/mp4" />
          <source src={item.video} type="video/webm" />
          Your browser does not support the video tag.
        </video>
      )} */}

      {item.video ? (
        <CardMedia
          component="video"
          controls
          loop
          autoPlay
          muted
          //controlsList="nodownload"
          //controlsList="nofullscreen"
          height="194"
          // style={{ height: "500px" }}
          src={item.video}
          alt={item.caption}
        />
      ) : (
        item.image && (
          <CardMedia
            component="img"
            //height="50"
            //style={{ height: "500px" }}
            image={item.image}
            alt={item.caption}
          />
        )
      )}

      <CardContent>
        <Typography variant="body2" color="primary">
          {item?.caption}
        </Typography>
      </CardContent>
      <CardActions className="flex justify-between" disableSpacing>
        <div>
          <IconButton
            color="primary"
            onClick={handlePostLike}
            aria-label="add to favorites"
          >
            {item?.likedByRequser ? (
              <FavoriteIcon sx={{ color: pink[500] }} />
            ) : (
              <FavoriteBorderIcon />
            )}

            <Typography variant="body2" sx={{ marginLeft: 0.5 }}>
              {item?.liked?.length || 0} {/* If no comments, show 0 */}
            </Typography>
          </IconButton>

          <IconButton color="primary" onClick={() => setShowSharePopup(true)}>
            <ShareIcon />
          </IconButton>

          <IconButton
            color="primary"
            onClick={() => setShowComment(!showComment)}
          >
            <ChatBubbleOutlineIcon />

            <Typography variant="body2" sx={{ marginLeft: 0.5 }}>
              {item?.comments?.length || 0} {/* If no comments, show 0 */}
            </Typography>
          </IconButton>
        </div>
        <div>
          <IconButton color="primary" onClick={handleSavePost}>
            {item?.savedByRequser ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </IconButton>
        </div>
      </CardActions>

      {showComment && (
        <section>
          <div className="flex items-center space-x-5 mx-3 my-5">
            <Avatar sx={{ bgcolor: "#212534", color: "rgb(88,199,250)" }} />
            <input
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              onKeyPress={(e) => {
                console.log("e", e.target.value);
                if (e.key === "Enter") {
                  console.log("--------");
                  handleCreateComment(e.target.value);
                }
              }}
              className="w-full outline-none bg-transparent border border-[#3b4054] rounded-full px-5 py-2"
              type="text"
              placeholder="write your comment..."
            />
          </div>
          <Divider />
          <div className="mx-3 space-y-2 my-5 text-xs">
            {item?.comments.map((comment) => (
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-5">
                  <Avatar
                    sx={{
                      height: "2rem",
                      width: "2rem",
                      fontSize: ".8rem",
                      bgcolor: "#212534",
                      color: "rgb(88,199,250)",
                    }}
                  >
                    {comment.user.firstName[0]}
                  </Avatar>
                  <p>{comment.content}</p>
                </div>
                <div>
                  <IconButton color="primary">
                    <FavoriteBorderIcon sx={{ fontSize: "1rem" }} />
                  </IconButton>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <Dialog open={showSharePopup} onClose={() => setShowSharePopup(false)}>
        <DialogTitle>Share this Post</DialogTitle>
        <DialogContent>
          <p>Copy the link or share on social media:</p>
          <div className="flex gap-3 mt-3">
            <IconButton
              color="primary"
              component="a"
              href={`https://www.facebook.com/sharer/sharer.php?u=${postUrl}`}
              target="_blank"
            >
              <FacebookIcon />
            </IconButton>

            <IconButton
              color="primary"
              component="a"
              href={`https://twitter.com/intent/tweet?url=${postUrl}`}
              target="_blank"
            >
              <TwitterIcon />
            </IconButton>

            <IconButton
              color="primary"
              component="a"
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${postUrl}`}
              target="_blank"
            >
              <LinkedInIcon />
            </IconButton>

            {/* ✅ WhatsApp Web Open Thase */}
            <IconButton
              color="primary"
              component="a"
              href={`https://web.whatsapp.com/send?text=${encodeURIComponent(
                postUrl
              )}`}
              target="_blank"
            >
              <WhatsAppIcon />
            </IconButton>

            {/* ✅ Copy Link with Notification */}
            <IconButton color="primary" onClick={handleCopyLink}>
              <ContentCopyIcon />
            </IconButton>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSharePopup(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* ✅ Snackbar for Copy Success */}
      <Snackbar
        open={copySuccess}
        autoHideDuration={2000}
        onClose={() => setCopySuccess(false)}
        message="Successfully Copied!"
      />
    </div>
  );
}
