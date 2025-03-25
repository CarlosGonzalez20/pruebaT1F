import React from "react";
import "./home.css";
import Navbar from "../../components/navbar/navbar";
import Card from "../../components/card/card";

const Home = () => {
  const cardsData = [
    {
      title: "Sobre Nosotros",
      subtitle: "02 Marketing Farmacéutico",
      items: ["Mi información", "Mi información", "Mi información"]
    },
    {
      title: "Misión",
      subtitle: "03 Distribución y Comercialización",
      items: ["Mi información", "Mi información"]
    },
    {
      title: "Visión",
      subtitle: "04 Marketing Farmacéutico",
      items: ["Mi información", "Mi información", "Mi información"]
    },
  ];

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
        {cardsData.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            subtitle={card.subtitle}
            items={card.items}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;