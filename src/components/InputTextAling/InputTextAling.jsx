import React from "react";
import { InputText } from "primereact/inputtext";
import style from "./InputTextAling.module.css"

export default function InputTextFormAling({
  nameLabel,
  nameInput,
  value,
  onInputChange,
  disabled,
  placeholder,
  flexBasis = "70%",
  width = "100%",
  additionalElement,
  onClick,
  color = "black"
}) {

  const inputStyle = {
    flexBasis: flexBasis,
    width: width,
    color: color
  };

  return (
    <div className={style.InputTextaling}>
      <label htmlFor={nameInput} className={style.Labelaling}>
        <strong>{nameLabel}</strong>
      </label>
      {additionalElement && (
        <div style={{ display: "flex", alignItems: "center" }}>
          {additionalElement}
        </div>
      )}
      <InputText
        id={nameInput}
        name={nameInput}
        value={value}
        onChange={onInputChange}
        autoComplete="off"
        disabled={disabled}
        placeholder={placeholder}
        className={style.Inputaling}
        style={inputStyle}
        onClick={onClick}
      />
    </div>
  );
}
