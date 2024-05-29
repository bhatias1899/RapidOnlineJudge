import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate } from "react-router-dom";
import { deleteUser, logoutUser } from "../../Actions/UserAction";

const Dashboard = () => {
  const userData=useSelector((state)=>state.user.userData.user)
  const dispatch=useDispatch();
  const navigate=useNavigate();
  
  const handleLogout=()=>{
    dispatch(logoutUser());
  }
  const handleDelete=()=>{
    dispatch(deleteUser());
  }
  const handleViewProfile=()=>{
    navigate("/profile");
  }
  
  return (
    <div>
      <h1>
        Welcome {userData.firstname} {userData.lastname}!
      </h1>
      <h5>What are you planning to do today </h5>
      <button onClick={handleLogout}>Log out</button>
      <button onClick={handleDelete}>Delete Account</button>
      <button onClick={handleViewProfile}>View Profile</button>

    </div>
  );
};

export default Dashboard;
