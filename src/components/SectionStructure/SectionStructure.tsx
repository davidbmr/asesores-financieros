// Estructura para las secciones del contenido principal (Fondo blanco con bordes redondeados)
import React from 'react';
import style from './SectionStructure.module.css';

interface SectionStructureProps {
  children: React.ReactNode;
  additionalClassName?: string; // Hacer la prop opcional
}

export const SectionStructure = ({ children, additionalClassName }: SectionStructureProps) => {
  // Combinar los estilos predeterminados con la clase adicional si se proporciona
  const containerClassName = `${style.sectionStructure__container} ${additionalClassName || ''}`;

  return (
    <div className={containerClassName}>
      {children}
    </div>
  );
};
