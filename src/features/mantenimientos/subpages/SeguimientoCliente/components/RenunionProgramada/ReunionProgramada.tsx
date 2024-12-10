import React from "react";
import { MeetingStatusBox } from "@/components/MeetingStatusBox/MeetingStatusBox";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { CustomButton } from "@/components/CustomButton/CustomButton";
import style from "./ReunionProgramada.module.css"
interface ReunionProgramadaProps {
  data: any;
  handleStepClick: any;
  reloadFetchData?: any;
}

export const ReunionProgramada = ({
  data,
  handleStepClick,
  reloadFetchData,
}: ReunionProgramadaProps) => {
  // Extraer el primer valor de status_reunion, asegurándonos de que sea un array.
  const status = Array.isArray(data?.status_reunion)
    ? data.status_reunion[0]
    : "pendiente";
  const handleAddToCalendar = () => {
    if (data?.linkICS) {
      window.open(data?.linkICS, "_blank", "noopener,noreferrer");
    } else {
      console.error("No se ha proporcionado un linkICS");
    }
  };

 
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}>
      {/* Pasar el status extraído al componente */}
      <MeetingStatusBox
        status={status.toLowerCase()}
        data={data}
        handleStepClick={handleStepClick}
        reloadFetchData={reloadFetchData}
      />

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
