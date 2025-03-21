import React from "react";
import "./home.css";
import Navbar from "../../components/navbar/navbar";
import medicamentos from "../../assets/Images/medicamentos.webp"; // Importa la imagen

const Home = () => {
    return (
        <div className="home">
            <Navbar />
            <img src={medicamentos} alt="medicamentos" className="medicamentos" />
        </div>
    );
};

export default Home;