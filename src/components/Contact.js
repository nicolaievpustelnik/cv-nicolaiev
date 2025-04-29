import { FaLinkedin, FaGithub, FaEnvelope, FaTiktok, FaInstagram } from 'react-icons/fa';

export default function Contact() {
  const contacts = [
    {
      icon: <FaEnvelope />,
      label: 'Email',
      href: 'mailto:nicolaievbrito@gmail.com',
    },
    {
      icon: <FaLinkedin />,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/nbpustelnik',
    },
    {
      icon: <FaGithub />,
      label: 'GitHub',
      href: 'https://github.com/nicolaievpustelnik',
    },
    {
      icon: <FaTiktok />,
      label: 'TikTok',
      href: 'https://www.tiktok.com/@nicolaiev.dev?_t=ZM-8vwMs0xhQGN&_r=1', 
    },
    {
      icon: <FaInstagram />,
      label: 'Instagram',
      href: 'https://www.instagram.com/nicolaiev.dev?igsh=MThhMTNyamlmbnN2Ng==', 
    },
  ];

  return (
    <section id="contact" className="contact-section">
      <h2 className="contact-title">Contact</h2>
      <p className="contact-subtitle">📬 You can find me on any of these platforms:</p>
      <div className="contact-icons">
        {contacts.map(({ icon, label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
            aria-label={label}
          >
            {icon}
          </a>
        ))}
      </div>
    </section>
  );
}
