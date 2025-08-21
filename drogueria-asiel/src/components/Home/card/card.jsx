import React, { useMemo } from "react";
import "./card.css";

const Card = React.memo(({ title, content, backgroundImage }) => {
  const cardStyle = useMemo(() => ({
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: backgroundImage ? 'white' : '#333'
  }), [backgroundImage]);

  return (
    <div className="card" style={cardStyle}>
      <div className={`card-overlay ${!backgroundImage ? 'no-bg' : ''}`}>
        <div className="card-header">
          <h2 className="card-title">{title}</h2>
        </div>
        <div className="card-body">
          <div className="card-content">{content}</div>
        </div>
      </div>
    </div>
  );
});

export default Card;