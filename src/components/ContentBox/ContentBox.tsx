import React from "react";
import style from "./ContentBox.module.css";

interface ContentBoxProps {
  children: React.ReactNode;
  backgroundActive?: boolean;
  additionalClassName?: string;
  hasBorder?: boolean; // Nueva prop para controlar el borde
}

export const ContentBox = ({ children, backgroundActive = false, additionalClassName = "", hasBorder = true }: ContentBoxProps) => {
  // Combinar las clases, incluyendo la clase del borde si hasBorder es true
  const combinedClassNames = `${style.contentBox__container} ${backgroundActive && style.backgroundActive} ${hasBorder && style.hasBorder} ${additionalClassName}`;

  return (
    <div className={combinedClassNames}>
      {children}
    </div>
  );
};
