import React, { useState } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import { Data } from "../../../Data/Data";
import axios from "axios";
const Section = () => {
  const [jobs, setJobs] = useState(Data);
  const [value, setValue] = useState(0);
  const { title, dates, company, duties } = jobs[value];

  return (
    <section className="section" style={{ margintop: "3rem" }}>
      <div className="title" id="about">
        <h2>Ziad Aboalmajd</h2>
        <div className="underline"></div>
      </div>
      <div className="jobs-center">
        <div className="btn-container">
          {jobs.map((item, index) => {
            return (
              <button
                key={item.id}
                className={`job-btn ${index === value && "active-btn"}`}
                onClick={() => {
                  setValue(index);
                }}
              >
                {item.company}
              </button>
            );
          })}
        </div>
        <article className="job-info">
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className="job-date">{dates}</p>
          {duties.map((duty, index) => {
            return (
              <div key={index} className="job-desc">
                <FaAngleDoubleRight className="job-icon"></FaAngleDoubleRight>
                {value === 0 && index === 2 ? (
                  <p>
                    {duty}
                    <a
                      className="pdf-link"
                      href="https://drive.google.com/file/d/1X42yfx08Y_4omGQPRKvGa8D3zqgkdXAf/view?usp=share_link"
                      target="_blank"
                      rel="noreferrer"
                    >
                      click here for the full report.
                    </a>
                  </p>
                ) : (
                  <p>{duty}</p>
                )}
              </div>
            );
          })}
        </article>
      </div>
    </section>
  );
};

export default Section;
