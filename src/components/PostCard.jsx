import React, { useContext } from "react";
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardFooter,
  MDBBtn,
  MDBCardImage,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import { AuthContext } from "../context/authContext";
import { db } from "../config/firebaseConfig";
import { deleteDoc, doc } from "firebase/firestore";
import UpdatePost from "./PostTools/UpdatePost";

export default function PostCard({
  title,
  description,
  userId,
  docId,
  authorUsername,
}) {
  const { currentUser } = useContext(AuthContext);

  const handleDeletePost = async (docId) => {
    const postDoc = doc(db, "posts", docId);
    console.log(docId);
    try {
      await deleteDoc(postDoc);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <MDBCard style={{ maxWidth: "600px" }}>
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
            <MDBCardTitle>{title}</MDBCardTitle>
            <MDBCardText>
              <small className="text-muted">Author: {authorUsername}</small>
            </MDBCardText>
            <MDBCardText className="overflow-hidden">{description}</MDBCardText>
          </MDBCardBody>
        </MDBCol>
      </MDBRow>
      {userId === currentUser ? (
        <MDBCardFooter className="text-muted">
          <div className="d-flex justify-content-evenly">
            <UpdatePost docId={docId} title={title} description={description} />
            <MDBBtn onClick={() => handleDeletePost(docId)}>Delete</MDBBtn>
          </div>
        </MDBCardFooter>
      ) : null}
    </MDBCard>
  );
}
