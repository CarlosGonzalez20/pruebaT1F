import React from "react";
import "./card.css";

const Card = ({ title, subtitle, items }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">{title}</h2>
        {subtitle && <h3 className="card-subtitle">{subtitle}</h3>}
      </div>
      <div className="card-body">
        <ul className="card-list">
          {items.map((item, index) => (
            <li key={index} className="card-item">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Card;