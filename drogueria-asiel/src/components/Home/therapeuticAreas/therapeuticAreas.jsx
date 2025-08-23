import React, { useState, memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./therapeuticAreas.css";

// Imágenes originales
import EstomagoIMG from "../../../assets/Images/blanco-iconos-stomach.webp";
import CerebroIMG from "../../../assets/Images/blanco-iconos-brain.webp";
import CorazonIMG from "../../../assets/Images/blanco-iconos-heart.webp";
import IntestinosIMG from "../../../assets/Images/intestino-blanco.webp";
import HigadoIMG from "../../../assets/Images/higado-blanco.webp";
import BoteIMG from "../../../assets/Images/bote-blanco.webp";

const TherapeuticAreas = memo(() => {
  const [activeArea, setActiveArea] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Imagenes que representan cada area
  const areaImages = [HigadoIMG, CerebroIMG, EstomagoIMG, IntestinosIMG, BoteIMG, CorazonIMG];

  const areas = [
    {
      id: 1,
      name: "Multivitamínicos para pacientes diabéticos",
      description: "Formulaciones especializadas para pacientes en diálisis que ayudan a reponer nutrientes esenciales perdidos durante el tratamiento.",
      productsImages: [
        { src: "https://placehold.co/600x400/gray/white?text=Prueba+1", id: "producto-1" },
        { src: "https://placehold.co/600x400/gray/white?text=Prueba+2", id: "producto-2" },
        { src: "https://placehold.co/600x400/gray/white?text=Prueba+3", id: "producto-3" },
        { src: "https://placehold.co/600x400/gray/white?text=Prueba+4", id: "producto-4" },
        { src: "https://placehold.co/600x400/gray/white?text=Prueba+5", id: "producto-5" },
        { src: "https://placehold.co/600x400/gray/white?text=Prueba+6", id: "producto-6" }
      ]
    },
    {
      id: 2,
      name: "Multivitamínicos pediátricos",
      description: "Vitaminas especialmente formuladas para niños, con dosajes adecuados y sabores agradables para mejorar la adherencia al tratamiento.",
      productsImages: [
        { src: "https://placehold.co/600x400/gray/white?text=Prueba+1", id: "producto-1" },
        { src: "https://placehold.co/600x400/gray/white?text=Prueba+2", id: "producto-2" },
        { src: "https://placehold.co/600x400/gray/white?text=Prueba+3", id: "producto-3" },
        { src: "https://placehold.co/600x400/gray/white?text=Prueba+4", id: "producto-4" },
        { src: "https://placehold.co/600x400/gray/white?text=Prueba+5", id: "producto-5" },
        { src: "https://placehold.co/600x400/gray/white?text=Prueba+6", id: "producto-6" }
      ]
    },
    {
      id: 3,
      name: "Gastrointestinal",
      description: "Medicamentos para el tratamiento de úlceras, reflujo, gastritis y otros trastornos del sistema digestivo.",
      productsImages: [
        { src: "https://placehold.co/600x400/gray/white?text=Prueba+1", id: "producto-1" },
        { src: "https://placehold.co/600x400/gray/white?text=Prueba+2", id: "producto-2" },
        { src: "https://placehold.co/600x400/gray/white?text=Prueba+3", id: "producto-3" },
        { src: "https://placehold.co/600x400/gray/white?text=Prueba+4", id: "producto-4" },
        { src: "https://placehold.co/600x400/gray/white?text=Prueba+5", id: "producto-5" },
        { src: "https://placehold.co/600x400/gray/white?text=Prueba+6", id: "producto-6" }
      ]
    },
    {
      id: 4,
      name: "Antibióticos",
      description: "Amplia gama de antibióticos para el tratamiento de infecciones bacterianas, incluyendo penicilinas, cefalosporinas y macrólidos.",
      productsImages: [
        { src: "https://placehold.co/600x400/gray/white?text=Prueba+1", id: "producto-1" },
        { src: "https://placehold.co/600x400/gray/white?text=Prueba+2", id: "producto-2" },
        { src: "https://placehold.co/600x400/gray/white?text=Prueba+3", id: "producto-3" },
        { src: "https://placehold.co/600x400/gray/white?text=Prueba+4", id: "producto-4" },
        { src: "https://placehold.co/600x400/gray/white?text=Prueba+5", id: "producto-5" },
        { src: "https://placehold.co/600x400/gray/white?text=Prueba+6", id: "producto-6" }
      ]
    },
    {
      id: 5,
      name: "Analgésicos",
      description: "Medicamentos para el alivio del dolor, desde analgésicos comunes hasta opioides para el manejo del dolor severo.",
      productsImages: [
        { src: "https://placehold.co/600x400/gray/white?text=Prueba+1", id: "producto-1" },
        { src: "https://placehold.co/600x400/gray/white?text=Prueba+2", id: "producto-2" },
        { src: "https://placehold.co/600x400/gray/white?text=Prueba+3", id: "producto-3" },
        { src: "https://placehold.co/600x400/gray/white?text=Prueba+4", id: "producto-4" },
        { src: "https://placehold.co/600x400/gray/white?text=Prueba+5", id: "producto-5" },
        { src: "https://placehold.co/600x400/gray/white?text=Prueba+6", id: "producto-6" }
      ]
    },
    {
      id: 6,
      name: "Cardiovascular",
      description: "Tratamientos para hipertensión, insuficiencia cardíaca, arritmias y otros trastornos del sistema cardiovascular.",
      productsImages: [
        { src: "https://placehold.co/600x400/gray/white?text=Prueba+1", id: "producto-1" },
        { src: "https://placehold.co/600x400/gray/white?text=Prueba+2", id: "producto-2" },
        { src: "https://placehold.co/600x400/gray/white?text=Prueba+3", id: "producto-3" },
        { src: "https://placehold.co/600x400/gray/white?text=Prueba+4", id: "producto-4" },
        { src: "https://placehold.co/600x400/gray/white?text=Prueba+5", id: "producto-5" },
        { src: "https://placehold.co/600x400/gray/white?text=Prueba+6", id: "producto-6" }
      ]
    }
  ];

  const handleAreaClick = (id) => {
    setActiveArea(activeArea === id ? null : id);
  };

  const handleProductClick = (productId) => {
    navigate(`/productos/${productId}`);
  };

  const imagesToShow = activeArea
    ? areas.find(a => a.id === activeArea).productsImages
    : areaImages.map((img, i) => ({ src: img, id: `area-${i}` }));

  return (
    <div 
      className="therapeutic-areas-container"
      style={{
        backgroundColor: 'var(--background-color-therapeutic)',
        color: 'var(--text-color-therapeutic)',
        boxShadow: `0 4px 10px var(--box-shadow-color-therapeutic)`
      }}
    >
      <h2>Áreas Terapéuticas</h2>

      <div className="areas-content">
        <div className="areas-list">
          <ul>
            {areas.map((area) => (
              <li 
                key={area.id}
                onClick={() => handleAreaClick(area.id)}
                className={activeArea === area.id ? "active" : ""}
                style={{
                  backgroundColor: activeArea === area.id ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)",
                  color: 'var(--text-color-therapeutic)'
                }}
              >
                <span className="area-name">{area.name}</span>
                {activeArea === area.id && (
                  <div className="area-description">
                    {area.description}
                    
                    {isMobile && activeArea === area.id && (
                      <div className="mobile-products">
                        <p className="click-hint">
                          Da clic en un producto para ver sus especificaciones
                        </p>
                        <div className="mobile-products-grid">
                          {area.productsImages.map((item, idx) => (
                            <div 
                              key={idx} 
                              className="mobile-product-item clickable" 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleProductClick(item.id);
                              }}
                            >
                              <img src={item.src} alt={`producto-${idx}`} />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        {!isMobile && (
          <div className="areas-gallery">
            {activeArea && (
              <p className="click-hint">
                Da clic en un producto para ver sus especificaciones
              </p>
            )}

            <div className="gallery-row">
              {imagesToShow.slice(0, 3).map((item, idx) => (
                <div 
                  key={idx} 
                  className={`gallery-item ${activeArea ? "clickable" : ""}`} 
                  onClick={() => activeArea && handleProductClick(item.id)}
                  style={{ cursor: activeArea ? "pointer" : "default" }}
                >
                  <img src={item.src} alt={`img-${idx}`} width="150" height="150" />
                </div>
              ))}
            </div>

            <div className="gallery-row">
              {imagesToShow.slice(3, 6).map((item, idx) => (
                <div 
                  key={idx} 
                  className={`gallery-item ${activeArea ? "clickable" : ""}`} 
                  onClick={() => activeArea && handleProductClick(item.id)}
                  style={{ cursor: activeArea ? "pointer" : "default" }}
                >
                  <img src={item.src} alt={`img-${idx}`} width="150" height="150" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default TherapeuticAreas;