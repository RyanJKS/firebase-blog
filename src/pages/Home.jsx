import React, { useContext } from "react";
import CreatePost from "../components/CreatePost/CreatePost";
import { AuthContext } from "../context/authContext";
import { Grid } from "@mui/material";
import PostCard from "../components/PostCard/PostCard";
import PCard from "../components/PostCard/PCard";

function Home() {
  const { currentUser, posts } = useContext(AuthContext);
  return (
    <>
      {currentUser ? <CreatePost /> : null}
      <div className="p-2" />
      <Grid
        container
        direction="column"
        justifyContent="space-evenly"
        alignItems="center"
        spacing={4}
      >
        {posts?.map((post, index) => (
          <Grid item key={index}>
            <PCard
              key={index}
              title={post.postTitle}
              description={post.postDescription}
              userId={post.userId}
              docId={post.id}
              authorUsername={post.authorUsername}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Home;
