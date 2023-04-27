import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useContext } from "react";
import { AccountContext } from "../user/accountContext";
import { ProSidebarProvider } from "react-pro-sidebar";
import LogIn from "../user/logIn";
import SignUp from "../user/signUp";
import ReqPass from "../user/passwordReset/reqPass";
import RstCode from "../user/passwordReset/rstCode";
import RstPass from "../user/passwordReset/rstPass";
import PrivatePreset from "../user/passwordReset/privatePreset";
import SideBar from "./subComponents/sidebar";
import Section from "./subComponents/section";
import Slider from "./subComponents/slider";
import Certificates from "./subComponents/certificates";
import Skills from "./subComponents/skills";
import Comments from "./subComponents/comments";
import Footer from "./subComponents/footer";
import LoadingP from "./subComponents/loadingP";
import "./main.css";

const Home = () => {
  const { user } = useContext(AccountContext);
  return user.login === null ? (
    <LoadingP />
  ) : (
    <main>
      <ProSidebarProvider>
        <SideBar />
      </ProSidebarProvider>
      <Routes>
        <Route path={process.env.REACT_APP_LOGIN} element={<LogIn />} />
        <Route path={process.env.REACT_APP_SIGNUP} element={<SignUp />} />
        <Route path={process.env.REACT_APP_REQ_PASS} element={<ReqPass />} />
        <Route path={process.env.REACT_APP_RST_CODE} element={<RstCode />} />
        <Route element={<PrivatePreset />}>
          <Route path={process.env.REACT_APP_RST_PASS} element={<RstPass />} />
        </Route>
        <Route
          path={process.env.REACT_APP_HOME}
          element={
            <div>
              <Section />
              <Slider />
              <Certificates />
              <Skills />
              <Comments />
              <Footer />
            </div>
          }
        />
      </Routes>
    </main>
  );
};

export default Home;
