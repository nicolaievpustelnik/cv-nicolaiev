import {
  FaJava, FaNodeJs, FaReact, FaAws, FaDocker, FaLinux, FaGit, FaDatabase,
  FaMicrosoft, FaCloud, FaRegCheckCircle, FaCode, FaMobileAlt,
} from 'react-icons/fa';

import {
  SiSpringboot, SiLaravel, SiDotnet, SiJavascript, SiAngular,
  SiMysql, SiMongodb, SiJenkins, SiServerless, SiPostman,
  SiJunit5, SiScrumalliance, SiMocha,
} from 'react-icons/si';

import SpotlightCard from './SpotlightCard/SpotlightCard';

const skillIcons = {
  // Back-End
  Java: <FaJava />,
  "Node.js": <FaNodeJs />,
  "Spring Boot": <SiSpringboot />,
  PHP: <FaCode />,
  ".NET": <SiDotnet />,
  Laravel: <SiLaravel />,
  "C#": <FaMicrosoft />, 

  // Front-End
  JavaScript: <SiJavascript />,
  React: <FaReact />,
  "React Native": <FaMobileAlt />,
  Angular: <SiAngular />,

  // Databases
  MySQL: <SiMysql />,
  SQLServer: <FaDatabase />,
  MongoDB: <SiMongodb />,
  DynamoDB: <FaAws />, 

  // DevOps & Cloud
  AWS: <FaCloud />,
  Docker: <FaDocker />,
  Linux: <FaLinux />,
  Jenkins: <SiJenkins />,
  Serverless: <SiServerless />,
  Git: <FaGit />,
  "Rest API": <SiPostman />,

  // Testing & Methodologies
  JUnit: <SiJunit5 />,
  Scrum: <SiScrumalliance />,
  Mockito: <FaRegCheckCircle />,
  Mocha: <SiMocha />,
};

export default function Skills() {
  const skills = {
    "Back-End": ["Java", "PHP", "Node.js", "Spring Boot", "Laravel", "C#", ".NET"],
    "Front-End": ["JavaScript", "React", "React Native", "Angular"],
    "Databases": ["MySQL", "SQLServer", "MongoDB", "DynamoDB"],
    "DevOps & Cloud": ["AWS", "Docker", "Linux", "Jenkins", "Serverless", "Git", "Rest API"],
    "Testing & Methodologies": ["JUnit", "Scrum", "Mockito", "Mocha"],
  };

  return (
    <section id="skills" className="skills-section">
      <h2 className="skills-title">Skills & Technologies</h2>
      <div className="skills-container">
        {Object.entries(skills).map(([category, techs]) => (
          <SpotlightCard
            key={category}
            className="skills-block"
            spotlightColor="rgba(0, 229, 255, 0.2)"
          >
            <h3 className="skills-category">{category}</h3>
            <ul className="skills-list">
              {techs.map((tech) => (
                <li className="skill-item" key={tech}>
                  <span className="skill-icon">{skillIcons[tech] || "🔧"}</span>
                  {tech}
                </li>
              ))}
            </ul>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
