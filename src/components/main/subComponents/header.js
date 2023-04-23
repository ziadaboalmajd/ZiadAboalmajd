import React, { useContext } from "react";
import { FaBars } from "react-icons/fa";
import { AccountContext } from "../../user/accountContext";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import classes from "./headNside.module.css";

const Header = (props) => {
  const { user, setUser, viewPro, setViewPro } = useContext(AccountContext);
  const navigate = useNavigate();

  viewPro
    ? document.body.classList.add(classes.stopScroll)
    : document.body.classList.remove(classes.stopScroll);

  if (viewPro) {
    window.scrollTo(0, 0);
  }
  
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
        {viewPro ? (
          <div>
            <div className={classes.signout}>
              <h4>hello {user.user}</h4>
              <h4
                onClick={() => {
                  setUser(false);
                  props.signOut();
                  setViewPro(false);
                  navigate(process.env.REACT_APP_HOME);
                }}
              >
                signout
              </h4>
            </div>
            <div
              className={classes.overlay}
              onClick={() => {
                setViewPro(false);
              }}
            ></div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Header;
