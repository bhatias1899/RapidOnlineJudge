import React from "react";
import "./HomePageComponent.css";

import LoginSignupComponent from "../LoginSignupComponent/LoginSignupComponent";

const HomePageComponent = () => {
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
