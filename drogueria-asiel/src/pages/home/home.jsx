import React from "react";
import "./home.css";
import Navbar from "../../components/navbar/navbar";
import Card from "../../components/card/card";
  import HistoriaIMG from "../../assets/Images/historia.webp";
  import VisionIMG from "../../assets/Images/medicinas-vision.webp";
  import MisionIMG from "../../assets/Images/familias-mision.webp";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">SALUD PARA SU FAMILIA</h1>
          <h2 className="hero-subtitle">MEDICAMENTOS DE CALIDAD</h2>
        </div>
      </div>
      <div className="cards-section">
        <Card 
          title="Nuestra Historia"
          content="ASIELSA es una empresa farmacéutica 100% guatemalteca, que nace con el objeto de contribuir y mejorar la 
          calidad de vida de las familias centroamericanas. Con más de 20 años de experiencia en el campo de servicios médicos, 
          contamos con productos de vanguardia, medicamentos de calidad a precios accesibles."
          backgroundImage= {HistoriaIMG}
        />
        <Card
          title="Visión"
          content="Ser una droguería líder en el mercado centroamericano, a través de alianzas estratégicas, para brindar productos
           de máxima calidad para el cuidado de la salud."
          backgroundImage= {VisionIMG}
        />
        <Card 
          title="Mision"
          content="Ser reconocidos por las familias y profesionales como una empresa ética y socialmente comprometida."
          backgroundImage= {MisionIMG}
        />
      </div>
    </div>
  );
};

export default Home;