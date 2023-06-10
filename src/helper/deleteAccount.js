import { deleteUser } from "firebase/auth";
import { DeletePostAndImage } from "./deletingPost";
import Swal from "sweetalert2";

const DeleteUser = async (userInfo) => {
  try {
    await deleteUser(userInfo);
  } catch (err) {
    Swal.fire(
      "Oops...!",
      "There was an error deleting your account. Pleas try again.",
      "error"
    );
  }
};

export const DeleteUserAndFiles = async (currentUser, userInfo, posts) => {
  // FIND POSTS AND USER IN DATABASE & DELETE
  try {
    posts.forEach(async (document) => {
      if (document.userId === currentUser) {
        DeletePostAndImage(document.id);
      }
    });
    DeleteUser(userInfo);
  } catch (err) {
    Swal.fire(
      "Oops...!",
      "There was an error deleting your account. Please try again.",
      "error"
    );
  }
};
