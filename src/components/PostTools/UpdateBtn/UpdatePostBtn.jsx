import React, { useState } from "react";
import "./UpdatePostBtn.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { UpdatePost } from "../../../helper/updatingPost";
import Swal from "sweetalert2";

function UpdatePostBtn({ docId, title, description }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [updateTitle, setUpdateTitle] = useState(title);
  const [updateDescription, setUpdateDescritpion] = useState(description);

  const handleUpdatePost = async () => {
    const updateData = {
      postTitle: updateTitle,
      postDescription: updateDescription,
    };
    UpdatePost(docId, updateData);
    handleClose();
    Swal.fire("Posted!", "Your post hase been updated.", "success").then(() => {
      window.location.reload();
    });
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
        <Box className="update-card-style">
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
              rows="18"
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
              onClick={handleUpdatePost}
            >
              Update Post
            </Button>
          </div>

          {/** */}
        </Box>
      </Modal>
    </>
  );
}

export default UpdatePostBtn;
