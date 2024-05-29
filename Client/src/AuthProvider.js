import React, { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, getUserData } from "./Actions/UserAction";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch=useDispatch();

  useEffect(() => {
    if(isLoading){
      dispatch(fetchProfile(changeStates));
    }
  }, []);

  const changeStates=(user)=>{
    setIsLoading(false);
  }


  return (
    <AuthContext.Provider >
      {isLoading ? <span>Loading...</span> : children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
