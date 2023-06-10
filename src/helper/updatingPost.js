import { db } from "../config/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

export const UpdatePost = async (docId, updateData) => {
  const postDoc = doc(db, "posts", docId);
  try {
    await updateDoc(postDoc, updateData);
  } catch (err) {
    console.error(err);
  }
};
