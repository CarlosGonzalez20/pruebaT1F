import "./enDesarrollo.css";
import logo from "../../assets/Images/Logo_ASIELSA_01-11829bbd.webp?w=150&format=webp";

export default function UnderDevelopment({ featureName = "esta funcionalidad" }) {
  return (
    <div className="under-development-container">
      <img src={logo} alt="Logo de Asielsa" className="under-development-logo" />
      
      <h1>🚧 Página en Desarrollo</h1>
      
      <div className="development-message">
        <p>Estamos trabajando intensamente para traerte <strong>{featureName}</strong>.</p>
        <p>Pronto estará disponible con todas lo que necesitas.</p>
      </div>
      
      <div className="features-coming">
        <h2>¿Qué podrás hacer en el nuevo sitio web?</h2>
        <ul>
          <li>✅ Explorar nuestro catálogo completo de productos</li>
          <li>✅ Ver detalles técnicos y especificaciones de los productos</li>
          <li>✅ Comprar productos de manera segura</li>
          <li>✅ Cotizar antes de comprar</li>
          <li>✅ Hacer preguntas sobre nuestros productos en un chat inteligente</li>
          <li>✅ Redactar comentarios y reseñas sobre nuestros productos</li>
          <li>✅ Gestionar tu listado de favoritos para acelerar tu compra</li>
        </ul>
      </div>
      
      <div className="launch-info">
        <p>⏰ <strong>Disponible a partir del 1 de octubre</strong></p>
        <p>Mientras tanto, puedes contactarnos para más información:</p>
        <div className="contact-options">
          <a href="tel:+(502) 2242-2754" className="contact-link">📞 Llamarnos</a>
          <a href="mailto:info@asielsa.com" className="contact-link">✉️ Enviar email</a>
        </div>
      </div>
      
      <button 
        className="back-button"
        onClick={() => window.history.back()}
      >
        ← Volver atrás
      </button>
    </div>
  );
}