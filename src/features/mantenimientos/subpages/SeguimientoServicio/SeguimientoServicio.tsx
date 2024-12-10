import React, { useEffect, useState } from "react";
import style from "./SeguimientoServicio.module.css";

import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";
import { LineaTiempo } from "./components/LineaTiempo/LineaTiempo";
import { ContenidoSeguimiento } from "./components/ContenidoSeguimiento/ContenidoSeguimiento";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { useGetFetch } from "@/hooks/useGetFetch";
import ChatButton from "@/components/ChatButton/ChatButton";
import ChatWindow from "@/components/ChatButton/components/ChatWindow";
import { CustomButton } from "@/components/CustomButton/CustomButton";

export const SeguimientoServicio = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const authState = useSelector((state: RootState) => state.auth.usuario);

  const { data, reloadFetchData } = useGetFetch<any>(
    `servicio/getServicio/${
      authState?.servicioCliente || localStorage.getItem("uid")
    }`
  );

  useEffect(() => {
    if (data && data.paso) {
      setCurrentStep(data.paso);
    }
  }, [data]);

  const handleStepClick = (step: number) => {
    setCurrentStep(step);
  };

  const handleNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleChatButtonClick = () => {
    setIsChatOpen(!isChatOpen);
  };



  return (
    <MainContentStructure titleText="Seguimiento de servicio">
      <div className={style.seguimientoServicio__container}>
        <LineaTiempo
          steps={steps}
          currentStep={currentStep}
          onClickStep={handleStepClick}
        />
        <ContenidoSeguimiento
          currentStep={currentStep}
          handleNextStep={handleNextStep}
          data={data}
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

const steps = [
  { id: 1, label: "Reunión con tu contadora" },
  { id: 2, label: "Subir documentos" },
  { id: 3, label: "Resultados del servicio" },
  { id: 4, label: "Encuesta de satisfacción" },
];
