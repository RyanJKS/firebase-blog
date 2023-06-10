import { useEffect, createContext, useState } from "react";
import { auth, db, storage } from "../config/firebaseConfig";
import { getDocs, collection } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { listAll, ref, getDownloadURL } from "firebase/storage";

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
  const [imageList, setImageList] = useState([]);

  // useEffect(() => {
  //   const getPosts = async () => {
  //     // data format = collection -> id -> post topics (title, datePosted, isCompleted)
  //     // each id has one post
  //     // use getDocs to get *ALL* the posts (all the id)
  //     // read data from database

  //     // specify which collection to get docs from
  //     const postsCollectionRef = collection(db, "posts");
  //     try {
  //       const data = await getDocs(postsCollectionRef);
  //       const filteredData = data.docs.map((doc) => ({
  //         ...doc.data(),
  //         id: doc.id,
  //       }));
  //       setPosts(filteredData);
  //       console.log(filteredData);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //     //set data from database to useState
  //   };

  //   const getImages = async () => {
  //     const imageListRef = ref(storage, "images/");
  //     try {
  //       const response = await listAll(imageListRef);
  //       console.log(response);
  //       response.items.map(async (item) => {
  //         const url = await getDownloadURL(item);
  //         setImageList((prev) => {
  //           if (!prev.includes(url)) {
  //             return [...prev, url];
  //           }
  //           return prev;
  //         });
  //       });
  //     } catch (error) {
  //       console.error("Error fetching and setting image list:", error);
  //     }
  //   };

  //   getPosts();
  //   getImages();
  // }, []);

  useEffect(() => {
    const getPostsAndImages = async () => {
      const postsCollectionRef = collection(db, "posts");
      const imageListRef = ref(storage, "images/");

      try {
        const [postsData, imageData] = await Promise.all([
          getDocs(postsCollectionRef),
          listAll(imageListRef),
        ]);

        const filteredPostsData = postsData.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        const filteredImageList = await Promise.all(
          imageData.items.map(async (item) => {
            const url = await getDownloadURL(item);
            return {
              id: item.fullPath.split("/")[1],
              url: url,
            };
          })
        );
        console.log(filteredImageList);
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

        setPosts(mergedPostsData);
        setImageList(filteredImageList.map((image) => image.url));
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
        imageList,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
