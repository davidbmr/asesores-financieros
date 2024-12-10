import React from "react";
import style from "./CustomButton.module.css";

interface CustomButtonProps {
  icon?: React.ReactNode;
  text: string;
  shortcut?: string;
  backgroundButton?: string;
  height?: string;
  colorP?: string;
  sizeP?: string;
  onClick?: () => void;
  disabled?: boolean;
  additionalClassName?: string; // Nueva prop para clase adicional
}

export const CustomButton = ({
  icon,
  text,
  shortcut,
  backgroundButton = "#eceff1",
  height = "auto",
  colorP = "black",
  sizeP,
  onClick,
  disabled,
  additionalClassName = "", // Valor por defecto como cadena vacía
}: CustomButtonProps) => {
  const styles: React.CSSProperties = {
    background: backgroundButton,
    height: height,
    color: colorP,
  };
  const stylesP: React.CSSProperties = {
    color: colorP,
    fontSize: sizeP,
  };

  return (
    <button
      className={`${style.button__action} ${additionalClassName}`} // Combinar clases
      style={styles}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
      <p className={style.button__text} style={stylesP}>
        {text} {shortcut ? `[${shortcut}]` : null}
      </p>
    </button>
  );
};
