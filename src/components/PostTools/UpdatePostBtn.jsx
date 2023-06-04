import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { db } from "../../config/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function UpdatePostBtn({ docId, title, description }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [updateTitle, setUpdateTitle] = useState(title);
  const [updateDescription, setUpdateDescritpion] = useState(description);

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
    handleClose();
    window.location.reload();
  };

  return (
    <>
      <Button variant="outlined" size="medium" onClick={handleOpen}>
        Update
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Post
          </Typography>

          {/*FORM*/}

          <div className="mb-3">
            <label className="form-label" htmlFor="title2">
              Title
            </label>
            <input
              className="form-control"
              type="text"
              required
              defaultValue={updateTitle}
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
              defaultValue={updateDescription}
              onChange={(e) => setUpdateDescritpion(e.target.value)}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <Button variant="contained" color="error" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => handleUpdatePost(docId)}
            >
              Post
            </Button>
          </div>

          {/** */}
        </Box>
      </Modal>
    </>
  );
}

export default UpdatePostBtn;
