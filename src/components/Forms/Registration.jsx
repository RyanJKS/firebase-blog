import React, { useRef } from "react";
import { MDBTabsPane, MDBBtn, MDBInput } from "mdb-react-ui-kit";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import ExternalAuthIcons from "./ExternalAuthIcons";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Registration({ currentTab, switchTab }) {
  const navigate = useNavigate();
  const signUpUsername = useRef(null);
  const signUpEmail = useRef(null);
  const signUpPassword = useRef(null);

  //CREATE NEW USER
  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        signUpEmail.current.value,
        signUpPassword.current.value
      ).catch((err) => console.log(err));
      await updateProfile(auth.currentUser, {
        displayName: signUpUsername.current.value,
      }).catch((err) => console.log(err));
      Swal.fire(
        "Congratulations!",
        "You have successfully signed up. You can now create some blogs!",
        "success"
      ).then(() => {
        navigate("/");
        window.location.reload();
      });
    } catch (err) {
      console.error(err);
      alert("Please make sure your password is more than 6 characters.");
    }
  };
  return (
    <MDBTabsPane show={currentTab === "tab2"}>
      <div className="text-center mb-2">
        <p>Sign up with:</p>

        <ExternalAuthIcons />

        <p className="text-center mt-3">or:</p>
      </div>
      <MDBInput
        wrapperClass="mb-4"
        label="Username"
        type="text"
        ref={signUpUsername}
      />
      <MDBInput
        wrapperClass="mb-4"
        label="Email"
        type="email"
        ref={signUpEmail}
      />

      <MDBInput
        wrapperClass="mb-4"
        label="Password"
        type="password"
        ref={signUpPassword}
      />

      <MDBBtn className="mb-4 w-100" onClick={signUp}>
        Sign up
      </MDBBtn>
      <p className="text-center">
        Already a member?{" "}
        <a href="#!" onClick={() => switchTab("tab1")}>
          Sign In
        </a>
      </p>
    </MDBTabsPane>
  );
}

export default Registration;
