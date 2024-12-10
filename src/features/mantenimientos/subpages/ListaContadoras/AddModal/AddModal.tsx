import React, { useState, useEffect } from "react";
import style from "./AddModal.module.css";
import { handleChangeInput } from "@/helpers/handleTextBox";
import { Button } from "primereact/button";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";

interface PropsAddModal {
  onHideModal?: () => void;
  existingData?: any;
  onSave: (data: any) => void;
}

export const AddModal = ({ onHideModal, existingData, onSave }: PropsAddModal) => {
  const [newData, setNewData] = useState<any>({
    nombre: "",
    correo: "",
    nroFactura: "",
    valor: "",
  });

  useEffect(() => {
    if (existingData) {
      setNewData(existingData);
    }
  }, [existingData]);

  const handleSave = () => {
    onSave(newData);
  };

  return (
    <div className={style.column__container}>
      <TextBoxField
        textLabel="Prefijo"
        value={newData.nombre || ""}
        name="nombre"
        onChange={(e) => handleChangeInput(e, setNewData)}
      />

      <TextBoxField
        textLabel="Nro Factura"
        value={newData.nroFactura || ""}
        name="nroFactura"
        onChange={(e) => handleChangeInput(e, setNewData)}
      />

      <TextBoxField
        textLabel="NIT"
        value={newData.correo || ""}
        name="correo"
        onChange={(e) => handleChangeInput(e, setNewData)}
      />

      <TextBoxField
        textLabel="Valor"
        value={newData.valor || ""}
        name="valor"
        onChange={(e) => handleChangeInput(e, setNewData)}
      />

      <Button
        style={{ display: "flex", justifyContent: "center", fontWeight: "bold" }}
        className="p-button-sm p-button-info mr-2"
        onClick={handleSave}
      >
        {existingData ? "EDITAR SOPORTE" : "AGREGAR SOPORTE"}
      </Button>
    </div>
  );
};
