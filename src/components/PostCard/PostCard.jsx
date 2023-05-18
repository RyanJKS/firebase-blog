import React, { useContext, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { db } from "../../config/firebaseConfig";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";

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
import { AuthContext } from "../../context/authContext";

function PostCard({ title, description, id }) {
  const [optSmModal, setOptSmModal] = useState(false);
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateDescription, setUpdateDescritpion] = useState("");
  const { isAuthorised } = useContext(AuthContext);

  const toggleShow = () => setOptSmModal(!optSmModal);

  const handleUpdate = async (id) => {
    const postDoc = doc(db, "posts", id);
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

  const handlePostDelete = async (id) => {
    const postDoc = doc(db, "posts", id);
    try {
      await deleteDoc(postDoc);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Grid item xs={8} sm={4} md={4} lg={3}>
      <Card
        sx={{
          minWidth: 345,
          display: "flex",
          flexDirection: "row",
          margin: "2rem",
        }}
      >
        <CardMedia
          sx={{ height: 140 }}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        {isAuthorised ? (
          <CardActions sx={{ justifyContent: "space-evenly" }}>
            <Button size="small" onClick={toggleShow}>
              Update
            </Button>
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
                        onChange={(e) => setUpdateDescritpion(e.target.value)}
                      />
                    </div>
                  </MDBModalBody>
                  <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={toggleShow}>
                      Close
                    </MDBBtn>
                    <MDBBtn color="indigo" onClick={() => handleUpdate(id)}>
                      Save Changes
                    </MDBBtn>
                  </MDBModalFooter>
                </MDBModalContent>
              </MDBModalDialog>
            </MDBModal>
            <Button size="small" onClick={() => handlePostDelete(id)}>
              Delete
            </Button>
          </CardActions>
        ) : null}
      </Card>
    </Grid>
  );
}

export default PostCard;
