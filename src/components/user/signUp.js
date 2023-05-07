import React, { useEffect, useState, Fragment, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AccountContext } from "./accountContext";
import UsrInfo from "./usrInfo";
import classes from "./user.module.css";

const Url = process.env.REACT_APP_DOMAIN_LINK + process.env.REACT_APP_SIGNUPA;

const SignUp = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AccountContext);
  const [nName, setnName] = useState("");
  const [nPass, setNpass] = useState("");
  const [mail, setmail] = useState("");
  const [childSub, setchildSub] = useState(0);
  const [chilData, setchilData] = useState(0);
  const [statueM, setStatueM] = useState("");
  const [statueL, setStatueL] = useState("");
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  useEffect(() => {
    setStatueL("");
    let timer = setTimeout(() => setStatueM(""), 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [statueM]);

  const checkValid = () => {
    if (nName.length < 4) {
      return "short username at least 3 characters";
    } else if (mail.length < 6) {
      return "short email at least 6 characters";
    } else if (nPass.length < 6) {
      return "short password at least 6 characters";
    } else if (chilData !== 1) {
      return "enter age and gender";
    }
    if (mail.toLowerCase().match(re) === null) {
      return "invalid email format";
    }
  };

  const sign = async (e) => {
    e.preventDefault();
    if (
      mail.toLowerCase().match(re) !== null &&
      nName.length > 3 &&
      nPass.length > 3 &&
      chilData === 1
    ) {
      setchildSub(childSub + 1);
      setStatueL("loading....please wait");
      setStatueM("");
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
              setStatueM("an error occurs");
            }
          });
      } catch (err) {
        setStatueM("an error occurs");
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
          <UsrInfo sub={childSub} setData={setchilData} name={nName} />
          <button>signup</button>
        </form>
        <h3>{statueM}</h3>
        <h3 className={classes.statueL}>{statueL}</h3>
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
