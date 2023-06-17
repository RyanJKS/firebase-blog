import { db, auth, storage } from "../config/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

const postsCollectionRef = collection(db, "posts");

const UploadImage = async (postId, banner_image) => {
  const imageRef = ref(storage, `images/${postId}`);
  try {
    await uploadBytes(imageRef, banner_image);
  } catch (err) {
    alert(err);
  }
};

export const CreatePostAndImage = async (title, description, banner_image) => {
  const todayDate = Date.now();
  const postData = {
    postTitle: title,
    postDescription: description,
    userId: auth.currentUser?.uid,
    authorUsername: auth?.currentUser?.displayName,
    createdOn: todayDate,
  };
  try {
    //post the data
    let docRef = await addDoc(postsCollectionRef, postData);
    // Assign the unique doc ID from the post as the image title
    if (banner_image !== null) {
      UploadImage(docRef.id, banner_image);
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
