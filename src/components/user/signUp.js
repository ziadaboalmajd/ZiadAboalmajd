import React, { useState, Fragment, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AccountContext } from "./accountContext";
import classes from "./user.module.css";
import { useEffect } from "react";

const Url = process.env.REACT_APP_DOMAIN_LINK + process.env.REACT_APP_SIGNUPA;

const SignUp = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AccountContext);
  const [nName, setnName] = useState("");
  const [nPass, setNpass] = useState("");
  const [mail, setmail] = useState("");
  const [statueM, setStatueM] = useState("");
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  useEffect(() => {
    let timer = setTimeout(() => setStatueM(""), 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [statueM]);

  const checkValid = (message) => {
    if (message === "Please enter all the details") {
      if (nName.length < 4) {
        message = "short username at least 3 characters";
      } else if (mail.length < 6) {
        message = "short email at least 6 characters";
      } else if (nPass.length < 6) {
        message = "short password at least 6 characters";
      }
    } else if (mail.toLowerCase().match(re) === null) {
      message = "invalid email format";
    }
    return message;
  };

  const sign = async (e) => {
    e.preventDefault();
    if (mail.toLowerCase().match(re) !== null) {
      try {
        const body = {
          name: nName,
          email: mail,
          password: nPass,
        };

        await axios
          .post(Url, body, { withCredentials: true })
          .then((response) => {
            if (response.data.login) {
              setUser({ login: true, user: response.data.user });
              navigate(process.env.REACT_APP_HOME);
            } else {
              setUser({ login: false });
              setStatueM(checkValid(response.data.message));
            }
          });
      } catch (err) {
        setStatueM("an error occurs");
        console.log(err);
      }
    } else {
      setStatueM(checkValid());
    }
  };

  return (
    <Fragment>
      <section className={`section ${classes.signup}`}>
        <h1>signup</h1>
        <form onSubmit={sign}>
          <label>username</label>
          <input
            maxLength={10}
            value={nName}
            onChange={(e) => setnName(e.target.value.replace(/\s/g, ""))}
          ></input>
          <label>email</label>
          <input
            maxLength={35}
            value={mail}
            onChange={(e) => setmail(e.target.value.replace(/\s/g, ""))}
          ></input>
          <label>password</label>
          <input
            maxLength={35}
            value={nPass}
            onChange={(e) => setNpass(e.target.value.replace(/\s/g, ""))}
          ></input>
          <button>signup</button>
        </form>
        <h3>{statueM}</h3>
        <h6>
          already have an account,{" "}
          <span
            onClick={() => {
              navigate(process.env.REACT_APP_LOGIN);
            }}
          >
            login ?
          </span>
        </h6>
      </section>
    </Fragment>
  );
};

export default SignUp;
