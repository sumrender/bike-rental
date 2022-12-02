import React from "react";
import Navbar from "./components/nav/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Dashboard from "./components/Dashboard/Dashboard";
import Admin from "./components/admin/Admin";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
};

export default App;
