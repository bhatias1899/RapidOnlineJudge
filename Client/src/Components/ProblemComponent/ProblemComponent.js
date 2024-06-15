import React, { useEffect, useState } from "react";
import { getProblems } from "../../Actions/ProblemAction";
import { useDispatch, useSelector } from "react-redux";
import CompilerComponent from "../CompilerComponent/CompilerComponent";
import parse from "html-react-parser";
import "./ProblemComponent.css";
const ProblemComponent = ({ onlyCompiler }) => {
  const [content, setContent] = useState();

  const problemData = useSelector((state) => state.problem.problemsData[0]);
  const dispatch = useDispatch();
  useEffect(() => {
    let id = window.location.pathname.split("/")[2];
    dispatch(getProblems(id));
  }, []);
  

  return (
    <div className="d-flex j-c-s-b pd-2 pos-rel">
      {!onlyCompiler && problemData && (
        <div className="problem-description w-50">
          <p className="fw-600">{problemData.title}</p>
          {parse(problemData.description)}
        </div>
      )}
      <div className={`compiler ${onlyCompiler ? "w-100" : "w-50"}`}>
        {" "}
        <CompilerComponent
          onlyCompiler={onlyCompiler}
        />
      </div>
      
    </div>
  );
};

export default ProblemComponent;
