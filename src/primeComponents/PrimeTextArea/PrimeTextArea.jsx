import React from "react";
import { InputTextarea } from "primereact/inputtextarea";

export default function PrimeTextArea( { 
  value,
  onChange, 
  autoResize = true, 
  name,
  inputWidth = "100%",
  textLabel = "",
  direction = "column",
  height = "auto",
  placeholder = ""
  })
{

  const style = {
    display: "flex",
    flexDirection: direction,
    width: inputWidth,
    marginTop: "10px",
    height: height
  }

  return (
    <div className="card flex justify-content-center">
      <label> { textLabel } </label>
      <InputTextarea
        style={style}
        autoResize={autoResize} 
        value={value} 
        onChange={onChange} 
        rows={5} 
        cols={30}
        name={name}
        placeholder={placeholder}
      />
    </div>
  )
}