import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import style from "./Resultados.module.css";

import { ContentBox } from "@/components/ContentBox/ContentBox";
import { UploadField } from "@/components/UploadField/UploadField";
import { CustomButton } from "@/components/CustomButton/CustomButton";
import { ExcelUploader } from "@/components/ExcelUploader/ExcelUploader";
import { SectionStructure } from "@/components/SectionStructure/SectionStructure";
import { useGetFetch } from "@/hooks/useGetFetch";
import { useUpdateFetch } from "@/hooks/useUpdateFetch";

export const Resultados = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // Obtener los datos iniciales de la API
  const { data } = useGetFetch<any>(`servicio/getServicio/${id}`);

  // Estado para los datos del Excel
  const [excelData, setExcelData] = useState({
    SaldosMes: [],
    CuentasPorPagar: [],
    CuentasPorCobrar: [],
    ResumenImpuestos: [],
  });

  // Estado para el archivo subido
  const [uploadedFile, setUploadedFile] = useState<{
    name: string;
    base64: string;
    extension?: string;
  } | null>(null);

  // Hook para manejar la actualización
  const { updateFetchData, isLoadingUpdate } = useUpdateFetch(
    "servicio/updateServicio",
    "",
    undefined,
    undefined,
    undefined,
    false
  );

  // Manejador de subida del Excel
  const handleUploadExcel = (data: any) => {
    console.log(data, "sdas");

    const processedData = {
      SaldosMes: data.SaldosMes || [],
      CuentasPorPagar: data.CuentasPorPagar || [],
      CuentasPorCobrar: data.CuentasPorCobrar || [],
      ResumenImpuestos: data.ResumenImpuestos || []
    };

    setExcelData(processedData); // Actualizamos el estado con los datos procesados
  };

  console.log(excelData);

  // Manejador de archivo subido
  const handleUploadFile = (fileData: { name: string; base64: string }) => {
    console.log("Archivo subido:", fileData); // Verifica que el archivo se está capturando
    setUploadedFile(fileData); // Guardamos el archivo sin extensión, que se añade luego
  };

  console.log(uploadedFile); // Para verificar si el archivo fue capturado

  // Manejador de envío de los datos
  const handleSubmit = async () => {
    if (!uploadedFile) {
      console.error("Falta el archivo para 'documentContadora'.");
      return;
    }

    const extension = uploadedFile.name.split(".").pop(); // Extraemos la extensión del archivo

    const { state, ...restData } = data; // Eliminamos la propiedad "state" del objeto data

    const requestData = {
      ...restData, // Incluimos los datos del servicio sin el estado original
      ...excelData, // Datos procesados del Excel
      documentContadora: {
        name: uploadedFile.name,
        extension: `.${extension}`, // Agregamos la extensión al enviar
        base64: uploadedFile.base64,
      },
      state: ["FINALIZADO"], // Asignamos el nuevo estado
    };

    console.log("Datos a enviar:", requestData); // Debug: Verifica los datos antes de enviar

    try {
      await updateFetchData(id, requestData);
      console.log("Actualización exitosa");
      navigate("/lista-clientes");
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  return (
    <div className={style.entregaDocumentos__container}>
      <p className={style.entregaDocumentos__title}>
        Carga los resultados del servicio:
      </p>
      <p className={style.entregaDocumentos__text}>
        Es importante que se suban los resultados en las fechas pactadas.
      </p>

      <div
        style={{
          display: "flex",
          gap: "2rem",
        }}
      >
        <SectionStructure additionalClassName={style.entregaDocumentos__lista}>
          <ExcelUploader onUpload={handleUploadExcel} />
        </SectionStructure>

        <SectionStructure additionalClassName={style.entregaDocumentos__lista}>
          <UploadField
            textLabel="Subir Archivo"
            direction="row"
            labelWidth="220px"
            onUpload={handleUploadFile}
          />
        </SectionStructure>
      </div>

      <div>
        <p className={style.entregaDocumentos__text__limite}>
          • El tamaño de carga está limitado a 50 MB.
        </p>
      </div>

      <div>
        <CustomButton
          text={isLoadingUpdate ? "Enviando..." : "Enviar"} // Indicador de carga
          backgroundButton="var(--primary-color-app)"
          colorP="#fff"
          onClick={handleSubmit} // Aquí se envían los datos
          disabled={isLoadingUpdate} // Desactivar mientras se está enviando
        />
      </div>
    </div>
  );
};
