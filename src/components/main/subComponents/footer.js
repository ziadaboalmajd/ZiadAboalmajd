import React from "react";
import { Info } from "../../../Data/Data";
import classes from "./load&footer.module.css";

const Footer = () => {
  return (
    <footer className="section" id="contact">
      <h3>contact</h3>
      <div className={classes.footer}>
        {Info.map((newInfo) => {
          const { id, link, platform, Icon } = newInfo;
          return (
            <div key={id}>
              <h4>
                <Icon className={classes.jobIcon} />
                <a href={link} target="_blank" rel="noreferrer">
                  {platform}
                </a>
              </h4>
            </div>
          );
        })}
      </div>
    </footer>
  );
};

export default Footer;
