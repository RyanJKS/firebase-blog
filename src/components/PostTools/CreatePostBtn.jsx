import React, { useState } from "react";
import "./CreatePostBtn.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { db, auth, storage } from "../../config/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

export default function CreatePostBtn() {
  const [open, setOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const postsCollectionRef = collection(db, "posts");

  const uploadImage = async (postId) => {
    const imageRef = ref(storage, `images/${postId}`);
    try {
      await uploadBytes(imageRef, imageUpload);
    } catch (err) {
      alert(err);
    }
  };
  // CREATE POST FUNCTION
  const onSubmit = async (e) => {
    e.preventDefault();
    const { title, description } = e.target.elements;
    const timestamp = new Date();
    const postData = {
      postTitle: title.value,
      postDescription: description.value,
      userId: auth.currentUser?.uid,
      authorUsername: auth?.currentUser?.displayName,
      timestamp: timestamp.toISOString(),
    };

    try {
      //post the data
      let docRef = await addDoc(postsCollectionRef, postData);
      // Assign the unique doc ID from the post as the image title
      uploadImage(docRef.id);
    } catch (err) {
      console.error(err);
    }
    e.target.reset();
    handleClose();
    window.location.reload();
  };

  //GET IMAGE URL AND SET IMAGE
  const handlePreviewImage = (event) => {
    const file = event.target.files[0];
    setImageUpload(file);
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreviewImage(reader.result);
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setPreviewImage(null);
    setImageUpload(null);
  };

  //DISPLAY EITHER ADD IMAGE OR REMOVE IMAGE BASED ON STATE OF IMAGE
  const showImageBtn = () => {
    if (previewImage !== null) {
      return (
        <Button variant="contained" color="error" onClick={removeImage}>
          Remove Image
        </Button>
      );
    } else {
      return (
        <label
          style={{
            cursor: "pointer",
          }}
        >
          + Add Image
          <input
            type="file"
            name="images"
            onChange={handlePreviewImage}
            style={{ display: "none" }}
            accept="image/png, image/jpeg, image/webp"
          />
        </label>
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
          {/*IF THERE IS AN IMAGE, POST IT */}
          {previewImage && (
            <div className="image-container">
              <img
                src={previewImage}
                alt={previewImage}
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            </div>
          )}
          <section
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {showImageBtn()}
          </section>
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
                rows={previewImage ? "7" : "17"}
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
          {/*FORM CONTENT ENDS */}
        </Box>
      </Modal>
    </div>
  );
}
