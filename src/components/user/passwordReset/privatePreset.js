import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AccountContext } from "../accountContext";
import { useEffect } from "react";

const useAuth = async () => {
  const { codePass } = useContext(AccountContext);
  const navigate = useNavigate()
  useEffect(() => {
    if (!codePass) navigate("/home")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (codePass);
};

const PrivatePreset = () => {
  const isAuth = useAuth();

  return isAuth ? <Outlet /> : "";
};

export default PrivatePreset;
