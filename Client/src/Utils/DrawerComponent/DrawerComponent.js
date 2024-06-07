import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser, logoutUser } from "../../Actions/UserAction";
import "./DrawerComponent.css";

const DrawerComponent = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (props?.open) {
      document.addEventListener("click", (e) => {
        if (
          popperRef.current &&
          !popperRef.current.contains(e.target) &&
          !props.buttonRef.current.contains(e.target)
        ) {
          props.handleClose();
        }
      });
    }
    return () => {
      document.removeEventListener("click", () => {
        console.log("event removed");
      });
    };
  });
  const popperRef = useRef(null);
  useEffect(() => {
    if (props.open) {
      const button = props.buttonRef.current;
      const popper = popperRef.current;

      if (button && popper) {
        const { top, bottom, right, left } = button.getBoundingClientRect();
        const buttons = popper.getElementsByTagName("button");
        for (let i = 0; i < buttons.length; i++) {
          buttons[i].style.top = `${
            i > 0
              ? buttons[i - 1].getBoundingClientRect().bottom + 16
              : bottom + 16
          }px`;

          buttons[i].style.left = `${
            left - (buttons[i].getBoundingClientRect().width - 24) / 2
          }px`;
        }
      }
    }
  }, [props.open]);
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  const handleDelete = () => {
    dispatch(deleteUser());
  };
  const handleViewProfile = () => {
    navigate("/profile");
  };
  return (
    props.open && (
      <div ref={popperRef} className="profile-dropdown">
        <button className="pos-abs nowrap" onClick={handleLogout}>
          Log out
        </button>
        <button className="pos-abs nowrap" onClick={handleDelete}>
          Delete Account
        </button>
        <button className="pos-abs nowrap" onClick={handleViewProfile}>
          View Profile
        </button>
      </div>
    )
  );
};

export default DrawerComponent;
