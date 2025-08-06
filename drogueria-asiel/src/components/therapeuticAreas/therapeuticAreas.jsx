import React, { useState, memo, useEffect } from "react";
import "./therapeuticAreas.css";

// Imágenes
import EstomagoIMG from "../../assets/Images/blanco-iconos-stomach.webp";
import CerebroIMG from "../../assets/Images/blanco-iconos-brain.webp";
import CorazonIMG from "../../assets/Images/blanco-iconos-heart.webp";
import IntestinosIMG from "../../assets/Images/intestino-blanco.webp";
import HigadoIMG from "../../assets/Images/higado-blanco.webp";
import BoteIMG from "../../assets/Images/bote-blanco.webp";

const colorSchemes = [
  {
    id: 1,
    background: "#136fba",  // Azul fuerte (fondo)
    text: "#ffffff",        // Blanco (texto en cajón - máximo contraste)
    shadow: "rgba(174, 214, 129, 0.3)"  // Sombra verde pastel (cajón)
  },
  {
    id: 2,
    background: "#aed681",  // Verde pastel (fondo)
    text: "#136fba",        // Azul fuerte (texto en cajón - contraste claro)
    shadow: "rgba(19, 111, 186, 0.25)"  // Sombra azul
  },
  {
    id: 3,
    background: "#7ca3d6",  // Azul pastel (fondo)
    text: "#000000",        // Negro (texto legible sobre cajón claro)
    shadow: "rgba(19, 111, 186, 0.3)"  // Sombra azul fuerte
  },
  {
    id: 4,
    background: "#136fba",  // Azul fuerte (fondo oscuro)
    text: "#aed681",        // Verde pastel (texto vibrante pero legible)
    shadow: "rgba(255, 255, 255, 0.15)"  // Sombra blanca para suavizar
  },
  {
    id: 5,
    background: "#aed681",  // Verde pastel (fondo claro)
    text: "#0a2a4d",        // Azul oscuro (texto profesional)
    shadow: "rgba(124, 163, 214, 0.3)"  // Sombra azul pastel
  }
];

