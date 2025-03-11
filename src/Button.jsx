import React from "react";

// Component Button
const Button = ({ label, onClick, className, icon }) => {
  return (
    <button onClick={onClick} className={`btn ${className}`}>
      {icon && <i className={icon}></i>} {/* Icono opcional */}
      {label} {/* Texto del botón */}
    </button>
  );
};

export default Button;