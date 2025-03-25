import React from "react";
import "./card.css";

const Card = ({ title, content, backgroundImage }) => {
  const cardStyle = backgroundImage 
    ? { 
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white'
      } 
    : {};

  return (
    <div className="card" style={cardStyle}>
      <div className="card-overlay">
        <div className="card-header">
          <h2 className="card-title">{title}</h2>
        </div>
        <div className="card-body">
          <div className="card-content">{content}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;