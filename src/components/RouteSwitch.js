import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import Home from "./Home";
import Nav from "./Nav";
const RouteSwitch = () => {
  return (
    <BrowserRouter>
       <Nav></Nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;