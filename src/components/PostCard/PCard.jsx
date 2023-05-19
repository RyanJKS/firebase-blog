import React, { useContext, useState } from "react";
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
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import { AuthContext } from "../../context/authContext";
import { db } from "../../config/firebaseConfig";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";

export default function PCard({
  title,
  description,
  userId,
  docId,
  authorUsername,
}) {
  const [optSmModal, setOptSmModal] = useState(false);
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateDescription, setUpdateDescritpion] = useState("");
  const { currentUser } = useContext(AuthContext);

  const toggleShow = () => setOptSmModal(!optSmModal);

  const handleUpdatePost = async (docId) => {
    const postDoc = doc(db, "posts", docId);
    try {
      await updateDoc(postDoc, {
        postTitle: updateTitle,
        postDescription: updateDescription,
      });
    } catch (err) {
      console.error(err);
    }
    setOptSmModal(!optSmModal);
    window.location.reload();
  };

  // const handleDeletePost = async (docId) => {
  //   const postDoc = doc(db, "posts", docId);
  //   try {
  //     await deleteDoc(postDoc);
  //     window.location.reload();
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return (
    <MDBCard style={{ maxWidth: "540px" }}>
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
            <MDBBtn onClick={toggleShow}>Update</MDBBtn>

            <MDBModal show={optSmModal} tabIndex="-1" setShow={setOptSmModal}>
              <MDBModalDialog size="lg">
                <MDBModalContent>
                  <MDBModalHeader>
                    <MDBModalTitle>Update Post</MDBModalTitle>
                    <MDBBtn
                      className="btn-close"
                      color="none"
                      onClick={toggleShow}
                    ></MDBBtn>
                  </MDBModalHeader>

                  <MDBModalBody>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="title2">
                        Title
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        required
                        value={updateTitle}
                        onChange={(e) => setUpdateTitle(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="description2">
                        Description
                      </label>
                      <textarea
                        rows="15"
                        cols="40"
                        className="form-control"
                        required
                        value={updateDescription}
                        onChange={(e) => setUpdateDescritpion(e.target.value)}
                      />
                    </div>
                  </MDBModalBody>
                  <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={toggleShow}>
                      Close
                    </MDBBtn>
                    <MDBBtn
                      color="indigo"
                      onClick={() => handleUpdatePost(docId)}
                    >
                      Save Changes
                    </MDBBtn>
                  </MDBModalFooter>
                </MDBModalContent>
              </MDBModalDialog>
            </MDBModal>

            <MDBBtn>Delete</MDBBtn>
          </div>
        </MDBCardFooter>
      ) : null}
    </MDBCard>
  );
}
