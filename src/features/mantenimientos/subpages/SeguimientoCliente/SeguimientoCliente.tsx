import React, { useState, useEffect } from "react";
import style from "./SeguimientoCliente.module.css";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";
import { LineaTiempo } from "./components/LineaTiempo/LineaTiempo";
import { ContenidoSeguimiento } from "./components/ContenidoSeguimiento/ContenidoSeguimiento";
import { useParams } from "react-router-dom";
import { useGetFetch } from "@/hooks/useGetFetch";
import { useUpdateFetch } from "@/hooks/useUpdateFetch"; // Importa el hook para actualizar
import ChatButton from "@/components/ChatButton/ChatButton";
import ChatWindow from "@/components/ChatButton/components/ChatWindow";
import { CustomButton } from "@/components/CustomButton/CustomButton";

const steps = [
  { id: 1, label: "Reunión con tu cliente" },
  { id: 2, label: "Solicitar documentos" },
  { id: 3, label: "Envio de resultados" },
];

export const SeguimientoCliente = () => {
  const { id } = useParams<{ id: string }>();
  const { data,reloadFetchData } = useGetFetch<any>(`servicio/getServicio/${id}`);
  const { updateFetchData, isLoadingUpdate } = useUpdateFetch(
    "servicio/updateServicio",
    "",
    undefined,
    undefined,
    undefined,
    false
  );
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  useEffect(() => {
    if (data && data.paso) {
      setCurrentStep(data.paso);
    }
  }, [data]);

  const handleStepClick = (step: number) => {
    setCurrentStep(step);
  };

  const handleStepBack = async () => {
    if (currentStep > 1) {
      const newStep = currentStep - 1;
      const requestData = {
        fecha: data?.fecha || "",
        hora: data?.hora || "",
        labelFiles: data?.labelFiles || [],
        files: [],
        titulo: data?.titulo || "Actualización de paso",
        descripcion:
          data?.descripcion || "Retrocediendo un paso en el seguimiento",
        documentContadora: data?.documentContadora || "documento",
        paso: newStep, // Actualizamos al paso anterior
      };

      try {
        await updateFetchData(id, requestData); // Hacer la petición al backend
        console.log("Paso retrocedido con éxito");
        setCurrentStep(newStep); // Actualizar el estado local con el nuevo paso
      } catch (error) {
        console.error("Error retrocediendo el paso:", error);
      }
    }
  };

  const handleChatButtonClick = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleAddToCalendar = () => {
		if (data?.linkICS) {
		  window.open(data?.linkICS, "_blank", "noopener,noreferrer");
		} else {
		  console.error("No se ha proporcionado un linkICS");
		}
	  };

  return (
    <MainContentStructure titleText="Seguimiento de cliente">
      <div className={style.seguimientoServicio__container}>
        <LineaTiempo
          steps={steps}
          currentStep={currentStep}
          onClickStep={handleStepClick}
          onStepBack={handleStepBack} // Pasamos la función de retroceso
        />
        <ContenidoSeguimiento
          currentStep={currentStep}
          data={data}
          handleStepClick={handleStepClick}
          reloadFetchData={reloadFetchData}
        />
        <ChatButton onClick={handleChatButtonClick} />
        <ChatWindow
          isOpen={isChatOpen}
          onClose={handleChatButtonClick}
          chatId={data?.chat_id}
        />


      </div>
    </MainContentStructure>
  );
};
