import React, { useEffect, useState } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import axios from "axios";
import "./CompilerComponent.css";
import { stubCodes } from "../../Constants";

const CompilerComponent = () => {
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

  const [inputOpen, setInputOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setCode(stubCodes[language]);
  }, [language]);

  useEffect(() => {
    if (output) {
      setIsLoading(false);
    }
  }, [output]);

  const handleSubmit = async () => {
    setOutput("");
    setIsLoading(true);
    setInputOpen(true);
    const payload = {
      language: language,
      code,
      input: inputValue,
    };

    try {
      const { data } = await axios.post("http://localhost:5000/run", payload);
      console.log(data);
      setOutput(data.output);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleTestcaseClick = () => {
    setInputOpen(!inputOpen);
  };

  return (
    <div className="compiler-container h-100">
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
      <div className={`compiler-editor  m-b-1 ${!inputOpen ? "h-80" : "h-50"}`}>
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
            caretColor: "#fafafa",
            height: "100%",
            overflowY: "auto",
            borderRadius: ".5rem",
          }}
        />
      </div>

      {inputOpen && (
        <div className="d-flex j-c-s-b h-30 m-b-1">
          <div className="input-box h-100 w-50">
            <div className="f-14 fw-500">Inputs:</div>
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-100 input-textarea"
            />
          </div>
          <div className="h-100 w-50">
            <div className="f-14 fw-500">Outputs:</div>
            <div className="outputbox w-100">
              <p
                style={{
                  fontFamily: "monospace",
                  fontSize: 14,
                  color: "#000000",
                  margin: 0,
                  wordBreak: "break-all",
                  overflowX: "hidden",
                  overflowY: "scroll",
                  height: "inherit",
                }}
              >
                {isLoading ? "Loading..." : output}
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="d-flex j-c-f-e">
        <button className="sample-testcase m-r-1" onClick={handleTestcaseClick}>
          <div className="f-14">Sample Testcase</div>
        </button>
        <button onClick={handleSubmit} className="d-flex a-i-c" type="button">
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
          <div className="f-14">Run</div>
        </button>
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
          <div className="f-14">Submit</div>
        </button>
      </div>
    </div>
  );
};

export default CompilerComponent;
