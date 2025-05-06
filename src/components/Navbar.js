import { slide as Menu } from 'react-burger-menu';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <Menu right isOpen={isOpen} onStateChange={({ isOpen }) => setIsOpen(isOpen)}>
      <a className="menu-item" href="#hero" onClick={closeMenu}>Home</a>
      <a className="menu-item" href="#about" onClick={closeMenu}>About Me</a>
      <a className="menu-item" href="#skills" onClick={closeMenu}>Skills</a>
      <a className="menu-item" href="#projects" onClick={closeMenu}>Projects</a>
      <a className="menu-item" href="#contact" onClick={closeMenu}>Contact</a>
    </Menu>
  );
}
