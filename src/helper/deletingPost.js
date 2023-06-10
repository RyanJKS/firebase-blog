import { db, storage } from "../config/firebaseConfig";
import { deleteDoc, doc } from "firebase/firestore";
import { ref, getDownloadURL, deleteObject } from "firebase/storage";

export const DeletePostAndImage = async (id) => {
  const imageRef = ref(storage, `images/${id}`);
  const docRef = doc(db, "posts", id);

  try {
    // Check if the imageRef exists
    await getDownloadURL(imageRef);

    // If no error occurred, delete the image
    await deleteObject(imageRef);
  } catch (imageErr) {
    console.error("Error deleting image:", imageErr);
  }

  try {
    // Delete the document
    await deleteDoc(docRef);
  } catch (docErr) {
    console.error("Error deleting document:", docErr);
  }
};
