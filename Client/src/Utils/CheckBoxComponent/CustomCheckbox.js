import React from "react";
import allImages from "../../allImages";
import "./CustomCheckbox.css";

const CustomCheckbox = ({ checked, handleClick }) => {
  return (
    <div
      onClick={handleClick}
      className={`checkbox-container cur-pointer ${checked ? "checked" : ""}`}
    >
      {checked && <img src={allImages.tick}></img>}
    </div>
  );
};

export default CustomCheckbox;
