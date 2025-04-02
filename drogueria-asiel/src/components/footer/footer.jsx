import React, { useState, useCallback, memo } from "react";
import "./footer.css";

// Hook personalizado para copiar al portapapeles
const useCopyToClipboard = () => {
    const [copiedText, setCopiedText] = useState("");

    const copyToClipboard = useCallback(async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedText(text);
            setTimeout(() => setCopiedText(""), 2000);
        } catch (err) {
            console.error("Error al copiar: ", err);
        }
    }, []);

    return { copiedText, copyToClipboard };
};

// Componente memoizado para items de contacto
const ContactItem = memo(({ label, value, href, onClick, isAddress = false }) => {
    const WrapperTag = isAddress ? "address" : "div";
    const Content = href ? (
        <a href={href} className="contact-value" onClick={onClick}>
            {value}
        </a>
    ) : (
        <span className="contact-value">{value}</span>
    );

    return (
        <div className="contact-item">
            <span className="contact-label">{label}</span>
            <WrapperTag>{Content}</WrapperTag>
        </div>
    );
});

// Componente memoizado para la notificación
const CopyNotification = memo(({ text }) => (
    <div className="copy-notification" role="alert" aria-live="polite">
        {text} copiado al portapapeles
    </div>
));

const Footer = () => {
    const { copiedText, copyToClipboard } = useCopyToClipboard();

    const handleCopyPhone = useCallback((e) => {
        if (!navigator.userAgent.includes("Mobile")) {
            e.preventDefault();
            copyToClipboard("+502 2242-2754");
        }
    }, [copyToClipboard]);

    const handleCopyEmail = useCallback((e) => {
        e.preventDefault();
        copyToClipboard("info@asielsa.com");
    }, [copyToClipboard]);

    return (
        <footer className="footer" aria-label="Pie de página">
            <div className="footer-container">
                <div className="footer-left">
                    <h3>Control de Calidad</h3>
                    <p>
                        En Droguería Asiel nos comprometemos con los más altos estándares 
                        de calidad en todos nuestros productos y procesos, garantizando 
                        seguridad y eficacia en cada medicamento.
                    </p>
                </div>
                
                <div className="footer-right">
                    <div className="contact-section">
                        <h2>Contáctenos</h2>
                        <div className="contact-info">
                            <ContactItem
                                label="Teléfono:"
                                value="(502) 2242-2754"
                                href="tel:+50222422754"
                                onClick={handleCopyPhone}
                            />
                            <ContactItem
                                label="Correo:"
                                value="info@asielsa.com"
                                href="mailto:info@asielsa.com"
                                onClick={handleCopyEmail}
                            />
                            <ContactItem
                                label="Dirección:"
                                value="5 Calle 61-20 Zona 18, Guatemala, Guatemala"
                                isAddress
                            />
                        </div>
                    </div>

                    <div className="copyright">
                        <p>&copy; 2025 Droguería Asiel, S.A. Todos los derechos reservados.</p>
                    </div>
                </div>
            </div>

            {copiedText && <CopyNotification text={copiedText} />}
        </footer>
    );
};

export default memo(Footer);