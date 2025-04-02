import React, { useState, useCallback, memo } from "react";
import { Link } from 'react-router-dom';
import "./navbar.css";
import logo from "../../assets/Images/Logo_ASIELSA_01-11829bbd.webp?w=150&format=webp";
import SwitchTheme from "../SwitchTheme/switchtheme";

const NAV_LINKS = [
    { path: "/", text: "INICIO" },
    { path: "/nosotros", text: "SOBRE NOSOTROS" },
    { path: "/productos", text: "PRODUCTOS" },
    { path: "/contacto", text: "CONTÁCTENOS" },
    { path: "/blog", text: "BLOG" },
    { 
        path: "/cuenta", 
        icon: (
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="account-icon"
            >
                <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" 
                />
            </svg>
        ) 
    },
];

const Navbar = memo(() => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(prev => !prev);
    const handleLinkClick = useCallback(() => setIsMenuOpen(false), []);

    return (
        <nav className="navbar" aria-label="Navegación principal">
            <Link to="/" className="containerLogo">
                <img 
                    src={logo} 
                    alt="Droguería Asiel SA" 
                    className="logo"
                    loading="lazy"
                    width="150"
                    height="115"
                />
            </Link>
            
            <button 
                className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} 
                onClick={toggleMenu}
                aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={isMenuOpen}
                aria-controls="main-menu"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>
            
            <ul className={`menu ${isMenuOpen ? "open" : ""}`} id="main-menu">
                {NAV_LINKS.map((link) => (
                    <li key={link.path}>
                        <Link 
                            to={link.path} 
                            className={`menu-link ${link.icon ? 'with-icon' : ''}`}
                            onClick={handleLinkClick}
                            aria-label={link.icon ? 'Cuenta' : link.text}
                        >
                            {link.icon || link.text}
                        </Link>
                    </li>
                ))}
                <li className="switch-theme"><SwitchTheme /></li>
            </ul>
        </nav>
    );
});

export default Navbar;