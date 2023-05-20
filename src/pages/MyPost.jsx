import React, { useContext } from "react";
import CreatePost from "../components/PostTools/CreatePost";
import { AuthContext } from "../context/authContext";
import DisplayPosts from "../components/DisplayPosts";

function MyPost() {
  const { currentUser, posts } = useContext(AuthContext);

  const filteredById = (post) => {
    if (post.userId === currentUser) {
      return true;
    }
    return false;
  };
  const personalPosts = posts.filter(filteredById);
  console.log(personalPosts);

  return (
    <>
      {currentUser ? <CreatePost /> : null}
      <div className="p-2" />
      {personalPosts.length > 0 ? (
        <DisplayPosts posts={personalPosts} />
      ) : (
        <h1 className="d-flex justify-content-center">
          Wooooooaaaaaaaaah so empty. Please make some posts.
        </h1>
      )}
    </>
  );
}

export default MyPost;
