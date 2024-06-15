import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser, logoutUser, updateUser } from "../../Actions/UserAction";
import FormComponent from "../FormComponent/FormComponent";
import { PROBLEM_BUTTONS, PROBLEM_FIELDS } from "../../Constants";
import {
  allFieldsFilled,
  fieldsToUserMapping,
  payloadCreation,
} from "../../common";
import { createProblem, getProblems } from "../../Actions/ProblemAction";
import allImages from "../../allImages";
import DrawerComponent from "../../Utils/DrawerComponent/DrawerComponent";
import "./Dashboard.css";

const Dashboard = () => {
  const userData = useSelector((state) => state.user.userData.user);
  const problemsData = useSelector((state) => state.problem.problemsData);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profileRef = useRef();

  const [dialogModalOpen, setDialogModalOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(()=>{
    PROBLEM_FIELDS.forEach(i=>i.value="");
  },[dialogModalOpen])

  useEffect(()=>{
    dispatch(getProblems())
  },[])

  
  const Navigate=useNavigate();

  const handleEvents = (name, updatedFields) => {
    if (name.includes("Create")) {
      if (allFieldsFilled(updatedFields)) {
        dispatch(createProblem(payloadCreation(updatedFields, "form-data")));
      }
      setDialogModalOpen(false);
    } else {
      setDialogModalOpen(false);
    }
  };

  const handleProblem = (i) => {
    navigate(`/problem/${i._id}`);
  };

  const handleProfileIconClick = () => {
    setOpenDrawer(true);
  };

  return (
    <div className="h-100 o-y-auto">
      <div
        className="profile-container cur-pointer d-flex j-c-s-b"
        ref={profileRef}
        onClick={handleProfileIconClick}
      >
        <img src={allImages.gear}></img>
      </div>
      <div className="d-flex j-c-c">
      <button onClick={() => setDialogModalOpen(true)}>+ Add a problem</button>
      <button onClick={() => Navigate('/compiler')} className="m-l-1">Open Compiler</button>
      </div>
      {problemsData && (
        <ol>
          {problemsData.map((i, ind) => (
            <li className="cur-pointer" onClick={() => handleProblem(i)}>
              <span>{ind + 1}</span>
              <span>{i.title}</span>
              <span>{i.difficulty}</span>
              <span>{i.status}</span>
            </li>
          ))}
        </ol>
      )}
      {dialogModalOpen && (
        <div className="modal-container w-50">
          <div className="close" onClick={() => setDialogModalOpen(false)}>
            &times;
          </div>
          <FormComponent
            title={"Update Your Profile"}
            fields={PROBLEM_FIELDS}
            buttons={PROBLEM_BUTTONS}
            handleEvents={handleEvents}
            wrapperClass={"w-100-4"}
          />
        </div>
      )}

      <DrawerComponent
        open={openDrawer}
        buttonRef={profileRef}
        handleClose={() => setOpenDrawer(false)}
      />
    </div>
  );
};

export default Dashboard;
