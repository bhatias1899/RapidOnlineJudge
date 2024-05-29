import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormComponent from "../FormComponent/FormComponent";
import { SIGNIN_FIELDS, UPDATE_BUTTONS } from "../../Constants";
import { fillUserData } from "../../common";
import { updateUser } from "../../Actions/UserAction";

const ProfileComponent = () => {
  const user = useSelector((state) => state.user.userData.user);
  const dispatch = useDispatch();
  const [updateProfile, setUpdateProfile] = useState(false);

  const handleEvents = (name,ref) => {
    if (name==="Update") {
      dispatch(updateUser());
      setUpdateProfile(false);
    } else {
      setUpdateProfile(false);
    }
  };
  return updateProfile ? (
    <FormComponent
      title={"Update Your Profile"}
      fields={fillUserData(SIGNIN_FIELDS, user).filter(
        (i) => !i.name.toLowerCase().includes("password"),
      )}
      buttons={UPDATE_BUTTONS}
      handleEvents={handleEvents}
    />
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
      <button onClick={()=>{setUpdateProfile(true)}}>
        Update
      </button>
    </>
  );
};
export default ProfileComponent;
