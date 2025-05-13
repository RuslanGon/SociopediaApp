import React from 'react'
import { useSelector } from 'react-redux';
import { Box, useMediaQuery } from "@mui/material";

import UserWidgetPage from "../UserWidgetsPage/UserWidgestPage.jsx";
import MyPostWidget from "../UserWidgetsPage/MyPostWidget.jsx";
import PostsWidget from "../UserWidgetsPage/PostsWidget.jsx";
import AdvertWidget from "../UserWidgetsPage/AdvertWidget.jsx";
import FriendListWidget from "../UserWidgetsPage/FriendListWidget.jsx";

const HomePage = () => {

  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.auth.user);

  return (
    <Box>
    <Box
      width="100%"
      padding="2rem 6%"
      display={isNonMobileScreens ? "flex" : "block"}
      gap="0.5rem"
      justifyContent="space-between"
    >
      <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
        <UserWidgetPage userId={_id} picturePath={picturePath} />
      </Box>
      <Box
        flexBasis={isNonMobileScreens ? "42%" : undefined}
        mt={isNonMobileScreens ? undefined : "2rem"}
      >
        <MyPostWidget picturePath={picturePath} />
        <PostsWidget userId={_id} />
      </Box>
      {isNonMobileScreens && (
        <Box flexBasis="26%">
          <AdvertWidget />
          <Box m="2rem 0" />
          <FriendListWidget userId={_id} />
        </Box>
      )}
    </Box>
  </Box>
  )
}

export default HomePage