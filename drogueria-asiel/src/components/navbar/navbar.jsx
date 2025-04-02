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
    { path: "/blog", text: "BLOG" }
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
                            className="menu-link"
                            onClick={handleLinkClick}
                        >
                            {link.text}
                        </Link>
                    </li>
                ))}
                <li className="switch-theme"><SwitchTheme /></li>
            </ul>
        </nav>
    );
});

export default Navbar;