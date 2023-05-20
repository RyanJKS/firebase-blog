import React, { useContext } from "react";
import CreatePost from "../components/PostTools/CreatePost";
import { AuthContext } from "../context/authContext";
import DisplayPosts from "../components/DisplayPosts";

function Home() {
  const { currentUser, posts } = useContext(AuthContext);
  return (
    <>
      {currentUser ? <CreatePost /> : null}
      <div className="p-2" />
      <DisplayPosts posts={posts} />
    </>
  );
}

export default Home;
