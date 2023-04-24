import { HiOutlineDocumentText } from "react-icons/hi";
import { RiContactsBookLine } from "react-icons/ri";
import { AiOutlineHome, AiFillAndroid } from "react-icons/ai";
import { FaRegCommentDots, FaReact, FaNodeJs, FaAws } from "react-icons/fa";
import { GrCertificate } from "react-icons/gr";
import { VscFilePdf, VscGithub } from "react-icons/vsc";
import { BsCodeSlash } from "react-icons/bs";
import {
  SiHtml5,
  SiBootstrap,
  SiTsnode,
  SiPostgresql,
  SiFirebase,
} from "react-icons/si";
import { DiCss3, DiJavascript, DiSass } from "react-icons/di";

const Data = [
  {
    id: "recAGJfiU4CeaV0HL",
    order: 3,
    title: "Full Stack Web Developer",
    dates: "February 2022 - Still learning",
    duties: [
      "I completed Udacity's Full Stack Web Development Nanodegree program. I have learned to use NodeJs, APIs, PostgreSQL and Amazon Web Services (AWS).",
      "I have completed the Degree with the highest points. I deployed Full stack website on AWS.",
      "I have completed a project (Attendance App) for my college which was a full stack website that connected to an embedded project on RFID Based Attendance System to visualise student data in real-time (internet of things). I manage to complete the project on my own, the project has a database to store data and a backend server which converts student data to Excel sheet using NodeJS ",
      "Currently, I try to improve my knowledge and skills by learning more (still learning).",
    ],
    company: "Full-stack",
  },
  {
    id: "recIL6mJNfWObonls",
    order: 2,
    title: "Front-End Engineer",
    dates: "May 2020 - Present",
    duties: [
      "I completed Udacity’s Front-End Web Development Nanodegree program, which taught me  all skills I need to develop web applications.",
      "I recently completed a freelance project where I improved an art gallery's inefficient online auction web application.",
      "I have more than two years of experience as a front-end developer. Currently, I am trying to master React, bootstrap and threeJs.",
      "Problem-Solving is one of my best skills which I try to improve. I think it is the foundation of any technology job.",
    ],
    company: "Front-End",
  },
  {
    id: "rec61x18GVY99hQq5",
    order: 1,
    title: "Electrical Engineer",
    dates: "January 2020 - January 2025",
    duties: [
      "I will get a bachelor’s degree in electrical engineering degree from Suez canal university.",
      "I have an academic IELTS degree with a 6.5 overall band score. I am experienced in Microsoft Word, Microsoft excel, AutoCAD Inventor and other important engineering software.",
      "Designing, maintaining, implementing, or improving electrical instruments, facilities, components, equipment products, or systems for industrial, commercial, or domestic purposes.",
      "Performing a wide range of engineering tasks by operating computer-assisted design and engineering software.",
    ],
    company: "Engineering",
  },
];
const Info = [
  {
    id: "1",
    link: "https://www.linkedin.com/in/ziad-gamalaboalmajd-17332b241/",
    platform: "linkedIn",
  },
  {
    id: "2",
    link: "mailto:ziadgamalaboalmajd@gmail.com",
    platform: "gmail",
  },
  {
    id: "3",
    link: "https://github.com/ziadaboalmajd",
    platform: "github",
  },
  {
    id: "4",
    link: "https://www.freelancer.com/u/ziadaboalmajd",
    platform: "freelancer",
  },
];
const projects = [
  {
    id: 1,
    image: process.env.PUBLIC_URL + "/App ss2.png",
    name: "College's attendance app",
    title: "Full-Stack App",
    quote: "",
  },
  {
    id: 2,
    image: process.env.PUBLIC_URL + "/Screenshot 2023-01-07 214529.png",
    name: "Quran App",
    title: "Single-page application (SPA)",
  },
  {
    id: 3,
    image: process.env.PUBLIC_URL + "/Screenshot 2023-03-20 205900.png",
    name: "Resize image App",
    title: "NodeJs Backend App",
  },
];
const degrees = [
  {
    id: 1,
    image: process.env.PUBLIC_URL + "/certificate.png",
    link: "https://drive.google.com/file/d/1qWAonPdI6TC5DZfbazM_9QPoQm51BM6H/view?usp=share_link",
    name: "Full-Stack Udacity's certificate",
    title: "Full stack",
  },
  {
    id: 2,
    image: process.env.PUBLIC_URL + "/professional certificate.png",
    link: "https://drive.google.com/file/d/1DOUuRKrktkR2VxrXLpchasPaHa6-66QS/view?usp=share_link",
    name: "professional Udacity's certificate",
    title: "Front end",
  },
  {
    id: 3,
    image: process.env.PUBLIC_URL + "/ielts.jpg",
    link: "https://drive.google.com/file/d/1lbOZKnRM_SyLPt9UQkMDftRGYbPDYcmk/view?usp=share_link",
    name: "IELTS Academic",
    title: "English",
  },
];
const sideData = [
  {
    id: 1,
    href: "",
    Prefix: AiOutlineHome,
    label: "home",
  },
  {
    id: 2,
    href: "about",
    Prefix: HiOutlineDocumentText,
    label: "about",
  },
  {
    id: 3,
    href: "certificate",
    Prefix: GrCertificate,
    label: "certificate",
  },
  {
    id: 4,
    href: "skills",
    Prefix: BsCodeSlash,
    label: "skills",
  },
  {
    id: 5,
    href: "comments",
    Prefix: FaRegCommentDots,
    label: "comments",
  },
  {
    id: 6,
    href: "contact",
    Prefix: RiContactsBookLine,
    label: "contact",
  },
];
const subProject = [
  {
    id: 1,
    Prefix: VscFilePdf,
    link: "https://drive.google.com/file/d/1X42yfx08Y_4omGQPRKvGa8D3zqgkdXAf/view?usp=share_link",
    label: "Attendance system",
  },
  {
    id: 2,
    Prefix: AiFillAndroid,
    link: "https://drive.google.com/file/d/1_K3PSvNxrlqEmj-_4DsES_mfZJpqNb5A/view?usp=share_link",
    label: "Quran app",
  },
  {
    id: 3,
    Prefix: VscGithub,
    link: "https://github.com/ziadaboalmajd/Udagram",
    label: "udagram (AWS)",
  },
];
const mSkill = [
  {
    id: 1,
    Icon: SiHtml5,
    skill: "html",
    years: "+3 years",
    projects: "experienced",
  },
  {
    id: 2,
    Icon: DiCss3,
    skill: "css",
    years: "+3 years",
    projects: "experienced",
  },
  {
    id: 3,
    Icon: DiJavascript,
    skill: "javascript",
    years: "+3 years",
    projects: "experienced",
  },
  {
    id: 4,
    Icon: FaReact,
    skill: "react js",
    years: "+1 years",
    projects: ">20 projects",
  },
  {
    id: 5,
    Icon: DiSass,
    skill: "sass",
    years: "+1 years",
    projects: ">5 projects",
  },
  {
    id: 6,
    Icon: SiBootstrap,
    skill: "bootstrap",
    years: "+1 years",
    projects: ">10 projects",
  },
  {
    id: 7,
    Icon: SiPostgresql,
    skill: "postgres",
    years: "+1 years",
    projects: ">5 projects",
  },
  {
    id: 8,
    Icon: FaNodeJs,
    skill: "node js",
    years: "+2 years",
    projects: ">15 projects",
  },
  {
    id: 12,
    Icon: SiTsnode,
    skill: "typescript",
    years: "+2 years",
    projects: ">10 projects",
  },
  {
    id: 9,
    Icon: FaAws,
    skill: "aws",
    years: "<1 years",
    projects: "2 projects",
  },
  {
    id: 10,
    Icon: VscGithub,
    skill: "github",
    years: "+2 years",
    projects: ">11 repository",
  },
  {
    id: 11,
    Icon: SiFirebase,
    skill: "firebase",
    years: "+2 years",
    projects: "2 projects",
  },
];
export { Data, Info, projects, degrees, sideData, subProject, mSkill };
