import React, { useRef, useState } from "react";
import "./FormComponent.css";
const FormComponent = ({ title, fields, buttons, handleEvents }) => {
  const refForm = useRef(null);

  const [updatedfields, setFields] = useState(fields);

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
    <div className="form-container" ref={refForm}>
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

      {buttons?.map((i) => {
        return i.type === "Button" ? (
          <button
            className="form-button cur-pointer m-r-1"
            onClick={() => handleEvents(i.name, updatedfields)}
          >
            {i.name}
          </button>
        ) : (
          <div
            className="app-links cur-pointer f-12"
            onClick={() => handleEvents(i.name, updatedfields)}
          >
            {i.name}
          </div>
        );
      })}
    </div>
  );
};
export default FormComponent;
