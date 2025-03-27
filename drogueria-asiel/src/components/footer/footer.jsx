import React, { useState } from "react";
import "./footer.css";

const Footer = () => {
    const [copiedText, setCopiedText] = useState("");

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedText(text);
            setTimeout(() => setCopiedText(""), 2000); // Oculta la notificación después de 2 segundos
        });
    };

    return (
        <footer className="footer" aria-label="Pie de página">
            <div className="footer-container">
                <div className="footer-left">
                    <h3>Control de Calidad</h3>
                    <p>En Droguería Asiel nos comprometemos con los más altos estándares de calidad en todos nuestros productos y procesos, garantizando seguridad y eficacia en cada medicamento.</p>
                </div>
                
                <div className="footer-right">
                    <div className="contact-section">
                        <h2>Contáctenos</h2>
                        <div className="contact-info">
                            <div className="contact-item">
                                <span className="contact-label">Teléfono:</span>
                                <a 
                                    href="tel:+50222422754" 
                                    className="contact-value" 
                                    aria-label="Llámenos al teléfono"
                                    onClick={(e) => {
                                        if (!navigator.userAgent.includes("Mobile")) {
                                            e.preventDefault();
                                            copyToClipboard("+502 2242-2754");
                                        }
                                    }}
                                >
                                    (502) 2242-2754
                                </a>
                            </div>
                            <div className="contact-item">
                                <span className="contact-label">Correo:</span>
                                <a 
                                    href="mailto:info@asielsa.com" 
                                    className="contact-value" 
                                    aria-label="Envíenos un correo"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        copyToClipboard("info@asielsa.com");
                                    }}
                                >
                                    info@asielsa.com
                                </a>
                            </div>
                            <div className="contact-item">
                                <span className="contact-label">Dirección:</span>
                                <address className="contact-value">5 Calle 61-20 Zona 18, Guatemala, Guatemala</address>
                            </div>
                        </div>
                    </div>

                    <div className="copyright">
                        <p>&copy; 2025 Droguería Asiel, S.A. Todos los derechos reservados.</p>
                    </div>
                </div>
            </div>

            {copiedText && (
                <div className="copy-notification">
                    {copiedText} copiado al portapapeles
                </div>
            )}
        </footer>
    );
};

export default Footer;
