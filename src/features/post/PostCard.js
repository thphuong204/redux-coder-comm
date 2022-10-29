import React from "react";
import {
  Box,
  Link,
  Card,
  Stack,
  Avatar,
  Typography,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  Modal
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { fDate } from "../../utils/formatTime";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import PostReaction from "./PostReaction";
import CommentForm from "../comment/CommentForm";
import CommentList from "../comment/CommentList";

import {useDispatch} from "react-redux";
import {deletePost} from "./postSlice";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import UpdatePost from "./UpdatePost";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "50%",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function PostCard({ post }) {

  const dispatch = useDispatch();
  const { user } = useAuth();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openShowMore = Boolean(anchorEl);
  const handleClickShowMore = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseShowMore = () => {
    setAnchorEl(null);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpenModal = () => {
    if (user._id === post.author._id) {
      setOpen(true)
    }

    if (user._id !== post.author._id) {
      toast.error("You can't change other people' posts");
    }
  };
  const handleCloseModal = () => setOpen(false);
  

  const handleDeletePost  = () => {
    if (user._id === post.author._id) {
      const postId = post._id;
      const userId = user._id;
      dispatch(deletePost(postId,userId))
    }
    if (user._id !== post.author._id) {
      toast.error("You can't delete other people' posts");
    }
  }

  return (
    <Card>
      <CardHeader
        disableTypography
        avatar={
          <Avatar src={post?.author?.avatarUrl} alt={post?.author?.name} />
        }
        title={
          <Link
            variant="subtitle2"
            color="text.primary"
            component={RouterLink}
            sx={{ fontWeight: 600 }}
            to={`/user/${post.author._id}`}
          >
            {post?.author?.name}
          </Link>
        }
        subheader={
          <Typography
            variant="caption"
            sx={{ display: "block", color: "text.secondary" }}
          >
            {fDate(post.createdAt)}
          </Typography>
        }
        action={
          <>
          <IconButton onClick={handleClickShowMore}>
            <MoreVertIcon sx={{ fontSize: 30 }} />
          </IconButton>

          <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={openShowMore}
          onClose={handleCloseShowMore}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          >
            <MenuItem onClick={()=> {
              handleDeletePost();
              handleCloseShowMore();
            }}
            >Delete Post
            </MenuItem>
            <MenuItem onClick={ (e)=> {
              console.log("post on Click edit post",post);
              handleOpenModal();
            }}
            >Edit Post
            </MenuItem>
              <Modal
              open={open}
              onClose={handleCloseModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <UpdatePost 
                post={post} 
                handleCloseModal={handleCloseModal} 
                handleCloseShowMore={handleCloseShowMore}
                />
              </Box>
            </Modal>
          </Menu>
          </>
        }
      />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography>{post.content}</Typography>

        {post.image && (
          <Box
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              height: 300,
              "& img": { objectFit: "cover", width: 1, height: 1 },
            }}
          >
            <img src={post.image} alt="post" />
          </Box>
        )}

        <PostReaction post={post} />
        <CommentList postId={post._id} />
        <CommentForm postId={post._id} />
      </Stack>
    </Card>
  );
}

export default PostCard;