import React, { useContext } from "react";
import { FaBars } from "react-icons/fa";
import { AccountContext } from "../../user/accountContext";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import classes from "./headNside.module.css";
import axios from "axios";
import Profile from "./profile";

const Header = (props) => {
  const { user, setUser, setViewPro } = useContext(AccountContext);
  const navigate = useNavigate();
  const Url =
    process.env.REACT_APP_DOMAIN_LINK + process.env.REACT_APP_SIGNOUTA;

  const signOut = () => {
    try {
      axios.get(Url, { withCredentials: true }).then((response) => {
        if (response.data.login === false) {
          setUser({ login: false, user: undefined });
          navigate(process.env.REACT_APP_HOME);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

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
        {user.login ? <Profile signOut={signOut} /> : ""}
      </div>
    </div>
  );
};

export default Header;
