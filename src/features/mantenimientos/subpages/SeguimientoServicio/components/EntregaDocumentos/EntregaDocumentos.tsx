import React, { useEffect, useState } from "react";
import style from "./EntregaDocumentos.module.css";
import { ContentBox } from "@/components/ContentBox/ContentBox";
import { UploadField } from "@/components/UploadField/UploadField";
import { useUpdateFetch } from "@/hooks/useUpdateFetch";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { FaCheck } from "react-icons/fa";
import { CustomButton } from "@/components/CustomButton/CustomButton";

interface EntregaDocumentosProps {
  data?: any;
  reloadFetchData?: () => void;
}

export const EntregaDocumentos = ({ data, reloadFetchData }: EntregaDocumentosProps) => {
  const authState = useSelector((state: RootState) => state.auth.usuario);
  const { id } = useParams<{ id: string }>();
  const [selectedFiles, setSelectedFiles] = useState<{ name: string; base64: string; extension: string }[]>([]);

  const {
    updateFetchData,
    isLoadingUpdate,
    errorUpdate,
    successUpdate,
  } = useUpdateFetch(
    `servicio/updateServicio`,
    "Documento",
    undefined,
    undefined,
    {
      pending: "Subiendo documento...",
      success: "Documento subido exitosamente",
      error: "Error al subir el documento",
    }
  );

  useEffect(() => {
    if (data?.files) {
      const existingFiles = data.files.map((file: any) => ({
        name: file.name,
        base64: "",
        extension: "",
      }));
      setSelectedFiles(existingFiles);
    }
  }, [data]);

  useEffect(() => {
    if (successUpdate && reloadFetchData) {
      reloadFetchData();
    }
  }, [successUpdate]);

  const handleUpload = async () => {
    console.log("Selected files:", selectedFiles);
    console.log("Required files:", data.labelFiles);

    // if (selectedFiles.length !== data.labelFiles.length) {
    //   console.error("Faltan archivos por cargar");
    //   return;
    // }

    const requestData = {
      ...data,
      files: [...(data.files || []), ...selectedFiles.filter(f => f.base64)], // Agregar archivos seleccionados
      type: "CONTADORA",
      code: 2
    };

    try {
      await updateFetchData(authState?.servicioCliente, requestData);
      setSelectedFiles([]); // Limpiar la lista de archivos seleccionados
    } catch (error) {
      console.error("Error al subir el documento:", error);
    }
  };

  const handleFileSelect = (label: string, fileData: { base64: string; name: string }) => {
    // Extraer la extensión del archivo seleccionado
    const extension = fileData.name.split('.').pop();

    const fileWithCorrectName = {
      name: label,       // Utilizar el label como nombre del archivo
      base64: fileData.base64,
      extension: extension ? `.${extension}` : "", // Capturar la extensión real del archivo
    };

    setSelectedFiles(prevFiles => {
      const existingFileIndex = prevFiles.findIndex(file => file.name === label);
      if (existingFileIndex !== -1) {
        const updatedFiles = [...prevFiles];
        updatedFiles[existingFileIndex] = fileWithCorrectName;
        return updatedFiles;
      }
      return [...prevFiles, fileWithCorrectName];
    });
  };

  return (
    <div className={style.entregaDocumentos__container}>
      <p className={style.entregaDocumentos__title}>
        Carga los siguientes documentos:
      </p>
      <p className={style.entregaDocumentos__text}>
        Es importante que se suban los documentos en las fechas pactadas.
        Recuerda que es importante para el proceso del servicio.
      </p>
      <ContentBox additionalClassName={style.entregaDocumentos__lista}>
        {data?.labelFiles.map((label: string, index: number) => {
          const uploadedFile = data.files?.find((file: any) => file.name === label);
          const isUploaded = !!uploadedFile;

          return (
            <div key={index} className={style.uploadFieldContainer}>
              {isUploaded ? (
                <div className={style.uploadedMessage}>
                  <FaCheck className={style.checkIcon} /> 
                  <span>{label} - Archivo subido</span>
                  <a
                    href={uploadedFile?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={style.viewFileLink}
                  >
                    Ver archivo
                  </a>
                </div>
              ) : (
                <UploadField
                  textLabel={label}
                  name={label}
                  direction="row"
                  labelWidth="150px"
                  uploadUrl="/api/upload"
                  onUpload={(fileData) => handleFileSelect(label, fileData)}
                  isUploading={isLoadingUpdate}
                  disabled={isUploaded}
              
               
                />
              )}
            </div>
          );
        })}
      </ContentBox>

      <p className={style.entregaDocumentos__text__limite}>
        El tamaño de carga está limitado a 50 MB por archivo.
      </p>

      <CustomButton
        text="Subir Archivos"
        backgroundButton="var(--primary-color-app)"
        colorP="#fff"
        onClick={handleUpload}
        // disabled={selectedFiles.length !== data.labelFiles.length || isLoadingUpdate}
      />
    </div>
  );
};
