import React from "react";
import style from "./Resultados.module.css";

import { ContentBox } from "@/components/ContentBox/ContentBox";
import { CustomButton } from "@/components/CustomButton/CustomButton";
import { useGetFetch } from "@/hooks/useGetFetch";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface Props {
  handleNextStep: () => void;
}

export const Resultados = ({ handleNextStep }: Props) => {
  const authState = useSelector((state: RootState) => state.auth.usuario);
  const { id } = useParams<{ id: string }>();
  const { data } = useGetFetch<any>(`servicio/getServiciosCliente/${authState?.uid}`);
  
  if (!data) {
    return <div>Cargando...</div>;
  }

  return (
    <div className={style.resultados__container}>
      <p className={style.resultados__title}>Resumen del servicio:</p>

      <div className={style.resultados__box__container}>
        {data.map((resultado: any) => (
          <ContentBox key={resultado.uid} additionalClassName={style.resultados__item}>
            <div>
              <p className={style.resultados__box__title}>Documento Contadora</p>
            </div>

            <div className={style.document__container}>
              {/* Enlace para abrir el archivo en una nueva pestaña */}
              <a
                href={resultado.documentContadora} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={style.document__link}
              >
                <CustomButton
                text="Descargar documento"
                backgroundButton="var(--primary-color-app)"
                colorP="#fff"
           
              />
              </a>
            </div>
          </ContentBox>
        ))}
      </div>

      <CustomButton
        text="Ya tengo toda la información"
        backgroundButton="var(--primary-color-app)"
        colorP="#fff"
        onClick={handleNextStep}
      />
    </div>
  );
};
