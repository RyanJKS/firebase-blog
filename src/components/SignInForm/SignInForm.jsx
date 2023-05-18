import React, { useState, useRef } from "react";
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "../../config/firebaseConfig";

function SignInForm() {
  const [justifyActive, setJustifyActive] = useState("tab1");

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }
    setJustifyActive(value);
  };

  const googleAuth = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  const LoginIcons = () => {
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
  };

  const signInEmail = useRef(null);
  const signInPassword = useRef(null);
  const signUpUsername = useRef(null);
  const signUpEmail = useRef(null);
  const signUpPassword = useRef(null);

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        signInEmail.current.value,
        signInPassword.current.value
      );
    } catch (err) {
      console.error(err);
      alert("Invalid Sign In Credentials");
    }
  };
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
    } catch (err) {
      console.error(err);
      alert("Please make sure your password is more than 6 characters.");
    }
  };

  return (
    <MDBContainer className="p-2 d-flex flex-column w-100">
      <MDBTabs
        pills
        justify
        className="mb-3 d-flex flex-row justify-content-between"
      >
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleJustifyClick("tab1")}
            active={justifyActive === "tab1"}
          >
            Login
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleJustifyClick("tab2")}
            active={justifyActive === "tab2"}
          >
            Register
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      {/* REGISTER TAB */}

      <MDBTabsContent>
        <MDBTabsPane show={justifyActive === "tab1"}>
          <div className="text-center mb-2">
            <p>Sign in with:</p>

            <LoginIcons />

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
            <a href="#!" onClick={() => setJustifyActive("tab2")}>
              Register
            </a>
          </p>
        </MDBTabsPane>

        <MDBTabsPane show={justifyActive === "tab2"}>
          <div className="text-center mb-3">
            <p>Sign up with:</p>

            <LoginIcons />

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
        </MDBTabsPane>
      </MDBTabsContent>
    </MDBContainer>
  );
}

export default SignInForm;
