import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import MyPost from "./MyPost";
import Account from "./Account";

function RoutingPaths() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/mypost" element={<MyPost />} />
      <Route exact path="/account" element={<Account />} />
      <Route exact path="/*" element={<Home />} />
    </Routes>
  );
}

export default RoutingPaths;
