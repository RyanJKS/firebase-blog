import React, { useState, useEffect, useContext } from "react";
import Collapse from "@mui/material/Collapse";
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";
import { Button } from "@mui/material";
import { AuthContext } from "../context/authContext";

function OverviewDialog() {
  const { currentUser } = useContext(AuthContext);
  const [open, setOpen] = useState(true);

  // To make overview dialog not visible when user is not logged in
  useEffect(() => {
    if (currentUser) {
      setOpen(false);
    }
  }, [currentUser]);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Button onClick={() => setOpen(!open)} variant="contained">
        Overview
      </Button>
      <div
        style={{
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        }}
      >
        <Collapse in={open} timeout="auto" unmountOnExit>
          <CardContent>
            <Container
              sx={{
                height: "100%",
                lineHeight: 1.5,
              }}
            >
              Welcome to the FireBlog!
            </Container>
          </CardContent>
        </Collapse>
      </div>
    </div>
  );
}

export default OverviewDialog;
