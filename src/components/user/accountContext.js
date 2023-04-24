import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AccountContext = createContext();

const Url = process.env.REACT_APP_DOMAIN_LINK + process.env.REACT_APP_LOGIN;

const UserContext = ({ children }) => {
  axios.defaults.withCredentials = true;
  const [user, setUser] = useState({ login: null });
  const [viewPro, setViewPro] = useState(null);
  const [rstCode, setRstCode] = useState(0);
  const [codePass, setCodePass] = useState(null);

  const navigate = useNavigate();

  const getCookies = async () => {
    try {
      axios.get(Url, { withCredentials: true }).then((response) => {
        if (response.data.login) {
          setUser({ login: true, user: response.data.user });
        } else {
          setUser({ login: false });
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const test = async () => {
    try {
      axios
        .get(process.env.REACT_APP_DOMAIN_LINK + "/test", {
          withCredentials: true,
        })
        .then((response) => {
          if (response.data) {
            console.log(response.data);
          } else {
            console.log("error ya ziad");
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    navigate(process.env.REACT_APP_HOME);
    test();
    getCookies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AccountContext.Provider
      value={{
        user,
        setUser,
        setViewPro,
        viewPro,
        setRstCode,
        rstCode,
        setCodePass,
        codePass,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export default UserContext;
