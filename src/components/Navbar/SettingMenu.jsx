import React, { useContext } from "react";
import {
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
} from "mdb-react-ui-kit";
import { deleteUser, signOut } from "firebase/auth";
import { auth, db } from "../../config/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { doc, deleteDoc } from "firebase/firestore";

export default function SettingMenu() {
  const navigate = useNavigate();
  const { currentUser, posts } = useContext(AuthContext);

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const deleteAccount = async () => {
    const userInfo = auth?.currentUser;
    try {
      posts.forEach(async (document) => {
        if (document.userId === currentUser) {
          const docRef = doc(db, "posts", document.id);
          await deleteDoc(docRef).catch((err) => console.log(err));
        }
      });

      await deleteUser(userInfo).catch((err) => console.log(err));

      navigate("/");
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <MDBDropdown>
      <MDBDropdownToggle>Settings</MDBDropdownToggle>
      <MDBDropdownMenu>
        <MDBDropdownItem link childTag="button" onClick={deleteAccount}>
          Delete Account
        </MDBDropdownItem>
        <MDBDropdownItem link childTag="button" onClick={handleLogOut}>
          Log Out
        </MDBDropdownItem>
      </MDBDropdownMenu>
    </MDBDropdown>
  );
}
