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
import CustomCheckbox from "../../Utils/CheckBoxComponent/CustomCheckbox";

const Dashboard = () => {
  const userData = useSelector((state) => state.user.userData.user);
  console.log(userData, "user data");
  const problemsData = useSelector((state) => state.problem.problemsData);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profileRef = useRef();

  const [dialogModalOpen, setDialogModalOpen] = useState(false);
  const [openCheckBoxes, setOpenCheckboxes] = useState(false);
  const [checkedArray, setCheckedArray] = useState([]);
  const [contestSubmitted, setContestSubmitted] = useState(false);

  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    PROBLEM_FIELDS.forEach((i) => (i.value = ""));
  }, [dialogModalOpen]);

  useEffect(() => {
    dispatch(getProblems());
  }, []);

  useEffect(() => {
    if (problemsData) {
      setCheckedArray(new Array(problemsData?.length).fill(false));
    }
  }, [problemsData]);

  useEffect(() => {
    if (!dialogModalOpen) {
      setOpenCheckboxes(false);
      setCheckedArray(new Array(problemsData?.length).fill(false));
    }
  }, [dialogModalOpen]);

  const Navigate = useNavigate();

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
    if (!openCheckBoxes) {
      navigate(`/problem/${i._id}`);
    }
  };

  const handleProfileIconClick = () => {
    setOpenDrawer(true);
  };

  const handleContestClick = () => {
    if (openCheckBoxes) {
      setContestSubmitted(true);
      setOpenCheckboxes(false);
      setCheckedArray(new Array(problemsData?.length).fill(false));
    } else {
      setOpenCheckboxes(true);
    }
  };

  const submitContest = () => {
    setContestSubmitted(true);
    setDialogModalOpen(false);
  };
  const handleCheckedArray = (e, ind) => {
    e.stopPropagation();
    setCheckedArray([
      ...checkedArray.slice(0, ind),
      !checkedArray[ind],
      ...checkedArray.slice(ind + 1),
    ]);
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
        {userData.profession === "Recruiter" ||
        userData.profession === "admin" ? (
          <>
            <button onClick={() => setDialogModalOpen(true)}>
              + Add a problem
            </button>
            <button onClick={() => handleContestClick(true)} className="m-l-1">
              {openCheckBoxes ? "Submit Contest" : "Create Contest"}
            </button>
          </>
        ) : (
          <button onClick={() => Navigate("/compiler")} className="m-l-1">
            Open Compiler
          </button>
        )}
      </div>
      {contestSubmitted ? (
        <div>
          <div className="d-flex j-c-c a-i-c">
            <h1>Your Contest Is Created Succesfully</h1>
          </div>
          <div className="d-flex j-c-c a-i-c m-t-1">
            <button onClick={() => setContestSubmitted(false)}>
              Back to Problem
            </button>
          </div>
        </div>
      ) : problemsData ? (
        <ol>
          {problemsData.map((i, ind) => (
            <li className="cur-pointer" onClick={() => handleProblem(i)}>
              {openCheckBoxes && (
                <CustomCheckbox
                  checked={checkedArray[ind]}
                  handleClick={(e) => {
                    handleCheckedArray(e, ind);
                  }}
                />
              )}
              <span>{ind + 1}</span>
              <span>{i.title}</span>
              <span>{i.difficulty}</span>
              <span>{i.status}</span>
            </li>
          ))}
        </ol>
      ) : (
        <></>
      )}
      {dialogModalOpen && (
        
        <div className="modal-container w-50">
          <div className="close" onClick={() => setDialogModalOpen(false)}>
            &times;
          </div>
          {openCheckBoxes ? (
            <div className="selected-problems">
              {problemsData
                .filter((i, ind) => checkedArray[ind])
                .map((i) => (
                  <h3>{i.title}</h3>
                ))}
              {/* <div className="set-timing"> Set Timings</div> */}
              <button
                className="form-button cur-pointer m-r-1"
                onClick={submitContest}
              >
                Submit
              </button>
            </div>
          ) : (
            <FormComponent
              title={"Update Your Profile"}
              fields={PROBLEM_FIELDS}
              buttons={PROBLEM_BUTTONS}
              handleEvents={handleEvents}
              wrapperClass={"w-100-4"}
            />
          )}
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
