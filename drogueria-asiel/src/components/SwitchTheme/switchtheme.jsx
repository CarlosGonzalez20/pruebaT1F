import { useState, useEffect, useCallback, memo } from "react";
import "./switchtheme.css";

const SwitchTheme = memo(() => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Estado inicial combinando localStorage y preferencia del sistema
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) return savedTheme === "dark";
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    // Memoizar la función de toggle
    const handleToggle = useCallback(() => {
        const newMode = !isDarkMode;
        localStorage.setItem("theme", newMode ? "dark" : "light");
        document.body.setAttribute("data-theme", newMode ? "dark" : "light");
        setIsDarkMode(newMode);
    }, [isDarkMode]);

    useEffect(() => {
        // Aplicar tema al montar
        document.body.setAttribute("data-theme", isDarkMode ? "dark" : "light");

        // Escuchar cambios en el tema del sistema
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleSystemThemeChange = (e) => {
            if (!localStorage.getItem("theme")) { // Solo reaccionar si no hay preferencia guardada
                const newMode = e.matches;
                document.body.setAttribute("data-theme", newMode ? "dark" : "light");
                setIsDarkMode(newMode);
            }
        };

        mediaQuery.addEventListener("change", handleSystemThemeChange);
        return () => mediaQuery.removeEventListener("change", handleSystemThemeChange);
    }, [isDarkMode]);

    return (
        <div className="switch-button" aria-label="Cambiar tema">
            <input 
                type="checkbox" 
                id="switch-label" 
                className="switch-button__checkbox" 
                checked={isDarkMode} 
                onChange={handleToggle} 
                aria-checked={isDarkMode}
            />
            <label htmlFor="switch-label" className="switch-button__label"></label>
            {/* Iconos SVG optimizados */}
            <svg 
                aria-hidden="true"
                className="ligth-icon"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
            </svg>
            <svg 
                aria-hidden="true"
                className="dark-icon"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
            </svg>
        </div>
    );
});

export default SwitchTheme;