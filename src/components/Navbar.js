import { slide as Menu } from 'react-burger-menu';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  const links = (
    <>
      <a className="menu-item" href="#hero" onClick={closeMenu}>Home</a>
      <a className="menu-item" href="#about" onClick={closeMenu}>About Me</a>
      <a className="menu-item" href="#skills" onClick={closeMenu}>Skills</a>
      <a className="menu-item" href="#projects" onClick={closeMenu}>Projects</a>
      <a className="menu-item" href="#contact" onClick={closeMenu}>Contact</a>
    </>
  );

  return (
    <nav className="navbar">
      {/* Menú solo en móviles */}
      <div className="mobile-menu-wrapper">
        <Menu right isOpen={isOpen} onStateChange={({ isOpen }) => setIsOpen(isOpen)}>
          {links}
        </Menu>
      </div>

      {/* Menú horizontal para desktop */}
      <ul className="desktop-menu">
        <li><a href="#hero">Home</a></li>
        <li><a href="#about">About Me</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
}