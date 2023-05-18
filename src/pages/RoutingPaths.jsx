import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import MyPost from "./MyPost";

function RoutingPaths() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/mypost" element={<MyPost />} />
    </Routes>
  );
}

export default RoutingPaths;
