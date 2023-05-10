import { AccountContext } from "../../user/accountContext";
import React, { useContext, useEffect, useState } from "react";
import classes from "./likes&profile.module.css";
import { Navigate } from "react-router-dom";
import axios from "axios";

const Profile = (props) => {
  const { user, setUser, viewPro, setViewPro } = useContext(AccountContext);
  const [usrI, setUsrI] = useState([]);

  const [usrImg, setUsrImg] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"
  );

  const css = {
    backgroundImage: `url(${usrImg})`,
  };

  const Url =
    process.env.REACT_APP_DOMAIN_LINK + process.env.REACT_APP_USR_INFO + "/get";

  viewPro
    ? document.body.classList.add(classes.stopScroll)
    : document.body.classList.remove(classes.stopScroll);

  if (viewPro) {
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    if (user.user) {
      usrData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.login]);

  const usrData = async () => {
    const body = {
      name: user.user,
    };
    await axios
      .post(Url, body)
      .then((response) => {
        if (response.data) {
          setUsrI(response.data);
          // setUrlI(response.data.url)
        }
      })
      .catch(() => {});
  };

  return viewPro && user.login ? (
    <div>
      <div className={classes.signout}>
        <div className={classes.usrInfo}>
          <div className={classes.imgCont} style={css}></div>
          <h2>{user.user}</h2>
          {usrI[0] !== undefined ? (
            <div className={classes.usrData}>
              <div>
                <h3>email</h3>
                <h4>{usrI[0] ? usrI[0] : "_"}</h4>
              </div>
              <div>
                <h3>gender</h3>
                <h4>
                  {usrI[2] === 0 ? "male" : `${usrI[2] === 1 ? "female" : "_"}`}
                </h4>
              </div>
              <div>
                <h3>age</h3>
                <h4>{usrI[1] ? usrI[1] : "_"}</h4>
              </div>
            </div>
          ) : (
            <div className={classes.loadingT}>...loading</div>
          )}
        </div>
        <h4
          onClick={() => {
            setUser(false);
            props.signOut();
            setViewPro(false);
            Navigate(process.env.REACT_APP_HOME);
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
  );
};

export default Profile;
