import React, { useState, useEffect } from "react";
import { projects } from "../../../Data/Data";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { FaQuoteRight } from "react-icons/fa";
import classes from "./skill&slider.module.css"
const Slider = () => {
  const [index, setIndex] = useState(0);
  const [project, setProjects] = useState(projects);

  useEffect(() => {
    const lastIndex = project.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, project]);

  useEffect(() => {
    let project = setInterval(() => {
      setIndex(index - 1);
    }, 3000);
    return () => clearInterval(project);
  }, [index]);

  return (
    <section className={classes.Slider}>
      <div className={classes.title}>
        <h2>
          <span>/</span>projects
        </h2>
      </div>
      <div className={classes.sectioncenter}>
        {project.map((person, personIndex) => {
          const { id, image, name, title } = person;
          //more here
          let nextPostion = classes.lastSlide;
          if (index === personIndex) {
            nextPostion = classes.activeSlide;
          } else if (
            personIndex === index + 1 ||
            (index === project.length - 1 && personIndex === 0)
          ) {
            nextPostion = classes.nextSlide;
          }
          // my edit
          return (
            <article key={id} className={nextPostion}>
              <img src={image} alt={name} className={classes.personimg} />
              <h4>{name}</h4>
              <p className={classes.title}>{title}</p>
              <FaQuoteRight className={classes.icon} />
            </article>
          );
        })}
        <button
          className={classes.prev}
          // prev();
          onClick={() => setIndex(index + 1)}
        >
          <FiChevronLeft />
        </button>
        <button
          className={classes.next}
          // next();
          onClick={() => setIndex(index - 1)}
        >
          <FiChevronRight />
        </button>
      </div>
    </section>
  );
};

export default Slider;
