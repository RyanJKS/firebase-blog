import React from "react";
import { Grid } from "@mui/material";
import PostCard from "./PostCard";

function DisplayPosts({ posts }) {
  return (
    <Grid
      container
      direction="column"
      justifyContent="space-evenly"
      alignItems="center"
      spacing={4}
    >
      {posts?.map((post, index) => (
        <Grid item key={index}>
          <PostCard
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
  );
}

export default DisplayPosts;
