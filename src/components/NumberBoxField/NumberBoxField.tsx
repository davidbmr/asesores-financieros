import React from "react";
import style from "./NumberBoxField.module.css";

import {
  InputNumber,
  InputNumberValueChangeEvent,
} from "primereact/inputnumber";

interface NumberBoxFieldProps {
  textLabel?: string;
  value: number | undefined;
  name: string;
  onChange: (e: InputNumberValueChangeEvent) => void;
}

export const NumberBoxField = ({
  textLabel,
  value,
  name,
  onChange,
}: NumberBoxFieldProps) => {
  return (
    <div className={style.column__item}>
      {textLabel ? <label>{textLabel}</label> : <></>}
      <InputNumber
        value={value}
        name={name}
        onValueChange={onChange}
        minFractionDigits={2}
        maxFractionDigits={5}
      />
    </div>
  );
};
