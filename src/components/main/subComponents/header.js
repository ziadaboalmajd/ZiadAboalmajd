import React, { useContext } from "react";
import { FaBars } from "react-icons/fa";
import { AccountContext } from "../../user/accountContext";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import classes from "./headNside.module.css";
import Profile from "./profile";

const Header = (props) => {
  const { user, setViewPro } = useContext(AccountContext);
  const navigate = useNavigate();

  return (
    <div className={classes.header}>
      <div>
        <button
          className={`sb-button  ${classes.barsbtn}`}
          onClick={props.toggleSidebar}
        >
          <FaBars />
        </button>
      </div>
      <div>
        {user.login ? (
          <h4
            onClick={() => {
              setViewPro(true);
            }}
          >
            {user.user} <IoIosArrowDown />
          </h4>
        ) : (
          <h4
            onClick={() => {
              navigate(process.env.REACT_APP_LOGIN);
            }}
          >
            logIn
          </h4>
        )}
        {user.login ? <Profile signOut={props.signOut} /> : ""}
      </div>
    </div>
  );
};

export default Header;
