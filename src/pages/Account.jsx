import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { deleteUser, signOut } from "firebase/auth";
import { auth, db } from "../config/firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Access from "../components/Forms/Access";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import Swal from "sweetalert2";

function Account() {
  const navigate = useNavigate();
  const { currentUser, username, posts } = useContext(AuthContext);

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const deleteUserAccount = async (userInfo) => {
    try {
      await deleteUser(userInfo);
      navigate("/");
      window.location.reload();
    } catch (err) {
      console.error(err);
      Swal.fire(
        "Oops...!",
        "There was an error deleting your account. Pleas try again.",
        "error"
      );
    }
  };
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const handleDelete = async () => {
    const userInfo = auth?.currentUser;

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          // FIND POSTS AND USER IN DATABASE & DELETE
          try {
            posts.forEach(async (document) => {
              if (document.userId === currentUser) {
                const docRef = doc(db, "posts", document.id);
                await deleteDoc(docRef).catch((err) => console.log(err));
              }
            });
            //FIND AND DELETE USER
            deleteUserAccount(userInfo);
          } catch (err) {
            Swal.fire(
              "Oops...!",
              "There was an error deleting your account. Pleas try again.",
              "error"
            );
          }
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your account and posts are safe :)",
            "error"
          );
        }
      });
  };

  return (
    <>
      {!currentUser ? (
        <div
          style={{
            height: "75vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Access />
        </div>
      ) : (
        <Stack
          direction="column"
          justifyContent="space-evenly"
          alignItems="center"
          height="60vh"
          spacing={2}
        >
          <h1>Hello {username}</h1>
          <Button variant="contained" onClick={handleLogOut}>
            Log Out
          </Button>
          <Button variant="contained" onClick={handleDelete}>
            Delete Account
          </Button>
        </Stack>
      )}
    </>
  );
}

export default Account;
