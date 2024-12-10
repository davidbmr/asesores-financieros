import React from "react";
import style from "./FichaContadora.module.css";
import { ContentBox } from "@/components/ContentBox/ContentBox";

interface Cliente {
  _id: string;
  nombre: string;
  correo: string;
  contraseña: string;
  apllido_materno: string;
  apllido_paterno: string;
  dni: string;
  celular: string;
  role: string;
  contadora: string;
  clientes: any[];
  __v: number;
  servicioCliente: {
    linkReunion: string;
    labelFiles: any[];
    files: any[];
    titulo: string;
    descripcion: string;
    documentContadora: string;
    paso: number[];
    state: string[];
    cliente_id: string;
    fecha: string;
    hora: string;
    fecha_creacion: string;
    uid: string;
  };
}

interface Contadora {
  _id: string;
  nombre: string;
  correo: string;
  contraseña: string;
  role: string;
  experiencia: string;
  clientes: Cliente[];
  fecha_nacimiento?: string;
  imgContadora?: string;
  especialidad?: string;
  __v: number;
}

interface Props {
  data: Contadora;
}

export const FichaContadora: React.FC<Props> = ({ data }: Props) => {
  console.log(data);
  return (
    <ContentBox additionalClassName={style.fichaContadora__container}>
      <div className={style.fichaContadora__img__container}>
        <img
          className={style.fichaContadora__img}
          src={data?.contadora?.imgContadora}
          alt=""
        />
      </div>
      <div className={style.fichaContadora__data}>
        <p className={style.fichaContadora__title}>Ficha de contadora</p>
        <div className={style.fichaContadora__fields__container}>
          <div className={style.fichaContadora__field}>
            <p className={style.fichaContadora__label}>Nombre:</p>
            <p className={style.fichaContadora__text}>
              {data?.contadora?.nombre}
            </p>
          </div>
          <div className={style.fichaContadora__field}>
            <p className={style.fichaContadora__label}>Código de Colegiada:</p>
            <p className={style.fichaContadora__text}>
              {data?.contadora?.codigo_colegiala}
            </p>
          </div>
          <div className={style.fichaContadora__field}>
            <p className={style.fichaContadora__label}>Correo:</p>
            <p className={style.fichaContadora__text}>
              {data?.contadora?.correo}
            </p>
          </div>
          <div className={style.fichaContadora__field}>
            <p className={style.fichaContadora__label}>Experiencia:</p>
            <p className={style.fichaContadora__text}>
              {data?.contadora?.experiencia} 
            </p>
          </div>
          <div className={style.fichaContadora__field}>
            <p className={style.fichaContadora__label}>Telefono:</p>
            <p className={style.fichaContadora__text}>
              {data?.contadora?.celular} 
            </p>
          </div>
     
        </div>
      </div>
    </ContentBox>
  );
};
