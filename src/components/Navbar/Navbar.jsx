import React, { useContext, useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { AuthContext } from "../../context/authContext";
import { useNavigate, useLocation } from "react-router-dom";
import SettingMenu from "./SettingMenu";
import AccessForm from "../AccessForm/AccessForm";

function NavBar() {
  const { currentUser } = useContext(AuthContext);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Container fluid>
        <Navbar.Brand href="/">FireBlog</Navbar.Brand>

        {currentUser ? (
          <>
            {location.pathname === "/mypost" ? (
              <Button variant="primary" onClick={() => navigate("/")}>
                Home
              </Button>
            ) : (
              <Button variant="primary" onClick={() => navigate("/mypost")}>
                My Posts
              </Button>
            )}
            <SettingMenu />
          </>
        ) : (
          <>
            <Button variant="primary" onClick={handleShow}>
              Account
            </Button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton />
              <Modal.Body>
                <AccessForm />
              </Modal.Body>
            </Modal>
          </>
        )}
      </Container>
    </Navbar>
  );
}

export default NavBar;
