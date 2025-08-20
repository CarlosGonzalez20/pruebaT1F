import React, { useState, memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./therapeuticAreas.css";

// Imágenes originales
import EstomagoIMG from "../../assets/Images/blanco-iconos-stomach.webp";
import CerebroIMG from "../../assets/Images/blanco-iconos-brain.webp";
import CorazonIMG from "../../assets/Images/blanco-iconos-heart.webp";
import IntestinosIMG from "../../assets/Images/intestino-blanco.webp";
import HigadoIMG from "../../assets/Images/higado-blanco.webp";
import BoteIMG from "../../assets/Images/bote-blanco.webp";


const colorSchemes = [
  { id: 1, background: "#136fba", text: "#ffffff", shadow: "rgba(174, 214, 129, 0.3)" },
  { id: 2, background: "#aed681", text: "#136fba", shadow: "rgba(19, 111, 186, 0.25)" },
  { id: 3, background: "#7ca3d6", text: "#000000", shadow: "rgba(19, 111, 186, 0.3)" },
  { id: 4, background: "#136fba", text: "#aed681", shadow: "rgba(255, 255, 255, 0.15)" },
  { id: 5, background: "#aed681", text: "#0a2a4d", shadow: "rgba(124, 163, 214, 0.3)" }
];

const TherapeuticAreas = memo(() => {
  const [activeArea, setActiveArea] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [colorSchemeIndex, setColorSchemeIndex] = useState(0);

  const navigate = useNavigate();

  const currentScheme = colorSchemes[colorSchemeIndex];

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
      productsImages: [ // 6 productos diferentes
        { src: "https://placehold.co/600x400/gray/white?text=Prueba+1", id: "producto-1" }, // cambiar el id por el de la base de datos
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
      productsImages: [ // 6 productos diferentes
        { src: "https://placehold.co/600x400/gray/white?text=Prueba+1", id: "producto-1" }, // cambiar el id por el de la base de datos
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
      productsImages: [ // 6 productos diferentes
        { src: "https://placehold.co/600x400/gray/white?text=Prueba+1", id: "producto-1" }, // cambiar el id por el de la base de datos
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
      productsImages: [ // 6 productos diferentes
        { src: "https://placehold.co/600x400/gray/white?text=Prueba+1", id: "producto-1" }, // cambiar el id por el de la base de datos
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
      productsImages: [ // 6 productos diferentes
        { src: "https://placehold.co/600x400/gray/white?text=Prueba+1", id: "producto-1" }, // cambiar el id por el de la base de datos
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
      productsImages: [ // 6 productos diferentes
        { src: "https://placehold.co/600x400/gray/white?text=Prueba+1", id: "producto-1" }, // cambiar el id por el de la base de datos
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

  const handleColorChange = (index) => {
    setColorSchemeIndex(index);
  };

  const handleProductClick = (productId) => {
    navigate(`/productos/${productId}`); // navega a la página del producto
  };

  const imagesToShow = activeArea
    ? areas.find(a => a.id === activeArea).productsImages
    : areaImages.map((img, i) => ({ src: img, id: `area-${i}` }));

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
        {colorSchemes.map((_, i) => (
          <button key={i} onClick={() => handleColorChange(i)}>{i+1}</button>
        ))}
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
                    {area.description}
                    
                    {/* Mostrar productos solo en móvil cuando un área está activa */}
                    {isMobile && activeArea === area.id && (
                      <div className="mobile-products">
                        <p className="click-hint" style={{ color: currentScheme.text, fontWeight: "bold", margin: "10px 0" }}>
                          Da clic en un producto para ver sus especificaciones
                        </p>
                        <div className="mobile-products-grid">
                          {area.productsImages.map((item, idx) => (
                            <div 
                              key={idx} 
                              className="mobile-product-item clickable" 
                              onClick={(e) => {
                                e.stopPropagation(); // Prevenir que se active el click del área
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

        {/* Mostrar galería solo en desktop */}
        {!isMobile && (
          <div className="areas-gallery">
            {activeArea && (
              <p className="click-hint" style={{ color: currentScheme.text, fontWeight: "bold", marginBottom: "10px" }}>
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