import React, { useEffect } from "react";
import "./HomePageComponent.css";

import LoginSignupComponent from "../LoginSignupComponent/LoginSignupComponent";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomePageComponent = () => {
  const userData=useSelector((state)=>state.user.userData)
  const Navigate=useNavigate();
  useEffect(()=>{
    if(userData){
      Navigate("/dashboard")
    }else{
      Navigate("/login")
    }
  },[userData])
  return (
    <div className="home-conatiner">
      <div className="img-left"></div>
      <div className="login-right d-flex-center">
        <LoginSignupComponent />
      </div>
    </div>
  );
};
export default HomePageComponent;
