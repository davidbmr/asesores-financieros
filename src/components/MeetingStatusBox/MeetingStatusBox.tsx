import React from "react";
import { ContentBox } from "../ContentBox/ContentBox";
import style from "./MeetingStatusBox.module.css";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { CustomButton } from "@/components/CustomButton/CustomButton"; // Asegúrate de importar tu botón personalizado
import { useUpdateFetch } from "@/hooks/useUpdateFetch"; // Importa el hook
import { useParams } from "react-router-dom";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
interface Props {
  status: string;
  data?: any;
  handleStepClick?: (step: number) => void;
  reloadFetchData?: any;
}

export const MeetingStatusBox = ({
  status = "",
  data,
  reloadFetchData,
  handleStepClick,
}: Props) => {
  const authState = useSelector((state: RootState) => state.auth.usuario);
  const { updateFetchData, isLoadingUpdate } = useUpdateFetch(
    "servicio/updateServicio",
    "",
	undefined,
	undefined,
	undefined,
	false
  );
  const { id } = useParams<{ id: string }>();
  console.log(data);

  const handleContinue = async () => {
    const requestData = {
      fecha: data?.fecha || "",
      hora: data?.hora || "",
      labelFiles: data?.labelFiles || [],
      files: [],
      titulo: "Test",
      descripcion: "test",
      documentContadora: "documento",
      paso: 2,
    };

    try {
      await updateFetchData(id, requestData);
      console.log("Actualización exitosa");
      if (handleStepClick) {
        handleStepClick(2);
      }
    } catch (error) {
      console.error("Error actualizando el servicio:", error);
    }
  };

  const handleCancel = async () => {
    const requestData = {
      ...data, // Mantiene los datos originales
      status_reunion: ["CANCELAR"], // Cambiamos el estado de la reunión a "CANCELAR"
    };

    try {
      await updateFetchData(id, requestData);
      console.log("Reunión cancelada exitosamente");
      reloadFetchData(); // Recargar los datos
      if (handleStepClick) {
        handleStepClick(0); // Actualizar el paso si es necesario
      }
    } catch (error) {
      console.error("Error cancelando la reunión:", error);
    }
  };

  const confirm2 = () => {
      confirmDialog({
          message: '¿Deseas cancelar esta reunión?',
          header: 'Confirmación de cancelación',
          icon: 'pi pi-info-circle',
          accept: () => handleCancel(),
          reject: () => {},
          acceptClassName: 'p-button-danger'
      });
  };

  return (
    <>
      {status === "activa" && (
        <ContentBox
          additionalClassName={`${style.reunionProgramada__containers} ${style.reunionProgramada__activa}`}
        >
          <div className={style.reunionProgramada__item}>
            <p>Actualmente tu reunión se encuentra programada</p>
            <p>|</p>
            <p>Día: {data?.fecha}</p>
            <p>|</p>
            <p>Hora: {data?.hora}</p>
          </div>

          <div className={style.reunionProgramada__item}>
            <p>
              Enlace:{" "}
              <a
                className={style.reunionProgramada__item__link}
                href={data?.linkReunion}
                target="_blank"
                rel="noopener noreferrer"
              >
                {data?.linkReunion}
              </a>
            </p>
          </div>

          {authState?.role === "CONTADORA" && (
            <div style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
            }}>
              <div className={style.reunionProgramada__item}>
                <CustomButton
                  text="Continuar"
                  backgroundButton="var(--primary-color-app)"
                  colorP="#fff"
                  onClick={handleContinue}
                />
              </div>

              {/* Botón para cancelar la reunión */}
              <div className={style.reunionProgramada__item}>
                <CustomButton
                  text="Cancelar"
                  backgroundButton="#d41414"
                  colorP="#fff"
                  onClick={() => confirm2()}
                />
              </div>
            </div>
          )}
        </ContentBox>
      )}

      {status === "pendiente" && (
        <ContentBox
          additionalClassName={`${style.reunionProgramada__container} ${style.reunionProgramada__pendiente}`}
        >
          <div className={style.reunionProgramada__item}>
            <p>No se ha programado una reunión con tu contadora.</p>
          </div>
        </ContentBox>
      )}

      {status === "cancelar" && (
        <ContentBox
          additionalClassName={`${style.reunionProgramada__container} ${style.reunionProgramada__cancelada}`}
        >
          <div className={style.reunionProgramada__item}>
         <div style={{
          display: "flex",
          flexDirection: "column",

          gap: "1rem",
         }}>
         <p>
            {
              authState?.role === "CONTADORA" ? (
                " No se ha podido realizar la reunión, reprograma una nueva fecha con tu cliente"
              ) : (
                `
                 No se ha podido realizar la reunión, reprograma una nueva fecha
                 con tu contadora
                `
              )
            }
            </p>
            {
              authState?.role === "CONTADORA" && (
                <CustomButton
                text="Continuar"
                backgroundButton="var(--primary-color-app)"
                colorP="#fff"
                onClick={handleContinue}
              />
              )
            }
          
          </div>
         </div>
        </ContentBox>
      )}
      <ConfirmDialog />
    </>
  );
};
