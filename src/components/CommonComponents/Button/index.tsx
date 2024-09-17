import React from "react";
import { CSSProperties } from "react";

interface ButtonProps {
  title: string;
  icon?: React.ReactNode;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  title,
  icon,
  backgroundColor = "#f93b1d",
  textColor = "#ffffff",
  borderColor = "#f93b1d",
  onClick,
  type = "button",
}) => {
  const buttonStyle: CSSProperties = {
    backgroundColor,
    color: textColor,
    border: `1px solid ${borderColor}`,
    borderRadius: "4px",
    padding: "1rem 1.6rem",
    display: "flex",
    gap: "0.2rem",
    alignItems: "center",
    cursor: "pointer",
    fontSize: "1.2rem",
  };

  const iconStyle: CSSProperties = {
    marginRight: "0.5rem",
  };

  return (
    <button style={buttonStyle} onClick={onClick} type={type}>
      {icon && <span style={iconStyle}>{icon}</span>}
      {title}
    </button>
  );
};

export default Button;
