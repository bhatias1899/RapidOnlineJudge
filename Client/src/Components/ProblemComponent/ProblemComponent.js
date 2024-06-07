import React, { useEffect } from "react";
import { getProblems } from "../../Actions/ProblemAction";
import { useDispatch, useSelector } from "react-redux";

const ProblemComponent = () => {
  const problemData = useSelector((state) => state.problem.problemsData[0]);
  const dispatch=useDispatch();
  useEffect(() => {
    let id = window.location.pathname.split("/")[2];
    dispatch(getProblems(id));
  }, []);
  return (
    <div className="d-flex">
      <div className="problem-description">{problemData.description}</div>
      <div className="compiler"> compiler will be here</div>
    </div>
  );
};

export default ProblemComponent;
