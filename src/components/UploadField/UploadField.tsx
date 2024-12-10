import React from "react";
import style from "./UploadField.module.css";
import { FaUpload, FaSpinner } from "react-icons/fa";

interface UploadFieldProps {
  textLabel?: string;
  name?: string;
  onUpload?: (fileData: { name: string; base64: string }) => void;
  direction?: "row" | "column";
  disabled?: boolean;
  labelWidth?: string;
  uploadUrl?: string;
  isUploading?: boolean;
  fileExtensions?: string; // Nuevo prop para las extensiones
}

export const UploadField = ({
  textLabel,
  name,
  onUpload,
  direction = "column",
  disabled = false,
  labelWidth = "100%",
  uploadUrl,
  isUploading,
  fileExtensions = ".pdf,.doc,.docx,.xls,.xlsx,.zip,.rar", // Valor por defecto
}: UploadFieldProps) => {
  const [fileName, setFileName] = React.useState("");
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        let base64String = reader.result as string;
        if (base64String.includes(',')) {
          base64String = base64String.split(',')[1];
        }
        if (onUpload) {
          onUpload({ name: file.name, base64: base64String }); // Nombre real del archivo
        }
      };
      reader.readAsDataURL(file);
      setFileName(file.name); // Guardamos el nombre real del archivo
    }
  };

  const triggerFileSelect = () => {
    if (!disabled && !isUploading) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div
      className={`${style.item__group} ${
        direction === "column" ? style.item__column : style.item__row
      }`}
    >
      {textLabel ? <label style={{ width: labelWidth }}>{textLabel}</label> : null}
      <div className={style.uploadField__button} onClick={triggerFileSelect}>
        {isUploading ? (
          <FaSpinner className={style.loadingIcon} />
        ) : (
          <>
            <span>{fileName || "Seleccionar Archivo"}</span>
            <FaUpload className={style.uploadIcon} />
            <input
              type="file"
              accept={fileExtensions} // Aquí usamos el nuevo prop
              onChange={handleFileChange}
              ref={fileInputRef}
              style={{ display: 'none' }}
              disabled={disabled || isUploading}
            />
          </>
        )}
      </div>
    </div>
  );
};
