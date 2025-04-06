import React, { useState, memo } from "react";
import "./therapeuticAreas.css";

// Importamos las imágenes directamente
import EstomagoIMG from "../../assets/Images/blanco-iconos-stomach.webp";
import CerebroIMG from "../../assets/Images/blanco-iconos-brain.webp";
import CorazonIMG from "../../assets/Images/blanco-iconos-heart.webp";
import IntestinosIMG from "../../assets/Images/intestino-blanco.webp";
import RiñonesIMG from "../../assets/Images/riñones-blanco.webp";
import BoteIMG from "../../assets/Images/bote-blanco.webp";

const TherapeuticAreas = memo(() => {
  const [activeArea, setActiveArea] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Efecto para detectar cambios en el tamaño de la pantalla
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const areas = [
    {
      id: 1,
      name: "Multivitamínicos para pacientes diabéticos",
      description: "Formulaciones especializadas para pacientes en diálisis que ayudan a reponer nutrientes esenciales perdidos durante el tratamiento.",
      image: RiñonesIMG
    },
    {
      id: 2,
      name: "Multivitamínicos pediátricos",
      description: "Vitaminas especialmente formuladas para niños, con dosajes adecuados y sabores agradables para mejorar la adherencia al tratamiento.",
      image: CerebroIMG
    },
    {
      id: 3,
      name: "Gastrointestinal",
      description: "Medicamentos para el tratamiento de úlceras, reflujo, gastritis y otros trastornos del sistema digestivo.",
      image: EstomagoIMG
    },
    {
      id: 4,
      name: "Antibióticos",
      description: "Amplia gama de antibióticos para el tratamiento de infecciones bacterianas, incluyendo penicilinas, cefalosporinas y macrólidos.",
      image: IntestinosIMG
    },
    {
      id: 5,
      name: "Analgésicos",
      description: "Medicamentos para el alivio del dolor, desde analgésicos comunes hasta opioides para el manejo del dolor severo.",
      image: BoteIMG
    },
    {
      id: 6,
      name: "Cardiovascular",
      description: "Tratamientos para hipertensión, insuficiencia cardíaca, arritmias y otros trastornos del sistema cardiovascular.",
      image: CorazonIMG
    }
  ];

  const handleAreaClick = (id) => {
    setActiveArea(activeArea === id ? null : id);
  };

  return (
    <div className="therapeutic-areas-container">
      <h2>Áreas Terapéuticas</h2>
      
      <div className="areas-content">
        {/* Lista de áreas */}
        <div className="areas-list">
          <ul>
            {areas.map((area) => (
              <li 
                key={area.id}
                onClick={() => handleAreaClick(area.id)}
                className={activeArea === area.id ? "active" : ""}
              >
                {area.name}
                {activeArea === area.id && (
                  <div className="area-description">
                    {isMobile && (
                      <div className="mobile-image-container">
                        <img 
                          src={area.image} 
                          alt={area.name}
                          loading="lazy"
                          width="100"
                          height="100"
                        />
                      </div>
                    )}
                    {area.description}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
        
        {/* Galería de imágenes - solo en desktop */}
        {!isMobile && (
          <div className="areas-gallery">
            <div className="gallery-row">
              {areas.slice(0, 3).map((area) => (
                <div 
                  key={area.id}
                  className={`gallery-item ${activeArea === area.id ? "active" : ""}`}
                  onClick={() => handleAreaClick(area.id)}
                >
                  <img 
                    src={area.image} 
                    alt={area.name}
                    loading="lazy"
                    width="150"
                    height="150"
                  />
                </div>
              ))}
            </div>
            <div className="gallery-row">
              {areas.slice(3, 6).map((area) => (
                <div 
                  key={area.id}
                  className={`gallery-item ${activeArea === area.id ? "active" : ""}`}
                  onClick={() => handleAreaClick(area.id)}
                >
                  <img 
                    src={area.image} 
                    alt={area.name}
                    loading="lazy"
                    width="150"
                    height="150"
                  />
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