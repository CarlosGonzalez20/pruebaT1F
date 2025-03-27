import React, { useState } from "react";
import { Link } from 'react-router-dom'
import "./navbar.css";
import logo from "../../assets/Images/Logo_ASIELSA_01-11829bbd.webp";
import SwitchTheme from "../SwitchTheme/switchtheme";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar" aria-label="Navegación principal">
            <a href="#inicio" className="containerLogo">
                <img src={logo} alt="Droguería Asiel SA" className="logo"/>
            </a>
            <ul className={`menu ${isMenuOpen ? "open" : ""}`}>
                <li><Link to="/" className="menu-link">INICIO</Link></li>
                <li><Link to="/nosotros" className="menu-link">SOBRE NOSOTROS</Link></li>
                <li><Link to="/productos" className="menu-link">PRODUCTOS</Link></li>
                <li><Link to="/contacto" className="menu-link">CONTÁCTENOS</Link></li>
                <li><Link to="/blog" className="menu-link">BLOG</Link></li>
                <li className="switch-theme"><SwitchTheme /></li>
            </ul>
            <button 
                className="menu-toggle" 
                onClick={toggleMenu}
                aria-label="Menú de navegación"
                aria-expanded={isMenuOpen}
                aria-controls="menu"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>
        </nav>
    );
};

export default Navbar;