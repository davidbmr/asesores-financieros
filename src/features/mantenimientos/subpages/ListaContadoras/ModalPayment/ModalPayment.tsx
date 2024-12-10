import React, { useState } from "react";
import style from "./ModalPayment.module.css";
import { handleChangeInput } from "@/helpers/handleTextBox";
import { Button } from "primereact/button";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { usePostFetch } from "@/hooks/usePostFetch";
import dayjs from "dayjs"; // Asegúrate de tener dayjs instalado para manejar fechas

interface PropsAddModal {
  onHideModal?: () => void;
  existingData?: any;
  reloadFetchData?: () => void;
}

export const ModalPayment = ({ onHideModal, existingData, reloadFetchData }: PropsAddModal) => {
  const [newData, setNewData] = useState({ monto: '' }); // Capturamos el monto
  const { postFetchData } = usePostFetch("pago/historial-pago", {
    sectionName: "Pago",
    reloadFetchData,
    addModal: { onHideModal },
  });

  console.log(existingData)

  const handleSavePayment = async () => {
    const body = {
      usuarioId: existingData.uid, // Extrae el ID del usuario del existingData
      monto: parseFloat(newData.monto), // Asegúrate de convertir el monto a número
      fechaPagoContadora: dayjs().format("DD/MM/YYYY"), // Fecha actual en formato requerido
    };

    await postFetchData(body);
  };

  return (
    <div className={style.column__container}>
      <TextBoxField
        textLabel="Nombre"
        value={existingData?.nombre || ""}
        name="nombre"
        disabled // Este campo es solo de visualización
        onChange={() => {}}
      />

      <TextBoxField
        textLabel="Monto"
        value={newData.monto}
        name="monto"
        onChange={(e) => handleChangeInput(e, setNewData)}
      />

      <Button
        style={{ display: "flex", justifyContent: "center", fontWeight: "bold" }}
        className="p-button-sm p-button-info mr-2"
        onClick={handleSavePayment}
      >
        {existingData ? "GUARDAR PAGO" : "AGREGAR USUARIO"}
      </Button>
    </div>
  );
};
