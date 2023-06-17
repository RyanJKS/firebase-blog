import React, { useState, useRef } from "react";
import "./CreatePostBtn.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CreatePostAndImage } from "../../../helper/creatingPost";
import Swal from "sweetalert2";

export default function CreatePostBtn() {
  const [open, setOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // CREATE POST FUNCTION
  const onSubmit = async (e) => {
    e.preventDefault();
    const { title, description } = e.target.elements;
    CreatePostAndImage(title.value, description.value, imageUpload);
    handleClose();
    Swal.fire("Posted!", "Your post is now live.", "success").then(() => {
      e.target.reset();
      window.location.reload();
    });
  };

  const fileInputRef = useRef(null);

  const handleDrop = (event) => {
    event.preventDefault();
    handleImageUpload(event.dataTransfer.files);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleImageUpload = (files) => {
    // Handle the file upload logic here
    // You can access the selected file(s) using the 'files' parameter
    const selectedFile = files[0];
    setImageUpload(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = () => {
        setPreviewImage(reader.result);
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    handleImageUpload(event.target.files);
    setImageUpload(event.target.files[0]);
  };

  const removeImage = () => {
    setPreviewImage(null);
    setImageUpload(null);
  };

  const showImage = () => {
    if (previewImage) {
      return <img src={previewImage} alt={previewImage} />;
    } else {
      return (
        <>
          + Add Image{" "}
          <input
            type="file"
            name="images"
            onChange={handleFileChange}
            style={{ display: "none" }}
            accept="image/png, image/jpeg, image/webp, image/jpg"
            ref={fileInputRef}
          />
        </>
      );
    }
  };

  return (
    <div className="create-btn-style">
      <Button variant="contained" onClick={handleOpen}>
        Create Post
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal-style">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Post
          </Typography>
          {/*IMAGE CONTAINER*/}
          <div
            className="image-container"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={handleClick}
          >
            {showImage()}
          </div>
          {previewImage ? (
            <Button variant="contained" color="error" onClick={removeImage}>
              Remove Image
            </Button>
          ) : null}

          {/*FORM CONTENT */}
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
                rows="8"
                className="form-control"
                id="description"
                required
              />
            </div>
            {/*BUTTONS */}
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <Button variant="contained" color="error" onClick={handleClose}>
                Close
              </Button>
              <Button variant="contained" color="success" type="submit">
                Post
              </Button>
            </div>
          </form>
          {/*FORM CONTENT ENDS */}
        </Box>
      </Modal>
    </div>
  );
}
