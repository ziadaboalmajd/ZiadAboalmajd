import React, { useEffect, useState } from "react";
import axios from "axios";
import classes from "./user.module.css";

const Url = process.env.REACT_APP_DOMAIN_LINK + process.env.REACT_APP_USR_INFO;

const UsrInfo = (props) => {
  const [age, setAge] = useState("");
  const [gen, setGen] = useState();
  const numberInput = (e) => {
    const regex = /^[0-9\b]+$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setAge(e.target.value);
    }
  };

  const pUsrInfo = async () => {
    const body = {
      name: props.name,
      gen: gen,
      age: age,
    };
    if (props.name) {
      await axios.post(Url, body, { withCredentials: true }).catch((err) => {
        console.log(err);
      });
    }
  };

  useEffect(() => {
    pUsrInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.sub]);

  useEffect(() => {
    age === undefined || gen === undefined || age === "" || Number(age) < 9
      ? props.setData(0)
      : props.setData(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [age, gen]);

  return (
    <>
      <div className={classes.usrInfo}>
        <label>gender</label>
        <label>age</label>
        <h5>
          <span
            className={gen === 0 ? "" : classes.disGen}
            onClick={() => setGen(0)}
          >
            male
          </span>
          <span
            className={gen === 1 ? "" : classes.disGen}
            onClick={() => setGen(1)}
          >
            female
          </span>
        </h5>
        <input
          type="text"
          pattern="\d*"
          maxLength={2}
          value={age}
          onChange={(e) => numberInput(e)}
        ></input>
      </div>
    </>
  );
};

export default UsrInfo;
