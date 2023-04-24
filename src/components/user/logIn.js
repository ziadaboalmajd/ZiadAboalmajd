import React, { useState, Fragment, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AccountContext } from "./accountContext";
import classes from "./user.module.css";

const LogIn = () => {
  const navigate = useNavigate();

  const Url = process.env.REACT_APP_DOMAIN_LINK + process.env.REACT_APP_LOGIN;

  const { setUser } = useContext(AccountContext);
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [statueM, setStatueM] = useState("");

  useEffect(() => {
    let timer = setTimeout(() => setStatueM(""), 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [statueM]);

  const checkValid = (message) => {
    if (message === "Please enter all the details") {
      if (name.length < 4) {
        message = "short username at least 3 characters";
      } else if (pass.length < 6) {
        message = "short password at least 6 characters";
      }
    }
    return message;
  };

  const log = async (e) => {
    e.preventDefault();
    try {
      const body = { name: name, password: pass };
      axios.post(Url, body).then((response) => {
        if (response.data.login === true) {
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
  };

  return (
    <Fragment>
      <section className={`section ${classes.login}`}>
        <h1>login</h1>
        <form onSubmit={log}>
          <label>username</label>
          <input
            type="text"
            maxLength={10}
            value={name}
            onChange={(e) => setName(e.target.value.replace(/\s/g, ''))}
          ></input>
          <label>password</label>
          <input
            type="password"
            name="password"
            autoComplete="on"
            maxLength={35}
            value={pass}
            onChange={(e) => setPass(e.target.value.replace(/\s/g, ''))}
          ></input>
          <h5
            onClick={() => {
              navigate(process.env.REACT_APP_REQ_PASS);
            }}
          >
            forget password ?
          </h5>
          <button>login</button>
          <h3>{statueM}</h3>
        </form>
        <h6>
          don't have account,{" "}
          <span
            onClick={() => {
              navigate(process.env.REACT_APP_SIGNUP);
            }}
          >
            create one ?
          </span>
        </h6>
      </section>
    </Fragment>
  );
};

export default LogIn;

// const getCookies = async (e) => {
//   e.preventDefault();
//   try{
//     axios.get(Url).then((response)=>{

//     })
//   }catch{

//   }
// };

/*const response = await fetch("", {method: "Post",headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),});*/
