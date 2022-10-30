import React, { useEffect, useState } from "react";
import {
  Stack,
  Typography,
  Card,
  Box,
  Pagination,
  Grid,
  Container,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getFriendRequestsOutgoing } from "./friendSlice";
import UserCard from "./UserCard";
import SearchInput from "../../components/SearchInput";

function OutgoingFriendRequests() {
  const [filterNameOutgoing, setFilterNameOutgoing] = useState("");
  const [pageOutgoing, setPageOutgoing] = React.useState(1);

  const { 
    currentPageUsers,
    usersById,
    totalUsers,
    totalPages } = useSelector(
    (state) => state.friend
  );

  const usersOutgoing = currentPageUsers.map((userId) => usersById[userId]);
  const dispatch = useDispatch();


  const handleSubmitOutgoing = (searchQuery) => {
    setFilterNameOutgoing(searchQuery);
  };


  useEffect(() => {
    dispatch(getFriendRequestsOutgoing({filterNameOutgoing, pageOutgoing }))
  }, [filterNameOutgoing, pageOutgoing, dispatch]);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Friend Requests
      </Typography>

      <Card sx={{ p: 3, mb:5  }}>
      <Box sx={{ flexGrow: 1, mb:3  }} >
            <Typography
             variant="title"
             sx={{ color: "text.primary", ml: 1, fontWeight: "bold" }}
             >
              Outgoing friend requests
             </Typography>
        </Box>
        <Stack spacing={2}>
          <Stack direction={{ xs: "column", md: "row" }} alignItems="center">
            <SearchInput handleSubmit={handleSubmitOutgoing} />
            <Box sx={{ flexGrow: 1 }} />
            <Typography
              variant="subtitle"
              sx={{ color: "text.secondary", ml: 1 }}
            >
              {totalUsers > 1
                ? `${totalUsers} requests found`
                : totalUsers === 1
                ? `${totalUsers} request found`
                : "No request found"}
            </Typography>

            <Pagination
              count={totalPages}
              page={pageOutgoing}
              onChange={(e, pageOutgoing) => setPageOutgoing(pageOutgoing)}
            />
          </Stack>
        </Stack>

        <Grid container spacing={3} my={1}>
          {usersOutgoing.map((user) => {
            return (
            <Grid key={user._id} item xs={12} md={4}>
              <UserCard profile={user} />
            </Grid>
          )}
          )}
        </Grid>
      </Card>
    </Container>
  );
}

export default OutgoingFriendRequests;