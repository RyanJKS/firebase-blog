import React, { useContext } from "react";
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardFooter,
  MDBCardImage,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import Button from "@mui/material/Button";
import { AuthContext } from "../../context/authContext";
import { db } from "../../config/firebaseConfig";
import { deleteDoc, doc } from "firebase/firestore";
import UpdatePostBtn from "../PostTools/UpdatePostBtn";
import Swal from "sweetalert2";

export default function PostCard({ post }) {
  const { currentUser } = useContext(AuthContext);

  const { postTitle, postDescription, userId, id, authorUsername } = post;

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    try {
      await deleteDoc(postDoc);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePost = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deletePost(id);
      }
    });
  };

  return (
    <MDBCard style={{ width: "80vw" }}>
      <MDBRow className="g-0">
        <MDBCol md="4">
          <MDBCardImage
            src="https://mdbootstrap.com/wp-content/uploads/2020/06/vertical.webp"
            alt="something"
            fluid
          />
        </MDBCol>
        <MDBCol md="8">
          <MDBCardBody>
            <MDBCardTitle>{postTitle}</MDBCardTitle>
            <MDBCardText>
              <small className="text-muted">Author: {authorUsername}</small>
            </MDBCardText>
            <MDBCardText className="overflow-hidden">
              {postDescription}
            </MDBCardText>
          </MDBCardBody>
        </MDBCol>
      </MDBRow>
      {userId === currentUser ? (
        <MDBCardFooter className="text-muted">
          <div className="d-flex justify-content-evenly">
            <UpdatePostBtn
              docId={id}
              title={postTitle}
              description={postDescription}
            />
            <Button variant="outlined" onClick={() => handleDeletePost(id)}>
              Delete
            </Button>
          </div>
        </MDBCardFooter>
      ) : null}
    </MDBCard>
  );
}
