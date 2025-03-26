import React, { useState } from "react";
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
                <li><a href="#inicio">INICIO</a></li>
                <li><a href="#nosotros">SOBRE NOSOTROS</a></li>
                <li><a href="#productos">PRODUCTOS</a></li>
                <li><a href="#contacto">CONTÁCTENOS</a></li>
                <li><a href="#blog">BLOG</a></li>
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