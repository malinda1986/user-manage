import React from "react";
import './Card.scss';

const Card = ({ children, style={} }) => {
  return (
    <div className="rms-card" style={style}>
      {children}
    </div>
  );
};

export default Card;
