import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { db, auth } from "../../config/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const btnStyle = {
  width: "100%",
  display: "flex",
  paddingTop: "20px",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
};

export default function CreatePostBtn() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const postsCollectionRef = collection(db, "posts");
  const onSubmit = async (e) => {
    e.preventDefault();
    const { title, description } = e.target.elements;
    try {
      await addDoc(postsCollectionRef, {
        postTitle: title.value,
        postDescription: description.value,
        userId: auth.currentUser?.uid,
        authorUsername: auth?.currentUser?.displayName,
      });
    } catch (err) {
      console.error(err);
    }
    e.target.reset();
    handleClose();
    window.location.reload();
  };

  return (
    <div style={btnStyle}>
      <Button variant="contained" onClick={handleOpen}>
        Create Post
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Post
          </Typography>

          {/*FORM*/}

          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="title">
                Title
              </label>
              <input className="form-control" type="text" id="title" required />
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
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <Button variant="contained" color="error" onClick={handleClose}>
                Close
              </Button>
              <Button variant="contained" color="success" type="submit">
                Post
              </Button>
            </div>
          </form>
          {/** */}
        </Box>
      </Modal>
    </div>
  );
}
