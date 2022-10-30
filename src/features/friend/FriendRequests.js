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
import { getFriendRequests } from "./friendSlice";
import UserCard from "./UserCard";
import SearchInput from "../../components/SearchInput";

function FriendRequests() {
  const [filterNameIncoming, setFilterNameIncoming] = useState("");
  const [pageIncoming, setPageIncoming] = React.useState(1);

  const { 
    currentPageUsers, 
    usersById, 
    totalUsers, 
    totalPages,} = useSelector(
    (state) => state.friend
  );

  const usersIncoming = currentPageUsers.map((userId) => usersById[userId]);
  const dispatch = useDispatch();

  const handleSubmitIncoming = (searchQuery) => {
    setFilterNameIncoming(searchQuery);
  };


  useEffect(() => {
    dispatch(getFriendRequests({ filterNameIncoming, pageIncoming }));
  }, [filterNameIncoming,pageIncoming, dispatch]);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Friend Requests
      </Typography>
      <Card sx={{ p: 3, mb:5 }}>
        <Box sx={{ flexGrow: 1, mb:3  }} >
            <Typography
             variant="title"
             sx={{ color: "text.primary", ml: 1, fontWeight: "bold" }}
             >
              Incoming friend requests
             </Typography>
        </Box>
        <Stack spacing={2}>
          <Stack direction={{ xs: "column", md: "row" }} alignItems="center">
            
            <SearchInput handleSubmit={handleSubmitIncoming} />
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
              page={pageIncoming}
              onChange={(e, pageIncoming) => setPageIncoming(pageIncoming)}
            />
          </Stack>
        </Stack>

        <Grid container spacing={3} my={1}>
          {usersIncoming.map((user) => (
            <Grid key={user._id} item xs={12} md={4}>
              <UserCard profile={user} />
            </Grid>
          ))}
        </Grid>
      </Card>

      
    </Container>
  );
}

export default FriendRequests;