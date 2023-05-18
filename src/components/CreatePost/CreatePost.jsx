import React, { useContext, useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import Button from "react-bootstrap/Button";
import { db, auth } from "../../config/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export default function CreatePost() {
  const [optSmModal, setOptSmModal] = useState(false);

  const toggleShow = () => setOptSmModal(!optSmModal);

  const postsCollectionRef = collection(db, "posts");

  const onSubmit = async (e) => {
    e.preventDefault();
    const { title, description } = e.target.elements;
    try {
      await addDoc(postsCollectionRef, {
        postTitle: title.value,
        postDescription: description.value,
        userId: auth.currentUser?.uid,
      });
    } catch (err) {
      console.error(err);
    }
    e.target.reset();
    setOptSmModal(!optSmModal);
    window.location.reload();
  };

  return (
    <>
      <MDBBtn variant="outlined" onClick={toggleShow}>
        Create Post
      </MDBBtn>
      <MDBModal show={optSmModal} tabIndex="-1" setShow={setOptSmModal}>
        <MDBModalDialog size="lg">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Create Post</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <form onSubmit={onSubmit}>
              <MDBModalBody>
                <div className="mb-3">
                  <label className="form-label" htmlFor="title">
                    Title
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="title"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="description">
                    Description
                  </label>
                  <textarea
                    rows="15"
                    cols="40"
                    className="form-control"
                    id="description"
                    required
                  />
                </div>
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn color="secondary" onClick={toggleShow}>
                  Close
                </MDBBtn>
                <Button variant="success" type="submit">
                  Post
                </Button>
              </MDBModalFooter>
            </form>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
