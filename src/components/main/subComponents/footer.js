import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { SiGmail, SiFreelancer } from "react-icons/si";
import { Info } from "../../../Data/Data";

const Footer = () => {
  return (
    <footer className="section" id="contact">
      <h3>contact</h3>
      <div className="footer">
        {Info.map((newInfo) => {
          const { id, link, platform } = newInfo;
          return (
            <div key={id} >
              <h4>
                {platform === "linkedIn" && <FaLinkedin className="job-icon" />}
                {platform === "gmail" && <SiGmail className="job-icon" />}
                {platform === "github" && <FaGithub className="job-icon" />}
                {platform === "freelancer" && (
                  <SiFreelancer className="job-icon" />
                )}
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
