import React, { useContext } from "react";
import CreatePostBtn from "../components/PostTools/CreatePostBtn";
import { AuthContext } from "../context/authContext";
import Grid from "@mui/material/Grid";
import PostCard from "../components/PostCard/PostCard";
import OverviewDialog from "../components/OverviewDialog";

function Home() {
  const { currentUser, posts } = useContext(AuthContext);

  return (
    <>
      <OverviewDialog />
      {currentUser ? <CreatePostBtn /> : null}
      <div className="p-2" />
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={4}
      >
        {posts?.map((post, index) => (
          <Grid item xs={12} lg={12} key={index}>
            <PostCard post={post} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Home;
