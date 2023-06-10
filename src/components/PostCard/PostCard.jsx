import React, { useContext } from "react";
import "./PostCard.css";
import { Button } from "@mui/material";
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
import { AuthContext } from "../../context/authContext";
import { db } from "../../config/firebaseConfig";
import { deleteDoc, doc } from "firebase/firestore";
import UpdatePostBtn from "../PostTools/UpdatePostBtn";
import Swal from "sweetalert2";

export default function PostCard({ post }) {
  const { currentUser } = useContext(AuthContext);

  const {
    postTitle,
    postDescription,
    userId,
    id,
    authorUsername,
    timestamp,
    imageUrl,
  } = post;

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

  const showEditingBtns = () => {
    if (userId === currentUser) {
      return (
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
      );
    }
  };

  return (
    <MDBCard className="card-container">
      <MDBRow className="g-0">
        <MDBCol md="5">
          <MDBCardImage
            src={
              imageUrl ||
              "https://imgv3.fotor.com/images/blog-cover-image/part-blurry-image.jpg"
            }
            alt="something"
            fluid
          />
        </MDBCol>
        <MDBCol md="7">
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
      {showEditingBtns()}
    </MDBCard>
  );
}
