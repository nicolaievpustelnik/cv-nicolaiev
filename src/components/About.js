import SplashCursor from './SplashCursor/SplashCursor';

export default function About() {
  return (
    <section id="about" className="about-section" style={{ position: 'relative', overflow: 'hidden' }}>
  <SplashCursor />
  <div className="about-container">
        <div className="about-image">
          <img src={`${process.env.PUBLIC_URL}/img.jpeg`} alt="Foto de Nicolaiev" />
          <h3 className="about-name">Nicolaiev Brito Pustelnik</h3>
        </div>

        <div className="about-text">
          <h2 className="about-title">About Me</h2>
          <p>
            A <strong>Full Stack Developer</strong> with a strong passion for <strong>Back-End development</strong> and <strong>system architecture</strong>.
          </p>
          <p>
            Continuously exploring new technologies and crafting solutions that create real-world impact.
          </p>
          <p>
            Experienced in building scalable, efficient systems across web and cloud environments.
          </p>
          <p>
            Always open to creative ideas, technical challenges, and meaningful collaborations.
          </p>

          <div className="certificates">
            <h3 className="certificates-title">Certificates</h3>
            <div className="certificates-gallery">
            <a href="https://aws.amazon.com/es/certification/certified-cloud-practitioner/" target="_blank" rel="noopener noreferrer">
              <img src={`${process.env.PUBLIC_URL}/aws.png`} alt="Certificate 1" className="certificate-img" />
            </a>
            <a href="https://www.ibm.com/training/certification/ibm-certified-watsonx-generative-ai-engineer-associate-C9007000" target="_blank" rel="noopener noreferrer">
              <img src={`${process.env.PUBLIC_URL}/ibm-ai.png`} alt="Certificate 2" className="certificate-img" />
            </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