const TherapeuticAreas = memo(() => {
  const [activeArea, setActiveArea] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [colorSchemeIndex, setColorSchemeIndex] = useState(0); // Para botones 1-3

  const currentScheme = colorSchemes[colorSchemeIndex];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const areas = [
    {
      id: 1,
      name: "Multivitamínicos para pacientes diabéticos",
      description: "Formulaciones especializadas para pacientes en diálisis que ayudan a reponer nutrientes esenciales perdidos durante el tratamiento.",
      image: HigadoIMG
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

  const handleColorChange = (index) => {
    setColorSchemeIndex(index);
  };

  return (
    <div 
      className="therapeutic-areas-container"
      style={{
        backgroundColor: currentScheme.background,
        color: currentScheme.text,
        boxShadow: `0 4px 10px ${currentScheme.shadow}`
      }}
    >
      <h2 style={{ color: currentScheme.text }}>Áreas Terapéuticas</h2>
      
      <h2>Presiona cualquier botón para cambiar de color</h2>

      <div className="color-buttons">
        <button onClick={() => handleColorChange(0)}>1</button>
        <button onClick={() => handleColorChange(1)}>2</button>
        <button onClick={() => handleColorChange(2)}>3</button>
        <button onClick={() => handleColorChange(3)}>4</button>
        <button onClick={() => handleColorChange(4)}>5</button>
      </div>

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
                  color: currentScheme.text
                }}
              >
                {area.name}
                {activeArea === area.id && (
                  <div className="area-description" style={{ color: currentScheme.text }}>
                    {isMobile && (
                      <div className="mobile-image-container">
                        <img src={area.image} alt={area.name} loading="lazy" width="100" height="100" />
                      </div>
                    )}
                    {area.description}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        {!isMobile && (
          <div className="areas-gallery">
            <div className="gallery-row">
              {areas.slice(0, 3).map((area) => (
                <div 
                  key={area.id}
                  className={`gallery-item ${activeArea === area.id ? "active" : ""}`}
                  onClick={() => handleAreaClick(area.id)}
                  style={{ borderColor: activeArea === area.id ? currentScheme.text : "transparent" }}
                >
                  <img src={area.image} alt={area.name} loading="lazy" width="150" height="150" />
                </div>
              ))}
            </div>
            <div className="gallery-row">
              {areas.slice(3, 6).map((area) => (
                <div 
                  key={area.id}
                  className={`gallery-item ${activeArea === area.id ? "active" : ""}`}
                  onClick={() => handleAreaClick(area.id)}
                  style={{ borderColor: activeArea === area.id ? currentScheme.text : "transparent" }}
                >
                  <img src={area.image} alt={area.name} loading="lazy" width="150" height="150" />
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



// import React, { useState, memo } from "react";
// import "./therapeuticAreas.css";

// // Importamos las imágenes directamente
// import EstomagoIMG from "../../assets/Images/blanco-iconos-stomach.webp";
// import CerebroIMG from "../../assets/Images/blanco-iconos-brain.webp";
// import CorazonIMG from "../../assets/Images/blanco-iconos-heart.webp";
// import IntestinosIMG from "../../assets/Images/intestino-blanco.webp";
// import HigadoIMG from "../../assets/Images/higado-blanco.webp";
// import BoteIMG from "../../assets/Images/bote-blanco.webp";

// const TherapeuticAreas = memo(() => {
//   const [activeArea, setActiveArea] = useState(null);
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

//   // Efecto para detectar cambios en el tamaño de la pantalla
//   React.useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };
    
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const areas = [
//     {
//       id: 1,
//       name: "Multivitamínicos para pacientes diabéticos",
//       description: "Formulaciones especializadas para pacientes en diálisis que ayudan a reponer nutrientes esenciales perdidos durante el tratamiento.",
//       image: HigadoIMG
//     },
//     {
//       id: 2,
//       name: "Multivitamínicos pediátricos",
//       description: "Vitaminas especialmente formuladas para niños, con dosajes adecuados y sabores agradables para mejorar la adherencia al tratamiento.",
//       image: CerebroIMG
//     },
//     {
//       id: 3,
//       name: "Gastrointestinal",
//       description: "Medicamentos para el tratamiento de úlceras, reflujo, gastritis y otros trastornos del sistema digestivo.",
//       image: EstomagoIMG
//     },
//     {
//       id: 4,
//       name: "Antibióticos",
//       description: "Amplia gama de antibióticos para el tratamiento de infecciones bacterianas, incluyendo penicilinas, cefalosporinas y macrólidos.",
//       image: IntestinosIMG
//     },
//     {
//       id: 5,
//       name: "Analgésicos",
//       description: "Medicamentos para el alivio del dolor, desde analgésicos comunes hasta opioides para el manejo del dolor severo.",
//       image: BoteIMG
//     },
//     {
//       id: 6,
//       name: "Cardiovascular",
//       description: "Tratamientos para hipertensión, insuficiencia cardíaca, arritmias y otros trastornos del sistema cardiovascular.",
//       image: CorazonIMG
//     }
//   ];

//   const handleAreaClick = (id) => {
//     setActiveArea(activeArea === id ? null : id);
//   };

//   return (
//     <div className="therapeutic-areas-container">
//       <h2>Áreas Terapéuticas</h2>
//       <button>1</button>
//       <button>2</button>
//       <button>3</button>
//       <div className="areas-content">
//         {/* Lista de áreas */}
//         <div className="areas-list">
//           <ul>
//             {areas.map((area) => (
//               <li 
//                 key={area.id}
//                 onClick={() => handleAreaClick(area.id)}
//                 className={activeArea === area.id ? "active" : ""}
//               >
//                 {area.name}
//                 {activeArea === area.id && (
//                   <div className="area-description">
//                     {isMobile && (
//                       <div className="mobile-image-container">
//                         <img 
//                           src={area.image} 
//                           alt={area.name}
//                           loading="lazy"
//                           width="100"
//                           height="100"
//                         />
//                       </div>
//                     )}
//                     {area.description}
//                   </div>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </div>
        
//         {/* Galería de imágenes - solo en desktop */}
//         {!isMobile && (
//           <div className="areas-gallery">
//             <div className="gallery-row">
//               {areas.slice(0, 3).map((area) => (
//                 <div 
//                   key={area.id}
//                   className={`gallery-item ${activeArea === area.id ? "active" : ""}`}
//                   onClick={() => handleAreaClick(area.id)}
//                 >
//                   <img 
//                     src={area.image} 
//                     alt={area.name}
//                     loading="lazy"
//                     width="150"
//                     height="150"
//                   />
//                 </div>
//               ))}
//             </div>
//             <div className="gallery-row">
//               {areas.slice(3, 6).map((area) => (
//                 <div 
//                   key={area.id}
//                   className={`gallery-item ${activeArea === area.id ? "active" : ""}`}
//                   onClick={() => handleAreaClick(area.id)}
//                 >
//                   <img 
//                     src={area.image} 
//                     alt={area.name}
//                     loading="lazy"
//                     width="150"
//                     height="150"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// });

// export default TherapeuticAreas;