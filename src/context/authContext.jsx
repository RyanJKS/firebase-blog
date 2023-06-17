import { useEffect, createContext, useState } from "react";
import { auth, db, storage } from "../config/firebaseConfig";
import { getDocs, collection } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { listAll, ref, getDownloadURL } from "firebase/storage";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState("");
  const [username, setUsername] = useState("");

  //run over every render to check if user is authenticated & logged in
  onAuthStateChanged(auth, async (user) => {
    if (user !== null) {
      setCurrentUser(user.uid);
      setUsername(user.displayName);
    } else {
      setCurrentUser("");
    }
  });

  const [posts, setPosts] = useState([]);

  // data format = collection -> id -> post topics (title, datePosted, isCompleted)
  useEffect(() => {
    const getPostsAndImages = async () => {
      const postsCollectionRef = collection(db, "posts"); // specify which collection to get docs from
      const imageListRef = ref(storage, "images/"); // specify which collection to get docs from

      try {
        const [postsData, imageData] = await Promise.all([
          getDocs(postsCollectionRef),
          listAll(imageListRef),
        ]);
        //filter response to only get posts details
        const filteredPostsData = postsData.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        //filter reponse to asign id to unique download url and output new list
        const filteredImageList = await Promise.all(
          imageData.items.map(async (item) => {
            const url = await getDownloadURL(item);
            return {
              id: item.fullPath.split("/")[1],
              url: url,
            };
          })
        );
        // combine id from each filteredPostsData object to each id from filteredImageList object
        const mergedPostsData = filteredPostsData.map((post) => {
          const matchingImage = filteredImageList.find(
            (image) => image.id === post.id
          );
          if (matchingImage) {
            return {
              ...post,
              imageUrl: matchingImage.url,
            };
          }
          return post;
        });

        //sort the posts by timestamp that they were created on
        mergedPostsData.sort((a, b) => {
          return new Date(b.createdOn.seconds) - new Date(a.createdOn.seconds);
        });
        setPosts(mergedPostsData);
      } catch (error) {
        console.error("Error fetching and setting data:", error);
      }
    };

    getPostsAndImages();
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
