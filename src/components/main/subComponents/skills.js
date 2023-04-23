import { mSkill } from "../../../Data/Data"
import classes from "./skill&slider.module.css"
import { DiCode } from "react-icons/di";

const Skills = () => {
    return (
        <section className={`section ${classes.skillSec}`} id="skills">
            <div className={classes.skills}>
                <div className={classes.skTitle}>
                    <h2>{"< "}skills{" />"}</h2>
                    <div></div>
                </div>
                <div>
                    {mSkill.map((mskill) => {
                        const { id, skill, Icon, years, projects } = mskill;
                        return (
                            <div key={id}>
                                <div><h3>{years}</h3><h3>{projects}</h3></div>
                                <h3>{skill}</h3>
                                <Icon />
                            </div>
                        )
                    })
                    }
                </div>
            </div>
            {/* <p>all this skills is used in this website</p> */}
        </section >
    )
}

export default Skills;