import React, { useEffect } from "react";
import { getProblems } from "../../Actions/ProblemAction";
import { useDispatch, useSelector } from "react-redux";
import CompilerComponent from "../CompilerComponent/CompilerComponent";
import parse from 'html-react-parser';
import "./ProblemComponent.css";
const ProblemComponent = () => {
  const problemData = useSelector((state) => state.problem.problemsData[0]);
  const dispatch = useDispatch();
  useEffect(() => {
    let id = window.location.pathname.split("/")[2];
    dispatch(getProblems(id));
  }, []);
  return (
    <div className="d-flex j-c-s-b pd-2">
      {problemData && (
        <div className="problem-description w-50">
          <p>{problemData.title}</p>
          {parse(problemData.description)}
        </div>
      )}
      <div className="compiler w-50">
        {" "}
        <CompilerComponent />
      </div>
    </div>
  );
};

export default ProblemComponent;
