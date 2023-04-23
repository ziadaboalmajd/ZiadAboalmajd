import { useContext } from "react";
import axios from "axios";
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

const SideBar = () => {
  const Url =  process.env.REACT_APP_DOMAIN_LINK + "signout";
  const navigate = useNavigate();

  const { user, setUser, setViewPro } = useContext(AccountContext);
  let { toggleSidebar, toggled } = useProSidebar();

  toggled
    ? document.body.classList.add(classes.stopScrolls)
    : document.body.classList.remove(classes.stopScrolls);

  const signOut = () => {
    try {
      axios.get(Url, { withCredentials: true }).then((response) => {
        if (response.data.login) {
          setUser({ login: false, user: response.data.user });
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Sidebar
        className={classes.sidebar}
        breakPoint="always"
        transitionDuration={600}
      >
        <Menu
          className={classes.menu}
          onClick={() => {
            console.log(toggled);
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
                  navigate("home");
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
                setViewPro(true)
              }}
            >
              welcome {user.user}
            </MenuItem>
          ) : (
            <MenuItem component={<Link to="/" />} prefix={<IoEnter />}>
              logIn
            </MenuItem>
          )}
        </Menu>
      </Sidebar>
      <Header
        toggleSidebar={toggleSidebar}
        toggled={toggled}
        signOut={signOut}
      />
    </div>
  );
};

export default SideBar;

/* <Sidebar
  className={classes.sidebar}
  breakPoint="always"
  transitionDuration={600}
  backgroundColor="blue"
></Sidebar>; */

// rootStyles={{
//   [`.${menuClasses} .pdf`]: {
//     // backgroundColor: "red",
//     color: "red",
//   },
//   // background: "red",
// }}

// <SubMenu
//             defaultOpen={false}
//             rootStyles={{
//               ["& > ." + menuClasses.button]: {
//                 backgroundColor: "#eaabff",
//                 color: "#9f0099",
//                 "&:hover": {
//                   backgroundColor: "#eecef9",
//                 },
//               },
//               ["." + menuClasses.subMenuContent]: {
//                 backgroundColor: "#fbedff",
//               },
//             }}
//             name="pdf"
//             label="pdf"
//             className="pdf"
//             prefix={<AiOutlineLink />}
//           ></SubMenu>

// <Menu

// menuItemStyles={{
//   button: ({ level, active, disabled }) => {
//     // only apply styles on first level elements of the tree
//     // if (level === 0)
//     return {
//       // color: "blue",
//       left: "0",
//       // backgroundColor: active ? "red" : "yellow",
//     };
//   },
// }}
// >

// <MenuItem
//               rootStyles={{
//                 ["." + menuClasses.button]: {
//                   backgroundColor: "yellow",
//                   color: "red",
//                   "&:hover": {
//                     backgroundColor: "balck",
//                   },
//                 },
//               }}
//               prefix={<VscFilePdf />}
//             ></MenuItem>

/* <MenuItem component={<Link to="/home" />} prefix={<AiOutlineHome />}>
            home
          </MenuItem>
          <MenuItem
            prefix={<HiOutlineDocumentText />}
            onClick={() => {
              navigate("home");
            }}
            href="#about"
          >
            about
          </MenuItem>
          <MenuItem
            component={<Link to="/home" />}
            prefix={<FaRegCommentDots />}
            href="#comments"
          >
            comments
          </MenuItem>
          <MenuItem
            prefix={<GrCertificate />}
            onClick={() => {
              navigate("home");
            }}
            href="#certificate"
          >
            certificates
          </MenuItem>
          <MenuItem
            prefix={<RiContactsBookLine />}
            onClick={() => {
              navigate("home");
            }}
            href="#contact"
          >
            contact
          </MenuItem> */
