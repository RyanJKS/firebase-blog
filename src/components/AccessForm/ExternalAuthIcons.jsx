import React from "react";
import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import { auth, googleProvider } from "../../config/firebaseConfig";
import { signInWithPopup } from "firebase/auth";

function ExternalAuthIcons() {
  const googleAuth = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div
      className="d-flex flex-row align-items-center justify-content-center"
      style={{ width: "100%" }}
    >
      <MDBBtn tag="a" size="m">
        <MDBIcon fab icon="facebook-f" />
      </MDBBtn>

      <MDBBtn tag="a" size="m">
        <MDBIcon fab icon="twitter" />
      </MDBBtn>

      <MDBBtn tag="a" size="m" onClick={googleAuth}>
        <MDBIcon fab icon="google" />
      </MDBBtn>

      <MDBBtn tag="a" size="m">
        <MDBIcon fab icon="github" />
      </MDBBtn>
    </div>
  );
}

export default ExternalAuthIcons;
