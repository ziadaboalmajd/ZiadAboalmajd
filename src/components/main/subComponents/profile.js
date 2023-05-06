import { AccountContext } from "../../user/accountContext";
import { useContext } from "react";
import classes from "./likes&profile.module.css";
import { Navigate } from "react-router-dom";
const Profile = (props) => {
  const { user, setUser, viewPro, setViewPro } = useContext(AccountContext);

  viewPro
    ? document.body.classList.add(classes.stopScroll)
    : document.body.classList.remove(classes.stopScroll);

  if (viewPro) {
    window.scrollTo(0, 0);
  }

  return viewPro && user.login ? (
    <div>
      <div className={classes.signout}>
        <div className={classes.usrInfo}>
          <div className={classes.imgCont}></div>
          <h2>{user.user}</h2>
          <div className={classes.usrData}>
            <div>
              <h3>email address</h3>
              <h4>email@gmail.com</h4>
            </div>
            <div>
              <h3>gender</h3>
              <h4>male/female</h4>
            </div>
            <div>
              <h3>age</h3>
              <h4>21</h4>
            </div>
          </div>
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
