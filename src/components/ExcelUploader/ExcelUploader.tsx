import React, { useState } from "react";
import * as XLSX from "xlsx";
import { UploadField } from "../UploadField/UploadField";
import { CustomButton } from "../CustomButton/CustomButton";

interface ExcelUploaderProps {
  onUpload: (data: any) => void;
}

export const ExcelUploader: React.FC<ExcelUploaderProps> = ({ onUpload }) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (fileData: {
    name: string;
    base64: string;
  }) => {
    setIsUploading(true);

    try {
      // Convertir el base64 a un ArrayBuffer para poder procesarlo con xlsx
      const byteCharacters = atob(fileData.base64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const workbook = XLSX.read(byteArray, { type: "array" });

      // Leer la primera hoja del Excel
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Convertir los datos a formato JSON
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      // Filtrar filas que no deberían ser mostradas
      const filteredData = jsonData.filter((row: any) => {
        // Filtrar por títulos o claves que no deben mostrarse
        const invalidTitles = [
          "Resumen de impuestos",
          "Cuentas por Cobrar",
          "Cuentas por Pagar",
          "Saldos en Bancos",
          "Mes",
          "Ventas (PEN)",
          "Gastos (PEN)",
        ];

        // Verificar si el título de la fila contiene alguno de los textos no deseados
        return (
          !invalidTitles.includes(row["Mes"]) &&
          !invalidTitles.includes(row["Ventas (PEN)"]) &&
          !invalidTitles.includes(row["Gastos (PEN)"])
        );
      });

      // Agrupar los datos restantes en secciones dinámicas
      const SaldosMes = filteredData.slice(0, 12).map((row: any) => ({
        month: row["Mes"],
        sales_pen: row["Ventas (PEN)"],
        expenses_pen: row["Gastos (PEN)"],
      }));

      const CuentasPorPagar = filteredData.slice(12, 20).map((row: any) => ({
        bank: row["Mes"],
        balance_usd: row["Ventas (PEN)"],
        balance_pen: row["Gastos (PEN)"],
      }));

      const CuentasPorCobrar = filteredData.slice(20, 28).map((row: any) => ({
        status: row["Mes"],
        amount_pen: row["Ventas (PEN)"],
      }));

      const ResumenImpuestos = filteredData.slice(28).map((row: any) => ({
        tax_type: row["Mes"],
        amount_pen: row["Ventas (PEN)"],
      }));

      const resultData = {
        SaldosMes,
        CuentasPorPagar,
        CuentasPorCobrar,
        ResumenImpuestos,
      };

      // Enviar los datos estructurados al backend
      onUpload(resultData);
    } catch (error) {
      console.error("Error al procesar el archivo Excel:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownloadTemplate = () => {
    const link = document.createElement("a");
    link.href = "/public/Template Eva.xlsx";
    link.setAttribute("download", "Template Eva.xlsx");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        flexDirection: "column",
      }}
    >
      <UploadField
        textLabel="Seleccionar Archivo Excel"
        name="excelFile"
        onUpload={handleFileUpload}
        isUploading={isUploading}
        fileExtensions=".xls,.xlsx" // Solo archivos de Excel
        uploadUrl="" // No se usa en este caso
        direction="row"
        labelWidth="400px"
      />

      <CustomButton
        text="Descargar Template"
        backgroundButton="var(--primary-color-app)"
        colorP="#fff"
        onClick={handleDownloadTemplate}
      />
    </div>
  );
};
