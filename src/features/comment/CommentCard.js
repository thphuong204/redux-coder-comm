import React from "react";
import { Avatar, Box, Paper, Stack, Typography,IconButton,Modal } from "@mui/material";
import { fDate } from "../../utils/formatTime";
import CommentReaction from "./CommentReaction";
import ClearIcon from '@mui/icons-material/Clear';
import useAuth from "../../hooks/useAuth";
import {useDispatch} from "react-redux";
import {deleteComment} from "./commentSlice";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 250,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 4,
};

function CommentCard({ comment,postId }) {

  const { user } = useAuth();
  const dispatch = useDispatch();
  const commentId= comment._id;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDeleteComment = ({postId,commentId}) => {
    dispatch(deleteComment({postId,commentId}));
  }

  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt={comment.author?.name} src={comment.author?.avatarUrl} />
      <Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: "background.neutral" }}>
          
        <Stack
          direction="row"
          alignItems={{ sm: "start" }}
          justifyContent="space-between"
          sx={{ mb: 0.5 }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {comment.author?.name}
          </Typography>
          <Box variant="caption" sx={{ color: "text.disabled" }}>
            <Stack alignItems="end">
              {comment.author?._id === user._id ?
              (
                <>                
                  <IconButton
                  onClick ={() => handleOpen()}
                  >
                    <ClearIcon 
                    sx={{color: "text.disabled", justifyContent:"right"}}
                    />
                  </IconButton>
                    <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography id="modal-modal-description">
                        Are you sure to delete this comment?
                      </Typography>
                      <Stack direction="row" justifyContent="center">
                      <IconButton size="small" onClick ={() => handleDeleteComment({postId,commentId})}>Yes</IconButton>
                      <IconButton size="small" onClick ={() => handleClose()}>No</IconButton>
                      </Stack>
                    </Box>
                  </Modal>
                </>

              ) :  (<></>)
              }
              <Typography>
              {fDate(comment.createdAt)}
              </Typography>
            </Stack>
          </Box>
        </Stack>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {comment.content}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <CommentReaction comment={comment} />
        </Box>
      </Paper>
    </Stack>
  );
}

export default CommentCard;