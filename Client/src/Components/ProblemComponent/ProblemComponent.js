import React, { useEffect, useState } from "react";
import { getProblems } from "../../Actions/ProblemAction";
import { useDispatch, useSelector } from "react-redux";
import CompilerComponent from "../CompilerComponent/CompilerComponent";
import parse from "html-react-parser";
import "./ProblemComponent.css";
import { useNavigate } from "react-router-dom";
const ProblemComponent = ({ onlyCompiler }) => {
  const [content, setContent] = useState();

  const problemData = useSelector((state) => state.problem.problemsData[0]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let id = window.location.pathname.split("/")[2];
    dispatch(getProblems(id));
  }, []);

  return (
    <>
      <button
        className="pos-abs"
        onClick={() => navigate('/dashboard')}
      >{`< Back`}</button>
      <div className="d-flex j-c-s-b problem-container pos-rel">
        {!onlyCompiler && problemData && (
          <div className="problem-description w-50">
            <p className="fw-600">{problemData.title}</p>
            {parse(problemData.description)}
          </div>
        )}
        <div className={`compiler ${onlyCompiler ? "w-100" : "w-50"}`}>
          {" "}
          <CompilerComponent onlyCompiler={onlyCompiler} />
        </div>
      </div>
    </>
  );
};

export default ProblemComponent;
