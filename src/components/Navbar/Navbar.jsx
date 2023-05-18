import React, { useContext, useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import SignInForm from "../SignInForm/SignInForm";
import { AuthContext } from "../../context/authContext";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const { currentUser } = useContext(AuthContext);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Container fluid>
        <Navbar.Brand href="/">Logo</Navbar.Brand>

        {currentUser ? (
          <>
            <Button variant="primary" onClick={() => navigate("/mypost")}>
              My Posts
            </Button>
            <Button variant="primary" onClick={handleLogOut}>
              Log Out
            </Button>
          </>
        ) : (
          <>
            <Button variant="primary" onClick={handleShow}>
              Account
            </Button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton />
              <Modal.Body>
                <SignInForm />
              </Modal.Body>
            </Modal>
          </>
        )}
      </Container>
    </Navbar>
  );
}

export default NavBar;
