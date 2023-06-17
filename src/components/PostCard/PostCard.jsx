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
import UpdatePostBtn from "../PostTools/UpdateBtn/UpdatePostBtn";
import { DeletePostAndImage } from "../../helper/deletingPost";
import template_banner_image from "../../assets/template_banner_image.PNG";
import { TimeConversion } from "../../helper/timeConversion";
import Swal from "sweetalert2";

export default function PostCard({ post }) {
  const { currentUser } = useContext(AuthContext);

  const {
    postTitle,
    postDescription,
    userId,
    id,
    authorUsername,
    createdOn,
    imageUrl,
  } = post;

  const timeCreated = TimeConversion(createdOn);

  const handleDelete = async (id) => {
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
        DeletePostAndImage(id);
        Swal.fire(
          "Deleted",
          "Your post and image has been deleted",
          "success"
        ).then(() => {
          window.location.reload();
        });
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
            <Button variant="outlined" onClick={() => handleDelete(id)}>
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
            src={imageUrl || template_banner_image}
            alt="something"
            fluid
          />
        </MDBCol>
        <MDBCol md="7">
          <MDBCardBody>
            <MDBCardTitle>{postTitle}</MDBCardTitle>
            <MDBCardText className="d-flex justify-content-between">
              <small className="text-muted">Author: {authorUsername}</small>
              <small className="text-muted">Created On: {timeCreated}</small>
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
