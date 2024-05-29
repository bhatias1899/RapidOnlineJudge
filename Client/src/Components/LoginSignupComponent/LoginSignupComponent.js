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

const LoginSignupComponent = () => {
  const [isNewUser, setIsNewUser] = useState(false);
  const [fields, setFields] = useState(LOGIN_FIELDS);
  const [buttons, setButtons] = useState(LOGIN_BUTTONS);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userData);

  useEffect(() => {
    if (user && typeof user=== "object") {
      navigate("/dashboard");
    } else {
      setFields(isNewUser ? SIGNIN_FIELDS : LOGIN_FIELDS);
      setButtons(isNewUser ? SIGNIN_BUTTONS : LOGIN_BUTTONS); 
    }
  }, [user]);

  const handleEvents = (name, ref) => {
    if (name === "Log In") handleLogIn(ref);
    else if (name === "Forgot password") handleForgotPassword();
    else if (name === "Sign Up") handleSignUp(ref);
    else changeTab();
  };
  const handleLogIn = (ref) => {
    getValues(ref);

    if (allFieldsFilled()) {
      let payload = {
        email: fields[0].value,
        password: fields[1].value,
      };
      dispatch(loginUser(payload));
    } else alert("please fill all madatory fields");
  };
  const handleSignUp = (ref) => {
    getValues(ref);
    if (allFieldsFilled()) {
      let payload = {
        firstname: fields[0].value,
        lastname: fields[1].value,
        email: fields[2].value,
        password: fields[3].value,
        profession: fields[5].value,
        contact: fields[6].value,
      };
      dispatch(createUser(payload));
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

  const allFieldsFilled = () => {
    return fields.filter((i) => i.isRequired && !i.value)?.length === 0;
  };

  const getValues = (ref) => {
    let inputs = ref.current.getElementsByClassName("input-container");
    let newFields = [...fields];
    for (let i = 0; i < inputs.length; i++) {
      let ele = inputs[i].getElementsByTagName("input");
      if (ele[0].type === "radio") {
        for (let j = 0; j < ele.length; j++) {
          if (ele[j].checked) {
            newFields[i].value = ele[j].value;
            break;
          }
        }
      } else {
        newFields[i].value = ele[0].value;
      }
    }
    setFields(newFields);
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
