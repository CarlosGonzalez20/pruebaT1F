import React, { lazy, Suspense } from "react";
import "./home.css";
const Navbar = lazy(() => import("../../components/navbar/navbar"));
const Card = lazy(() => import("../../components/card/card"));
const TherapeuticAreas = lazy(() => import("../../components/therapeuticAreas/therapeuticAreas"));
import HistoriaIMG from "../../assets/Images/historia.webp?w=800&format=webp";
import VisionIMG from "../../assets/Images/medicinas-vision.webp?w=800&format=webp";
import MisionIMG from "../../assets/Images/familias-mision.webp?w=800&format=webp";
import DescripcionIMG from "../../assets/Images/description-us.webp?w=800&format=webp";
const Footer = lazy(() => import("../../components/footer/footer"));

// Datos de las cards en un array para mejor mantenibilidad
const cardData = [
  {
    title: "Nuestra Historia",
    content: "ASIEL S.A. es una empresa farmacéutica 100% guatemalteca, que nace con el objeto de contribuir y mejorar la calidad de vida de las familias centroamericanas. Con más de 20 años de experiencia en el campo de servicios médicos, contamos con productos de vanguardia, medicamentos de calidad a precios accesibles.",
    backgroundImage: HistoriaIMG,
    id: 1
  },
  {
    title: "Visión",
    content: "Ser una droguería líder en el mercado centroamericano, a través de alianzas estratégicas, para brindar productos de máxima calidad para el cuidado de la salud.",
    backgroundImage: VisionIMG,
    id: 2
  },
  {
    title: "Mision",
    content: "Ser reconocidos por las familias y profesionales como una empresa ética y socialmente comprometida.",
    backgroundImage: MisionIMG,
    id: 3
  },
  {
    title: "Descripción",
    content: "ASIEL S.A. es salud para su familia, porque conocemos las necesidades de nuestros pacientes y hemos enfocado nuestros esfuerzos a satisfacer cada una de ellas.  Hoy poseemos una línea de productos integrada por: multivitamínicos para pacientes diabéticos y multivitamínicos pediátricos, gastrointestinal, antibióticos, analgésicos, etc.",
    backgroundImage: DescripcionIMG,
    id: 4
  },
];

const Home = () => {
  return (
    <div className="home">
      <Suspense fallback={null}> {/* No mostrar fallback para navbar */}
        <Navbar />
      </Suspense>
      
      <header className="hero-section">
        {/* Imagen hero en CSS (ya optimizado) */}
        <div className="hero-content">
          <h1 className="hero-title">SALUD PARA SU FAMILIA</h1>
          <h2 className="hero-subtitle">MEDICAMENTOS DE CALIDAD</h2>
        </div>
      </header>
      <div id="sobre-nosotros"></div>
      <section className="cards-section">
        {cardData.map(card => (
          <Card 
            key={card.id}
            title={card.title}
            content={card.content}
            backgroundImage={card.backgroundImage}
          />
        ))}
      </section>

      <TherapeuticAreas />

      <Suspense fallback={null}>
        <div id ="contacto"></div>
        <Footer />
      </Suspense>
    </div>
  );
};

export default React.memo(Home);