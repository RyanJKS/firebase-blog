import React, { useRef } from "react";
import { MDBTabsPane, MDBBtn, MDBInput } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import ExternalAuthIcons from "./ExternalAuthIcons";
import Swal from "sweetalert2";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";

function Login({ currentTab, switchTab }) {
  const navigate = useNavigate();

  const signInEmail = useRef(null);
  const signInPassword = useRef(null);

  //LOGIN USER
  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        signInEmail.current.value,
        signInPassword.current.value
      );

      Swal.fire("Success!", "You have successfully signed in.", "success").then(
        () => {
          navigate("/");
        }
      );
    } catch (err) {
      Swal.fire("Oops...!", "Wrong Credentials.", "error");
    }
  };

  return (
    <MDBTabsPane show={currentTab === "tab1"}>
      <div className="text-center mb-2">
        <p>Sign in with:</p>

        <ExternalAuthIcons />

        <p className="text-center mt-3">or:</p>
      </div>
      <MDBInput
        wrapperClass="mb-4"
        type="email"
        label="Email"
        ref={signInEmail}
      />
      <MDBInput
        wrapperClass="mb-4"
        type="password"
        label="Password"
        ref={signInPassword}
      />

      <MDBBtn className="mb-4 w-100" onClick={signIn}>
        Sign in
      </MDBBtn>
      <p className="text-center">
        Not a member?{" "}
        <a href="#!" onClick={() => switchTab("tab2")}>
          Register
        </a>
      </p>
    </MDBTabsPane>
  );
}

export default Login;
