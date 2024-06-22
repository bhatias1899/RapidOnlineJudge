import React, { useEffect, useRef, useState } from "react";
import "./FormComponent.css";
import {
  BtnBold,
  BtnItalic,
  Editor,
  EditorProvider,
  Toolbar,
} from "react-simple-code-editor";
import CustomEditor from "../EditorComponent/EditorComponent";
const FormComponent = ({
  title,
  fields,
  buttons,
  handleEvents,
  wrapperClass,
}) => {
  const refForm = useRef(null);
  const [html, setHtml] = useState("Add Your Description Here");
  const [updatedfields, setFields] = useState(fields);
  // const [buttons, setButtons] = useState(fields);

  console.log(title, fields, buttons, handleEvents, wrapperClass, "@111");

  useEffect(() => {
    setFields(fields);
  }, [fields, buttons]);
  const handleChange = (e, ind) => {
    console.log(e.target);
    let temp = [...updatedfields];
    temp[ind].value = e.target.value;

    if (e.target.type === "file") {
      temp[ind].filedata = {
        name: e.target.files[0].name,
        file: e.target.files[0],
      };
    }
    setFields(temp);
  };

  return (
    <div
      className={`form-container ${wrapperClass ? wrapperClass : ""}`}
      ref={refForm}
    >
      {updatedfields?.map((i, ind) => {
        return (
          <div className="input-container">
            <div className="label">{i.name}</div>
            {i.type === "radio" ? (
              <div className="d-flex cur-pointer">
                {i.options.map((option) => {
                  return (
                    <>
                      <input
                        type={i.type}
                        name={i.name}
                        value={option}
                        checked={option === i.value}
                        onChange={(e) => handleChange(e, ind)}
                      />
                      <label>{option}</label>
                    </>
                  );
                })}
              </div>
            ) : i.type === "editor" ? (
              <CustomEditor
                value={i.value}
                onChange={handleChange}
                index={ind}
              />
            ) : (
              <input
                type={i.type}
                id={i?.name}
                autocomplete="new-password"
                value={i.value}
                onChange={(e) => handleChange(e, ind)}
              />
            )}
          </div>
        );
      })}
      <div className="d-flex j-c-c">
        {buttons?.map((i) => {
          return (
            i.type === "Button" && (
              <button
                className="form-button cur-pointer m-r-1"
                onClick={() => handleEvents(i.name, updatedfields)}
              >
                {i.name}
              </button>
            )
          );
        })}
      </div>
      
        {buttons?.map((i) => {
          return (
            i.type !== "Button" && (
              <div
                className="app-links cur-pointer f-14 m-b-8 t-a-c"
                onClick={() => handleEvents(i.name, updatedfields)}
              >
                {i.name}
              </div>
            )
          );
        })}
    </div>
  );
};
export default FormComponent;
