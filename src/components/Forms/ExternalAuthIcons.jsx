import React from "react";
import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import {
  auth,
  facebookProvider,
  githubProvider,
  googleProvider,
} from "../../config/firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function ExternalAuthIcons() {
  const navigate = useNavigate();

  const googleAuth = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      Swal.fire("Success!", "You have successfully signed in.", "success").then(
        () => {
          navigate("/");
        }
      );
    } catch (err) {
      console.error(err);
      Swal.fire(
        "Oops...!",
        "Account already exists under different authentication. Please use another authentication.",
        "error"
      );
    }
  };
  const githubAuth = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
      Swal.fire("Success!", "You have successfully signed in.", "success").then(
        () => {
          navigate("/");
        }
      );
    } catch (err) {
      Swal.fire(
        "Oops...!",
        "Account already exists under different authentication. Please use another authentication.",
        "error"
      );
    }
  };
  const facebookAuth = async () => {
    try {
      await signInWithPopup(auth, facebookProvider);
      Swal.fire("Success!", "You have successfully signed in.", "success").then(
        () => {
          navigate("/");
        }
      );
    } catch (err) {
      console.error(err);
      Swal.fire(
        "Oops...!",
        "Account already exists under different authentication. Please use another authentication.",
        "error"
      );
    }
  };
  return (
    <div
      className="d-flex flex-row align-items-center justify-content-center"
      style={{ width: "100%" }}
    >
      <MDBBtn tag="a" size="m" onClick={facebookAuth}>
        <MDBIcon fab icon="facebook-f" />
      </MDBBtn>

      <MDBBtn tag="a" size="m">
        <MDBIcon fab icon="twitter" />
      </MDBBtn>

      <MDBBtn tag="a" size="m" onClick={googleAuth}>
        <MDBIcon fab icon="google" />
      </MDBBtn>

      <MDBBtn tag="a" size="m" onClick={githubAuth}>
        <MDBIcon fab icon="github" />
      </MDBBtn>
    </div>
  );
}

export default ExternalAuthIcons;
