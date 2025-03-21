import React from "react";
import "./home.css";
import Navbar from "../../components/navbar/navbar";

const Home = () => {
    return (
        <div className="home">
            <Navbar />
            <div className="medicamentos" />
        </div>
    );
};

export default Home;