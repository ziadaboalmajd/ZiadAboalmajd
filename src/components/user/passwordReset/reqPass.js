import { Fragment, useEffect, useState } from "react";
import classes from "../user.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ReqPass = () => {
  const navigate = useNavigate();
  const [btn, setBtn] = useState(false);
  const Url =
    process.env.REACT_APP_DOMAIN_LINK + process.env.REACT_APP_SEND_MAIL;
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  const [email, setEmail] = useState("");
  const [statueM, setStatueM] = useState("");

  useEffect(() => {
    setBtn(false);
    let timer = setTimeout(() => setStatueM(""), 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [statueM]);

  const checkValid = (message) => {
    if (email.length < 6) {
      message = "short email at least 6 characters";
    } else if (email.toLowerCase().match(re) === null) {
      message = "invalid email format";
    }
    return message;
  };

  const sendMail = async (e) => {
    e.preventDefault();
    setBtn(true);
    if (email.toLowerCase().match(re) !== null && email.length > 6) {
      try {
        const body = { to: email };
        await axios
          .post(Url, body, {
            withCredentials: true,
          })
          .then((response) => {
            if (response.data.sent === true) {
              navigate(process.env.REACT_APP_RST_CODE);
              localStorage.setItem("mail", email);
            } else {
              if (response.data.message === "Wrong email") {
                setStatueM("this email is not exists");
              } else {
                setStatueM("an error occurs");
              }
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
      <section className={`section ${classes.login} ${classes.reqPass}`}>
        <h1>request password reset</h1>
        <form onSubmit={sendMail}>
          <label>your email</label>
          <input
            type="text"
            maxLength={35}
            value={email}
            onChange={(e) => setEmail(e.target.value.replace(/\s/g, ""))}
          ></input>
          <button disabled={btn}>send email</button>
          <h3>{statueM}</h3>
        </form>
        <h6>
          an email will be send to your address,{" "}
          <span
            onClick={() => {
              navigate(process.env.REACT_APP_HOME);
            }}
          >
            login instead ?
          </span>
        </h6>
        <div className={`${classes.loadSec} ${btn ? classes.loading : ""}`}>
          <div className={classes.ldsroller}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default ReqPass;
