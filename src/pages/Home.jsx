import React, { useContext } from "react";
import CreatePost from "../components/CreatePost/CreatePost";
import { AuthContext } from "../context/authContext";

function Home() {
  const { isAuthorised } = useContext(AuthContext);
  return <>{isAuthorised && <CreatePost />}</>;
}

export default Home;
