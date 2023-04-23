import React, { useState } from "react";
import { degrees } from "../../../Data/Data";
import classes from "./certNcom.module.css";
const Certificates = () => {
  const [degree, setDegree] = useState(degrees);
  const [fImg, setFimg] = useState(false);
  const [Img, setimg] = useState("");

  fImg ? document.body.classList.add(classes.stopScroll)
    : document.body.classList.remove(classes.stopScroll);
    
  return (
    <section className={`section ${classes.certiSec}`} id="certificate">
      <h1>certificates</h1>
      <div className={classes.certificate}>
        {degree.map((degrees) => {
          const { id, image, name, link, title, quote } = degrees;
          return (
            <article key={id}>
              <img
                src={image}
                alt={name}
                className={classes.personimg}
                onClick={(e) => {
                  setimg(e.target.src);
                  setFimg(!fImg);
                }}
              />
              <h4>
                <a href={link} target="_blank" rel="noreferrer">
                  {name}
                </a>
              </h4>
              <h6>{title}</h6>
              <p className={classes.text}>{quote}</p>
            </article>
          );
        })}
      </div>
      <div
        className={`${classes.flimgDiv}  ${fImg ? classes.imgOpen : ""}`}
        onClick={() => {
          setFimg(false);
        }}
      >
        <img
          src={Img}
          alt="not supported"
        />
      </div>
    </section>
  );
};

export default Certificates;
