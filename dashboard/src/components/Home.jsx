import React from "react";

import Dashboard from "./Dashboard";
import TopBar from "./TopBar";

import { useState , useEffect } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";


const Home = () => {

  useEffect(() => {
     // Make an API call to verify token validity
    const checkAuth = async () => {
      try {
          const res = await axios.get("http://localhost:3002/auth/check", { withCredentials: true });
          if (!res.data.loggedIn) {
            window.location.href = "http://localhost:5173/login"; 
          }
      } catch (err) {
      // Token missing or invalid → redirect

          window.location.href = "http://localhost:5173/login";
      }

    };

    checkAuth();
  }, []);





  return (
    <>
      <ToastContainer position="top-center"/>
      <TopBar />
      <Dashboard /> 
    </>
  );
};

export default Home;