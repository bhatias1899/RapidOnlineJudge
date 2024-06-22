import React, { useEffect, useRef, useState } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import axios from "axios";
import "./CompilerComponent.css";
import { stubCodes } from "../../Constants";
import allImages from "../../allImages";

const CompilerComponent = ({ onlyCompiler }) => {
  const [code, setCode] = useState(`
  // Include the input/output stream library
  #include <iostream> 

  // Define the main function
  int main() { 
      // Output "Hello World!" to the console
      std::cout << "Hello World!"; 
      
      // Return 0 to indicate successful execution
      return 0; 
  }`);
  const [language, setLanguage] = useState("cpp");
  const [output, setOutput] = useState("");
  const [verdicts, setVerdicts] = useState([]);
  const [openModel, setOpenModal] = useState(false);

  const [openIndex, setOpenIndex] = useState(-1);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  


  useEffect(() => {
    setCode(stubCodes[language]);
  }, [language]);

 

  const handleRun = async () => {
    setError("");
    setOutput("");
    setIsLoading(true);
    setOpenIndex(1);
    const payload = {
      language: language,
      code,
      input: inputValue.replaceAll("\n", " "),
    };

    try {
      const { data } = await axios.post("http://localhost:5000/run", payload);
      console.log(data);
      data.success
        ? setOutput(data.stdout)
        : data.stderr
          ? setError(data.stderr)
          : setError(data.err);

      setIsLoading(false);
      
    } catch (error) {
      console.log(error.response);
      setIsLoading(false);

    }
  };

  const handleSubmit = async () => {
    setError("");
    setVerdicts([]);
    setIsLoading(true);
    setOpenIndex(2);
    const payload = {
      language: language,
      code,
      input: inputValue,
      probId: window.location.pathname.split("/")[2],
    };

    try {
      const { data } = await axios.post(
        "http://localhost:5000/submit",
        payload,
      );
      console.log(data);
      data.success
        ? setVerdicts(data.output)
        : data.err.stderr
          ? setError(data.err.stderr)
          : setError(data.err);
      setIsLoading(false);
      
    } catch (error) {
      console.log(error.response);
      setIsLoading(false);

    }
  };

  const handleTestcaseClick = () => {
    openIndex > 0 ? setOpenIndex(-1) : setOpenIndex(0);
  };
  const handleMaximizeClick = () => {
    setOpenModal(!openModel);
  };

  const outputContent = (
    <div className="outputbox w-100 ">
      <p
        style={{
          fontFamily: "monospace",
          fontSize: 14,
          color: "#000000",
          margin: 0,
          wordBreak: "break-all",
          overflowX: "hidden",
          overflowY: "scroll",
          height: "calc(100% - 3rem)",
          padding: "1rem",
        }}
      >
        {isLoading ? "Loading..." : error ? error : output}
      </p>

      <div
        className="pos-abs rt-1 bt-1 cur-pointer"
        onClick={handleMaximizeClick}
      >
        <img
          className="h-16 w-16"
          src={openModel ? allImages.minimize : allImages.maximize}
        />
      </div>
    </div>
  );

  const verdictContent = (
    <div className="outputbox w-100">
      <div className="d-flex fw-wrap pd-1 col-black">
        {isLoading
          ? "Loading..."
          : error
            ? error
            : verdicts.map((i, ind) => (
                <div
                  className={`${i.pass ? "bg-green" : "bg-red"} verdict-chips`}
                >{`TESTCASE ${ind}`}</div>
              ))}
      </div>

      <div
        className="pos-abs rt-1 bt-1 cur-pointer"
        onClick={() => handleMaximizeClick(outputContent)}
      >
        <img
          className="h-16 w-16"
          src={openModel ? allImages.minimize : allImages.maximize}
        />
      </div>
    </div>
  );

  return (
    <div className="compiler-container h-100 ">
      <select
        onChange={(e) => {
          setLanguage(e.target.value);
        }}
        className="dropdown"
      >
        <option value="cpp">C++</option>
        <option value="c">C</option>
        <option value="py">Python</option>
        <option value="java">Java</option>
      </select>
      <div
        className={`compiler-editor  m-b-1 ${openIndex < 0 ? "mh-80" : "mh-50"}`}
      >
        <Editor
          value={code}
          onValueChange={(code) => setCode(code)}
          highlight={(code) => highlight(code, languages.js)}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
            outline: "none",
            border: "none",
            backgroundColor: "#000000",
            caretColor: "#697682",
            height: "100%",
            overflowY: "auto",
            borderRadius: ".5rem",
          }}
        />
      </div>
      {openIndex >= 0 && (
        <div className="d-flex j-c-s-a aic  tab-container">
          <div
            className={`"f-16 f-w-500 cur-pointer  ${
              openIndex === 0 ? "tab-selected" : ""
            }`}
            onClick={() => setOpenIndex(0)}
          >
            Input
          </div>
          <div
            className={`"f-16 f-w-500 m-l-1 cur-pointer  ${
              openIndex === 1 ? "tab-selected" : ""
            }`}
            onClick={() => setOpenIndex(1)}
          >
            Output
          </div>
          <div
            className={`"f-16 f-w-500 m-l-1 ${
              openIndex === 2 ? "tab-selected" : ""
            }`}
          >
            Verdict
          </div>
        </div>
      )}
      {openIndex === 0 ? (
        <div className="d-flex j-c-s-b h-25 m-b-1">
          <div className="input-box h-100 w-100">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-100 input-textarea"
            />
          </div>
        </div>
      ) : openIndex === 1 ? (
        <div className="h-25 w-100">{outputContent}</div>
      ) : openIndex === 2 ? (
        <div className="d-flex j-c-s-b h-25 m-b-1">
          <div className="h-100 w-100">{verdictContent}</div>
        </div>
      ) : (
        <></>
      )}
      <div className="d-flex j-c-f-e a-i-c">
        {!isLoading && openIndex === 2 && (
          <div className="m-r-1">{`${verdicts.filter((i) => i.pass).length}/${
            verdicts.length
          } Testcases Passed`}</div>
        )}
        <button className="sample-testcase m-r-1" onClick={handleTestcaseClick}>
          <div className="f-14 col-white">Sample Testcase</div>
        </button>
        <button onClick={handleRun} className="d-flex a-i-c" type="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 me-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
            />
          </svg>
          <div className="f-14 col-white">Run</div>
        </button>
        {!onlyCompiler && (
          <button
            onClick={handleSubmit}
            type="button"
            className="d-flex m-l-1 a-i-c"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 me-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
              />
            </svg>
            <div className="f-14 col-white">Submit</div>
          </button>
        )}
      </div>
      <dialog className="pos-abs dialogoutput" open={openModel}>
        {openIndex == 1 ? outputContent : verdictContent}
      </dialog>
    </div>
  );
};

export default CompilerComponent;
