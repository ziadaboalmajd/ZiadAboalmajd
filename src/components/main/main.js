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
import "./main.css";

const Home = () => {
  const { user } = useContext(AccountContext);
  return user.login === null ? (
    ""
  ) : (
    <main>
      <ProSidebarProvider>
        <SideBar />
      </ProSidebarProvider>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/user/requestrest" element={<ReqPass />} />
        <Route path="/user/restCode" element={<RstCode/>} />
        <Route element={<PrivatePreset />}>
          <Route path="/user/restPass" element={<RstPass/>} />
        </Route>
        <Route
          path="/home"
          element={
            <div>
              <Section />
              <Slider />
              <Certificates />
              < Skills/>
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
