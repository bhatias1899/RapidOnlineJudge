import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormComponent from "../FormComponent/FormComponent";
import { SIGNIN_FIELDS, UPDATE_BUTTONS } from "../../Constants";
import {
  allFieldsFilled,
  fieldsToUserMapping,
  userToFieldsMapping,
} from "../../common";
import { updateUser } from "../../Actions/UserAction";
import "./ProfileComponent.css"
const ProfileComponent = () => {
  const user = useSelector((state) => state.user.userData.user);
  const dispatch = useDispatch();
  const [updateProfile, setUpdateProfile] = useState(false);
  const [fields, setFields] = useState(null);

  useEffect(() => {
    setFields(
      userToFieldsMapping(SIGNIN_FIELDS, user).filter(
        (i) => !i.name.toLowerCase().includes("password"),
      ),
    );
  }, []);

  const handleEvents = (name, updatedfields) => {
    if (name === "Update") {
      if (allFieldsFilled(updatedfields)) {
        dispatch(updateUser(fieldsToUserMapping(updatedfields)));
      }
      setUpdateProfile(false);
    } else {
      setUpdateProfile(false);
    }
  };
  return updateProfile ? (
    <div className="d-flex j-c-c a-i-c">
    <FormComponent
      title={"Update Your Profile"}
      fields={fields}
      buttons={UPDATE_BUTTONS}
      handleEvents={handleEvents}
    />
    </div>
  ) : (
    <>
      <ul>
        {Object.keys(user).map((i) => (
          <span>
            <li>
              <b>{i} :</b> {user[i]}
            </li>
          </span>
        ))}
      </ul>
      <button
        onClick={() => {
          setUpdateProfile(true);
        }}
      >
        Update
      </button>
    </>
  );
};
export default ProfileComponent;
