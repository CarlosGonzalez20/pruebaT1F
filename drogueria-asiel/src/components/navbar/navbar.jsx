import React, { useState } from "react";
import "./navbar.css";
import logo from "../../assets/Images/Logo_ASIELSA_01-11829bbd.webp";
import Switch from "../SwitchTheme/switchtheme";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="navbar">
            <a href="#inicio" className="containerLogo">
                <img src={logo} alt="Droguería Asiel SA" className="logo"/>
            </a>
            <ul className={`menu ${isMenuOpen ? "open" : ""}`}>
                <a href="#inicio"><li>INICIO</li></a>
                <a href="#nosotros"><li>SOBRE NOSOTROS</li></a>
                <a href="#productos"><li>PRODUCTOS</li></a>
                <a href="#contacto"><li>CONTÁCTENOS</li></a>
                <a href="#blog"><li>BLOG</li></a>
                <li className="switch-no-hover"><Switch /></li>
            </ul>
            <button className="menu-toggle" onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    );
};

export default Navbar;