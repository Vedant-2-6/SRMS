import React from 'react';
import './HamburgerMenu.css';

const HamburgerMenu = ({ onClick }) => {
  return (
    <div className="hamburger-menu" onClick={onClick}>
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
    </div>
  );
};

export default HamburgerMenu;
