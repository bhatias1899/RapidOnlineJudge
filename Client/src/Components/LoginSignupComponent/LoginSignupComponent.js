import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormComponent from "../FormComponent/FormComponent";
import {
  LOGIN_BUTTONS,
  LOGIN_FIELDS,
  SIGNIN_BUTTONS,
  SIGNIN_FIELDS,
} from "../../Constants";
import { useDispatch, useSelector } from "react-redux";
import { createUser, loginUser } from "../../Actions/UserAction";
import { allFieldsFilled, fieldsToUserMapping } from "../../common";

const LoginSignupComponent = () => {
  const [isNewUser, setIsNewUser] = useState(false);
  const [fields, setFields] = useState(LOGIN_FIELDS);
  const [buttons, setButtons] = useState(LOGIN_BUTTONS);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userData);

  useEffect(() => {
    if (user && typeof user === "object") {
      navigate("/dashboard");
    } else {
      setFields(isNewUser ? SIGNIN_FIELDS : LOGIN_FIELDS);
      setButtons(isNewUser ? SIGNIN_BUTTONS : LOGIN_BUTTONS);
    }
  }, [user]);

  const handleEvents = (name,updatedfields) => {
    if (name === "Log In") handleLogIn(updatedfields);
    else if (name === "Forgot password") handleForgotPassword();
    else if (name === "Sign Up") handleSignUp(updatedfields);
   else changeTab();
  };
  const handleLogIn = (updatedFields) => {
    // getValues(ref);

    if (allFieldsFilled(updatedFields)) {
      
      dispatch(loginUser(fieldsToUserMapping(updatedFields)));
    } else alert("please fill all madatory fields");
  };
  const handleSignUp = (updatedFields) => {
    // getValues(ref);

    if (allFieldsFilled(updatedFields)) {
      dispatch(createUser(fieldsToUserMapping(updatedFields)));
    } else alert("please fill all madatory fields");
  };
  const handleForgotPassword = () => {
    console.log("forgot password clicked");
  };
  const changeTab = () => {
    setFields(isNewUser ? LOGIN_FIELDS : SIGNIN_FIELDS);
    setButtons(isNewUser ? LOGIN_BUTTONS : SIGNIN_BUTTONS);
    setIsNewUser(!isNewUser);
  };

  

  
  return (
    <FormComponent
      title={isNewUser ? "login" : "signUp"}
      fields={fields}
      buttons={buttons}
      handleEvents={handleEvents}
    />
  );
};
export default LoginSignupComponent;
