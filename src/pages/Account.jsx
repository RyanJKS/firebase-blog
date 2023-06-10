import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { useNavigate } from "react-router-dom";
import Access from "../components/Forms/Access";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import { DeleteUserAndFiles } from "../helper/deleteAccount";

function Account() {
  const navigate = useNavigate();
  const { currentUser, username, posts } = useContext(AuthContext);
  const userInfo = auth?.currentUser;

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const handleAccountDelete = async () => {
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
          DeleteUserAndFiles(currentUser, userInfo, posts);
          Swal.fire(
            "Account Sucessfully Deleted",
            "Your account has been deleted",
            "success"
          ).then(() => {
            navigate("/");
            window.location.reload();
          });
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

  const UserAuthentication = () => {
    if (currentUser) {
      return (
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
          <Button variant="contained" onClick={handleAccountDelete}>
            Delete Account
          </Button>
        </Stack>
      );
    } else {
      return (
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
      );
    }
  };

  return <UserAuthentication />;
}

export default Account;
