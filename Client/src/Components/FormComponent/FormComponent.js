import React, { useRef } from "react";
import "./FormComponent.css";
const FormComponent = ({ title, fields, buttons, handleEvents }) => {
  const refForm = useRef(null);

  return (
    <div className="form-container" ref={refForm}>
      {fields?.map((i, index) => {
        return (
          <div className="input-container">
            <div className="label">{i.name}</div>
            {i.type === "radio" ? (
              <div className="d-flex cur-pointer">
                {i.options.map((option) => {
                  return (
                    <>
                      <input type={i.type} name={i.name} value={option} />
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
                onChange={()=>{handleEvents(refForm)}}
              />
            )}
          </div>
        );
      })}

      {buttons?.map((i) => {
        return i.type === "Button" ? (
          <button
            className="form-button cur-pointer"
            onClick={() => handleEvents(i.name, refForm)}
          >
            {i.name}
          </button>
        ) : (
          <div
            className="app-links cur-pointer f-12"
            onClick={() => handleEvents(i.name, refForm)}
          >
            {i.name}
          </div>
        );
      })}
    </div>
  );
};
export default FormComponent;
