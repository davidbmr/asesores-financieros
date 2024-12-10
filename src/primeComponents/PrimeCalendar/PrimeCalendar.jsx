import React from "react";
import { Calendar } from "primereact/calendar";
import style from "./PrimeCalendar.module.css";
import { addLocale, locale } from "primereact/api";

const PrimeCalendar = ({ value, onChange, label = "", width = "100%", name = "" }) => {
  addLocale("es", {
    firstDayOfWeek: 1,
    dayNames: [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ],
    dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
    dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
    monthNames: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    monthNamesShort: [
      "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic",
    ],
    today: "Hoy",
    clear: "Limpiar",
    dateFormat: 'dd/mm/yy'  // Formato de fecha deseado
  });

  locale("es");

  const parseDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString);
  };

  const initialDate = typeof value === 'string' ? parseDate(value) : value;

  return (
    <div className={style.column__item} style={{ width }}>
      {label && <label className={style.label}>{label}</label>}
      <Calendar 
        value={initialDate} 
        onChange={onChange} 
        showIcon 
        dateFormat="dd/mm/yy"  // Formato de fecha deseado
        locale="es" 
        name={name} 
        className={style.calendar} 
      />
    </div>
  );
};

export default PrimeCalendar;
