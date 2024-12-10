import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import style from "./MiPerfil.module.css";
import { handleChangeInput } from "@/helpers/handleTextBox";
import { Button } from "primereact/button";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import ImageUploader from "@/components/ImageUploader/ImageUploader";
import { useUpdateFetch } from "@/hooks/useUpdateFetch";
import PrimeCalendar from "@/primeComponents/PrimeCalendar/PrimeCalendar";
import { RootState } from "@/store/store";
import { useGetFetch } from "@/hooks/useGetFetch";

const MiPerfil = () => {
  const { usuario } = useSelector((state: RootState) => state.auth);
  const { data, isLoading, reloadFetchData } = useGetFetch<any>(`user/getContadoraById/${usuario?.uid}`);
  const [userData, setUserData] = useState<any>({
    nombre: "",
    correo: "",
    experiencia: "",
    fecha_nacimiento: "",
    codigo_colegiala: "",
    imgContadora: "",
  });

  const { updateFetchData } = useUpdateFetch(
    "user/actualizarContadora",
    "Perfil",
    reloadFetchData,
    { onHideModal: () => {} }
  );

  useEffect(() => {
    if (data && data.contadora) {
      const contadoraData = data.contadora;
      setUserData({
        nombre: contadoraData.nombre,
        correo: contadoraData.correo,
        experiencia: contadoraData.experiencia,
        fecha_nacimiento: new Date(contadoraData.fecha_nacimiento),
        codigo_colegiala: contadoraData.codigo_colegiala,
        imgContadora: contadoraData.imgContadora,
      });
    }
  }, [data]);

  const handleUpdate = async () => {
    if (usuario?.uid) {
      await updateFetchData(usuario.uid, userData);
    }
  };

  const handleImageUpload = (base64Image: string) => {
    setUserData((prevData: any) => ({ ...prevData, imgContadora: base64Image }));
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className={style.column__container}>
      <TextBoxField
        textLabel="Nombre"
        value={userData.nombre || ""}
        name="nombre"
        onChange={(e) => handleChangeInput(e, setUserData)}
      />

      <TextBoxField
        textLabel="Correo"
        value={userData.correo || ""}
        name="correo"
        onChange={(e) => handleChangeInput(e, setUserData)}
      />

      <TextBoxField
        textLabel="Experiencia"
        value={userData.experiencia || ""}
        name="experiencia"
        onChange={(e) => handleChangeInput(e, setUserData)}
      />

      <PrimeCalendar
        label="Fecha de Nacimiento"
        value={userData.fecha_nacimiento}
        onChange={(e) => handleChangeInput(e, setUserData)}
        name="fecha_nacimiento"
      />

      <TextBoxField
        textLabel="Codigo Colegiada"
        value={userData.codigo_colegiala || ""}
        name="codigo_colegiala"
        onChange={(e) => handleChangeInput(e, setUserData)}
      />

      <ImageUploader
        existingImage={userData.imgContadora}
        onImageUpload={handleImageUpload}
        label="Seleccionar Imagen"
      />

      <div className={style.button__container}>
        <Button
          className="p-button-sm p-button-info"
          onClick={handleUpdate}
        >
          ACTUALIZAR PERFIL
        </Button>
      </div>
    </div>
  );
};

export default MiPerfil;
