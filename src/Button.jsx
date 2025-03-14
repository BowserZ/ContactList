import React from "react";

// Component Button
const Button = ({ label, onClick, className, icon }) => {
  return (
    <button onClick={onClick} className={`btn ${className}`}>
      {icon && <i className={icon}></i>} {/* optional Icon */}
      {label} {/* Text of button */}
    </button>
  );
};

export default Button;