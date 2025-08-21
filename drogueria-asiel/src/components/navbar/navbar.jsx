import React, { useState, useCallback, memo, useEffect } from "react";
import { Link } from 'react-router-dom';
import "./navbar.css";
import logo from "../../assets/Images/Logo_ASIELSA_01-11829bbd.webp?w=150&format=webp";
import logo_mobile from "../../assets/Images/Logo_ASIELSA_mobile.webp?w=100&format=webp";
import SwitchTheme from "../SwitchTheme/switchtheme";
import ScrollLink from "../Home/scrollLink/scrollLink";

// Moved outside component to prevent recreation on every render
const NAV_LINKS = [
    { path: "/", text: "INICIO" },
    { path: "#sobre-nosotros", text: "SOBRE NOSOTROS" },
    { path: "/productos", text: "PRODUCTOS" },
    { 
        text: "CONTÁCTENOS",
        path: "#contacto",
        submenu: [
            { type: "email", value: "info@asielsa.com" },
            { type: "phone", value: "+502 2242-2754" }
        ]
    },
    { path: "/blog", text: "BLOG" },
    { 
        path: "/test-usuarios", 
        icon: (
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="account-icon"
                aria-hidden="true"
            >
                <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" 
                />
            </svg>
        ),
        ariaLabel: "Cuenta de usuario"
    },
];

const Navbar = memo(() => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false); // Initialize as false to prevent SSR mismatch

    // Debounced resize handler
    useEffect(() => {
        const checkIfMobile = () => window.innerWidth <= 1050;
        
        // Set initial value after mount
        setIsMobile(checkIfMobile());
        
        let resizeTimer;
        const handleResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                const mobile = checkIfMobile();
                setIsMobile(mobile);
                if (!mobile) {
                    setIsMenuOpen(false);
                }
            }, 100); // Debounce time
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(resizeTimer);
        };
    }, []);

    // Memoized handlers
    const toggleMenu = useCallback(() => setIsMenuOpen(prev => !prev), []);
    const toggleContact = useCallback(() => setIsContactOpen(prev => !prev), []);
    const handleLinkClick = useCallback(() => {
        setIsMenuOpen(false);
        setIsContactOpen(false);
    }, []);

    // Memoized render functions
    const renderSubmenu = useCallback(() => (
        <ul className="submenu">
            {NAV_LINKS[3].submenu.map((item, index) => (
                <li key={index}>
                    {item.type === 'email' ? (
                        <a 
                            href={`mailto:${item.value}`}
                            className="submenu-item"
                            onClick={handleLinkClick}
                        >
                            Correo: {item.value}
                        </a>
                    ) : (
                        <a 
                            href={`tel:${item.value}`}
                            className="submenu-item"
                            onClick={handleLinkClick}
                        >
                            Teléfono: {item.value}
                        </a>
                    )}
                </li>
            ))}
        </ul>
    ), [handleLinkClick]);

    return (
        <nav className="navbar" aria-label="Navegación principal">
            <Link to="/" className="containerLogo">
                <img 
                    src={logo} 
                    alt="Droguería Asiel SA" 
                    className="logo desktop-logo"
                    loading="lazy"
                    width="150"
                    height="115"
                    decoding="async" // Better image loading
                />
                <img 
                    src={logo_mobile} 
                    alt="Droguería Asiel SA" 
                    className="logo mobile-logo"
                    loading="lazy"
                    width="100"
                    height="auto"
                    decoding="async"
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
                    <li key={link.path || link.text}>
                        {link.submenu && !isMobile ? (
                            <div className="submenu-container">
                                <button 
                                    className="menu-link submenu-toggle"
                                    onClick={toggleContact}
                                    aria-expanded={isContactOpen}
                                    aria-haspopup="true"
                                >
                                    {link.text}
                                    <span className={`submenu-arrow ${isContactOpen ? 'open' : ''}`}>
                                        ▼
                                    </span>
                                </button>
                                {isContactOpen && renderSubmenu()}
                            </div>
                        ) : link.path.startsWith('#') ? (
                            <ScrollLink 
                                to={isMobile && link.text === "CONTÁCTENOS" ? "#contacto" : link.path}
                                className={`menu-link ${link.icon ? 'with-icon' : ''}`}
                                onClick={handleLinkClick}
                                aria-label={link.icon ? 'Cuenta' : link.text}
                            >
                                {link.icon || link.text}
                            </ScrollLink>
                        ) : (
                            <Link 
                                to={link.path} 
                                className={`menu-link ${link.icon ? 'with-icon' : ''}`}
                                onClick={handleLinkClick}
                                aria-label={link.icon ? 'Cuenta' : link.text}
                            >
                                {link.icon || link.text}
                            </Link>
                        )}
                    </li>
                ))}
                <li className="switch-theme"><SwitchTheme /></li>
            </ul>
        </nav>
    );
});

export default Navbar;