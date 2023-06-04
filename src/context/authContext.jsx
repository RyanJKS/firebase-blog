import { useEffect, createContext, useState } from "react";
import { auth, db } from "../config/firebaseConfig";
import { getDocs, collection } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState("");
  const [username, setUsername] = useState("");

  onAuthStateChanged(auth, async (user) => {
    if (user !== null) {
      setCurrentUser(user.uid);
      setUsername(user.displayName);
    } else {
      setCurrentUser("");
    }
  });

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      // data format = collection -> id -> post topics (title, datePosted, isCompleted)
      // each id has one post
      // use getDocs to get *ALL* the posts (all the id)
      // read data from database

      // specify which collection to get docs from
      const postsCollectionRef = collection(db, "posts");
      try {
        const data = await getDocs(postsCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setPosts(filteredData);
      } catch (err) {
        console.error(err);
      }
      //set data from database to useState
    };

    getPosts();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        posts,
        username,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
