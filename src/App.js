import { useState } from "react";
import "./App.css";

import NavBar from "./components/Navbar/Navbar";

import Grid from "@mui/material/Grid";
import PostCard from "./components/PostCard/PostCard";
import Footer from "./components/Footer";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import Card from "react-bootstrap/Card";
import { AuthContextProvider } from "./context/authContext";
import RoutingPaths from "./pages/RoutingPaths";
import PCard from "./components/PostCard/PCard";

function App() {
  const [open, setOpen] = useState(true);

  return (
    <>
      <AuthContextProvider>
        <div className="App">
          <NavBar />
          <div className="p-1 my-5" />
          <>
            <Button
              onClick={() => setOpen(!open)}
              aria-controls="example-collapse-text"
              aria-expanded={open}
            >
              Overview
            </Button>
            <Collapse in={open}>
              <div id="example-collapse-text d-flex align-items-center justify-content-center">
                <Card body>
                  Anim pariatur cliche reprehenderit, enim eiusmod high life
                  accusamus terry richardson ad squid. Nihil anim keffiyeh
                  helvetica, craft beer labore wes anderson cred nesciunt
                  sapiente ea proident.
                </Card>
              </div>
            </Collapse>
          </>
          <RoutingPaths />
          {/* <Grid container spacing={3}>
            {posts?.map((post, index) => (
              <PostCard
                key={index}
                title={post.postTitle}
                description={post.postDescription}
                id={post.id}
              />
            ))}
          </Grid>
        <PCard /> */}
        </div>

        <Footer />
      </AuthContextProvider>
    </>
  );
}

export default App;
