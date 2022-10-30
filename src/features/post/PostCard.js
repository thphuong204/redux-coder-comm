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
  border: 'none',
  boxShadow: 24,
  p: 4,
};

function PostCard({ post }) {

  const dispatch = useDispatch();
  const { user } = useAuth();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openShowMore = Boolean(anchorEl);
  const handleClickShowMore = (event) => {
    if (user._id !== post.author._id) {
      toast.error("You can't change other people' posts");
    }
    if (user._id === post.author._id) {
      setAnchorEl(event.currentTarget);
    }
    
  };
  const handleCloseShowMore = () => {
    setAnchorEl(null);
  };

  const [openModalEdit, setOpenModalEdit] = React.useState(false);
  const handleOpenModalEditPost = () => {
    if (user._id === post.author._id) {
      setOpenModalEdit(true)
    }
    if (user._id !== post.author._id) {
      toast.error("You can't change other people' posts");
    }
  };
  const handleCloseModalEditPost = () => setOpenModalEdit(false);
  

  const [openModalDelete, setOpenModalDelete] = React.useState(false);
  const handleOpenModalDelete = () => setOpenModalDelete(true);
  const handleCloseModalDelete = () => setOpenModalDelete(false);


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
            <MenuItem onClick={ (e)=> {
              handleOpenModalDelete();
            }}
            >Delete Post
            </MenuItem>
            <Modal
              open={openModalDelete}
              onClose={handleCloseModalDelete}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
               <Box sx={style}>
                      <Typography id="modal-modal-description">
                        Are you sure to delete this post?
                      </Typography>
                      <Stack direction="row" justifyContent="center">
                      <IconButton size="small" onClick ={() => 
                        { handleDeletePost();
                          handleCloseShowMore();
                        }
                      }
                      >
                          Yes
                      </IconButton>
                      <IconButton size="small" onClick ={() => handleCloseModalDelete()}>No</IconButton>
                      </Stack>
                </Box>
            </Modal>

            <MenuItem onClick={ (e)=> {
              handleOpenModalEditPost();
            }}
            >Edit Post
            </MenuItem>
              <Modal
              open={openModalEdit}
              onClose={handleCloseModalEditPost}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <UpdatePost 
                post={post} 
                handleCloseModalEditPost={handleCloseModalEditPost} 
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