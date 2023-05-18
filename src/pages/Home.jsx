import React, { useContext } from "react";
import CreatePost from "../components/CreatePost/CreatePost";
import { AuthContext } from "../context/authContext";
import TryCard from "../components/PostCard/TryCard";

function Home() {
  const { currentUser } = useContext(AuthContext);
  return (
    <>
      {currentUser ? <CreatePost /> : null}
      <TryCard />{" "}
    </>
  );
}

export default Home;
