import React, { useState } from "react";
import style from "./ReunionProgramada.module.css";
import { MeetingStatusBox } from "@/components/MeetingStatusBox/MeetingStatusBox";
import { CalendlyEmbed } from "../../../SeleccionarContadora/CalendlyButton/CalendlyEmbed";
import { CustomButton } from "@/components/CustomButton/CustomButton";

export const ReunionProgramada = ({ data }: any) => {
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [agendarReunion, setagendarReunion] = useState(false);

    const agendarReunionContador = () => {
        setagendarReunion(true);
    };

    // Asegurarse de que status_reunion esté presente y no esté vacío antes de acceder al primer elemento
    const status = data?.status_reunion?.[0]?.toLowerCase() || "desconocido";

    const handleAddToCalendar = () => {
        if (data?.linkICS) {
          window.open(data?.linkICS, "_blank", "noopener,noreferrer");
        } else {
          console.error("No se ha proporcionado un linkICS");
        }
      };

      console.log(data)

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <br />
            <MeetingStatusBox status={status} data={data} />

            {data?.linkICS && (
        <>
         {
          data?.status_reunion?.[0] !== "CANCELAR" && (
            <CustomButton
            additionalClassName={style.reunionProgramada__item}
              text="Agregar a calendario"
              backgroundButton="var(--primary-color-app)"
              colorP="#fff"
              onClick={handleAddToCalendar}
            />
          )
         }
        </>
      )}
        </div>
    );
};
