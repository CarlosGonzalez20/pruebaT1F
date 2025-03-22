import { useState, useEffect } from "react";
import "./switchTheme.css";

function SwitchTheme() {
    // Detectar el tema del sistema
    const getSystemTheme = () => window.matchMedia("(prefers-color-scheme: dark)").matches;

    const [isDarkMode, setIsDarkMode] = useState(getSystemTheme);

    const handleToggle = () => {
        setIsDarkMode(prevMode => {
            const newMode = !prevMode;
            localStorage.setItem("theme", newMode ? "dark" : "light");
            document.body.setAttribute("data-theme", newMode ? "dark" : "light");
            return newMode;
        });
    };

    // Efecto para sincronizar con el tema del sistema y guardar la preferencia
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            setIsDarkMode(savedTheme === "dark");
            document.body.setAttribute("data-theme", savedTheme);
        } else {
            const systemTheme = getSystemTheme() ? "dark" : "light";
            setIsDarkMode(getSystemTheme());
            document.body.setAttribute("data-theme", systemTheme);
        }

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = (e) => {
            setIsDarkMode(e.matches);
            document.body.setAttribute("data-theme", e.matches ? "dark" : "light");
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    return (
        <div className="switch-button">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="ligth-icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
            </svg>
            <input 
                type="checkbox" 
                id="switch-label" 
                className="switch-button__checkbox" 
                checked={isDarkMode} 
                onChange={handleToggle} 
            />
            <label htmlFor="switch-label" className="switch-button__label"></label>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="dark-icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
            </svg>
        </div>
    );
}

export default SwitchTheme;