import React from 'react';
import { Link } from 'react-router-dom';

const ScrollLink = ({ to, children, className, onClick, ariaLabel }) => {
  const handleClick = (e) => {
    e.preventDefault();
    const element = document.getElementById(to.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    if (onClick) onClick();
  };

  return (
    <Link 
      to={to} 
      onClick={handleClick}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  );
};

export default ScrollLink;