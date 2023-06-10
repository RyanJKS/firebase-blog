import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import CreatePostBtn from "../components/PostTools/CreatePostBtn";
import PostCard from "../components/PostCard/PostCard";
import Grid from "@mui/material/Grid";

const errorMessageStyle = {
  height: "75vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

function MyPost() {
  const { currentUser, posts, imageList } = useContext(AuthContext);

  const filteredById = (post) => {
    if (post.userId === currentUser) {
      return true;
    }
    return false;
  };
  const personalPosts = posts.filter(filteredById);

  const CheckUserPost = () => {
    if (currentUser && personalPosts.length !== 0) {
      return personalPosts.map((post, index) => (
        <Grid item xs={12} lg={12} key={index}>
          <PostCard post={post} />
        </Grid>
      ));
    } else if (currentUser && personalPosts.length === 0) {
      return (
        <Grid item xs={12} lg={12}>
          <h1 style={errorMessageStyle}>
            Wooooooaaaaaaaaah so empty. Please make some posts.
          </h1>
        </Grid>
      );
    }
  };

  console.log(posts);
  console.log(imageList);

  return (
    <>
      {currentUser ? (
        <CreatePostBtn />
      ) : (
        <h1 style={errorMessageStyle}>
          No Access. <br />
          Please register or sign in to view you personal posts
        </h1>
      )}
      <div className="p-2" />
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={4}
      >
        {CheckUserPost()}
      </Grid>
    </>
  );
}

export default MyPost;
