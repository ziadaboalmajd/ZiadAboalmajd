import { useContext } from "react";
import { sideData, subProject } from "../../../Data/Data";
import Header from "./header";
import { IoEnter } from "react-icons/io5";
import { IoMdContact } from "react-icons/io";
import { AiOutlineLink } from "react-icons/ai";
import { FaBars } from "react-icons/fa";
import { AccountContext } from "../../user/accountContext";
import { Link, useNavigate } from "react-router-dom";
import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
  SubMenu,
} from "react-pro-sidebar";
import classes from "./headNside.module.css";
import { useEffect } from "react";
import { useState } from "react";

const SideBar = () => {
  const navigate = useNavigate();

  const { user, setViewPro } = useContext(AccountContext);
  let { toggleSidebar, toggled } = useProSidebar();
  const [disNone, setDisn] = useState(false);

  toggled
    ? document.body.classList.add(classes.stopScrolls)
    : document.body.classList.remove(classes.stopScrolls);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setDisn(true);
  }, []);

  return (
    <div>
      <Sidebar
        className={`${classes.sidebar} ${disNone ? "" : classes.SideBar}`}
        breakPoint="always"
        transitionDuration={600}
        defaultOpen={false}
      >
        <Menu
          className={classes.menu}
          onClick={() => {
            toggleSidebar();
          }}
        >
          <li
            onClick={(e) => {
              e.stopPropagation();
            }}
            className={classes.Menutitle}
          >
            Ziad aboalmajd
            <FaBars
              style={{ fontSize: "19px" }}
              onClick={() => {
                toggleSidebar();
              }}
            />
          </li>
          {sideData.map((sidedata) => {
            const { id, Prefix, href, label } = sidedata;
            return (
              <MenuItem
                key={id}
                prefix={<Prefix />}
                onClick={() => {
                  navigate(process.env.REACT_APP_HOME);
                }}
                href={"#" + href}
              >
                {label}
              </MenuItem>
            );
          })}

          <SubMenu
            className={classes.subProjects}
            defaultOpen={false}
            prefix={<AiOutlineLink />}
            label={"Projects"}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {subProject.map((subproject) => {
              const { id, Prefix, link, label } = subproject;
              return (
                <MenuItem
                  key={id}
                  prefix={<Prefix />}
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {label}
                </MenuItem>
              );
            })}
          </SubMenu>
          {user.login ? (
            <MenuItem
              prefix={<IoMdContact />}
              onClick={() => {
                setViewPro(true);
              }}
            >
              welcome {user.user}
            </MenuItem>
          ) : (
            <MenuItem
              component={<Link to={process.env.REACT_APP_LOGIN} />}
              prefix={<IoEnter />}
            >
              logIn
            </MenuItem>
          )}
        </Menu>
      </Sidebar>
      <Header toggleSidebar={toggleSidebar} toggled={toggled} />
    </div>
  );
};

export default SideBar;
