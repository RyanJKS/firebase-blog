import React, { useState } from "react";
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
} from "mdb-react-ui-kit";
import Login from "./Login";
import Registration from "./Registration";

function Access() {
  const [justifyActive, setJustifyActive] = useState("tab2");

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }
    setJustifyActive(value);
  };
  return (
    <div className="form-container">
      <MDBContainer className="access-form p-2 d-flex flex-column">
        <MDBTabs
          pills
          justify
          className="mb-3 d-flex flex-row justify-content-between w-100"
        >
          {/*SELECTION TAB */}
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
        <MDBTabsContent className="w-100">
          {/*LOGIN FORM */}
          <Login currentTab={justifyActive} switchTab={setJustifyActive} />
          {/*REGISTRATION FORM */}
          <Registration
            currentTab={justifyActive}
            switchTab={setJustifyActive}
          />
        </MDBTabsContent>
      </MDBContainer>
    </div>
  );
}

export default Access;
