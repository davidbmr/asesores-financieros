import React, { useState, useEffect } from "react";
import style from "./SolicitudDocumentos.module.css";
import { ContentBox } from "@/components/ContentBox/ContentBox";
import { SwitchField } from "@/components/SwitchField/SwitchField";
import { CustomButton } from "@/components/CustomButton/CustomButton";
import { useParams } from "react-router-dom";
import { useUpdateFetch } from "@/hooks/useUpdateFetch";
import { SectionStructure } from "@/components/SectionStructure/SectionStructure";

interface DocumentSwitchProps {
  data?: any;
  handleStepClick?: any;
}

const contabilidadDocuments = [
  { id: 1, label: "Estados Financieros del último ejercicio (con Notas y Anexos)" },
  { id: 2, label: "Últimos Estados Financieros del presente ejercicio (con Notas y Anexos)" },
  { id: 3, label: "Balance de Comprobación (máximo número de dígitos posible)" },
  { id: 4, label: "Mayor de cuentas de gastos e ingresos del ejercicio corriente" },
  { id: 5, label: "Determinación del Costo de Ventas o Servicio (ejercicio corriente)" },
  { id: 6, label: "Conciliaciones bancarias del ejercicio corriente" },
  { id: 7, label: "KARDEX del ejercicio corriente" },
  { id: 8, label: "Cuentas bancarias manejadas" },
  { id: 9, label: "Comprobantes de Pago de Compras (con voucher del pago)" },
  { id: 10, label: "Recibos por Honorarios recibidos (con voucher del pago)" },
  { id: 11, label: "Comprobantes de Pago de Ventas emitidos" },
  { id: 12, label: "Reporte de facturas cobradas (con número de operación)" },
  { id: 13, label: "Estado de cuenta de cuentas corrientes bancarias" },
  { id: 14, label: "Detalle de provisiones de gastos mensuales" },
  { id: 15, label: "Detalle de préstamos recibidos y otorgados" },
  { id: 16, label: "Clave SOL" }
];

const tributariaLaboralDocuments = [
  { id: 17, label: "Determinación del Impuesto a la Renta del ejercicio anterior (con hojas de trabajo)" },
  { id: 18, label: "PDT 621 - Pagos a cuenta mensuales o IGV mensual (periodo corriente)" },
  { id: 19, label: "Registro de Activos Fijos (periodo corriente)" },
  { id: 20, label: "Detalle de Activos Intangibles (periodo corriente)" },
  { id: 21, label: "Backup del PLAME" }
];

export const SolicitudDocumentos = ({
  data,
  handleStepClick,
}: DocumentSwitchProps) => {
  const [contabilidadSwitches, setContabilidadSwitches] = useState(
    contabilidadDocuments.map((doc) => ({ ...doc, active: false }))
  );
  const [tributariaLaboralSwitches, setTributariaLaboralSwitches] = useState(
    tributariaLaboralDocuments.map((doc) => ({ ...doc, active: false }))
  );
  const { id } = useParams<{ id: string }>();
  const { updateFetchData, isLoadingUpdate } = useUpdateFetch(
    "servicio/updateServicio",
    "",
    undefined,
    undefined,
    undefined,
    false
  );

  // Check if files array is empty to disable the button
  const isFilesEmpty = data?.files && data.files.length === 0;

  useEffect(() => {
    if (data && data.labelFiles) {
      setContabilidadSwitches((prevState) =>
        prevState.map((doc) => ({
          ...doc,
          active: data.labelFiles.includes(doc.label),
        }))
      );
      setTributariaLaboralSwitches((prevState) =>
        prevState.map((doc) => ({
          ...doc,
          active: data.labelFiles.includes(doc.label),
        }))
      );
    }
  }, [data]);

  const handleSwitchChange = (index: number, value: boolean, category: string) => {
    const setState = category === "contabilidad" ? setContabilidadSwitches : setTributariaLaboralSwitches;
    setState((prevState) => {
      const newState = [...prevState];
      newState[index].active = value;

      const activeLabels = [
        ...contabilidadSwitches.filter((doc) => doc.active).map((doc) => doc.label),
        ...tributariaLaboralSwitches.filter((doc) => doc.active).map((doc) => doc.label)
      ];

      const requestData = {
        ...data,
        labelFiles: activeLabels,
        paso: 2,
        type: "CLIENTE",
        code: 2
      };

      updateFetchData(id, requestData).catch((error) => {
        console.error("Error updating servicio:", error);
      });

      return newState;
    });
  };

  const handleSubmit = async () => {
    const activeLabels = [
      ...contabilidadSwitches.filter((doc) => doc.active).map((doc) => doc.label),
      ...tributariaLaboralSwitches.filter((doc) => doc.active).map((doc) => doc.label)
    ];

    const requestData = {
      ...data,
      labelFiles: activeLabels,
      paso: 3,
    };

    try {
      await updateFetchData(id, requestData);
      handleStepClick(3);
    } catch (error) {
      console.error("Error updating servicio:", error);
    }
  };

  return (
    <div className={style.entregaDocumentos__container}>
      <p className={style.entregaDocumentos__title}>
        Habilita los siguientes documentos:
      </p>
      <p className={style.entregaDocumentos__text}>
        Es importante identificar qué documentos son necesarios para continuar
        con el servicio. Recuerda que si no activas un documento, el cliente no
        podrá tener la opción de cargar su archivo.
      </p>

      <SectionStructure>
        <p>INFORMACIÓN CONTABLE</p>
        <hr />
        <ContentBox additionalClassName={style.entregaDocumentos__lista} hasBorder={false}>
          {contabilidadSwitches.map((doc, index) => (
            <SwitchField
              key={doc.id}
              name={doc.label}
              value={doc.active}
              onChange={(e) => handleSwitchChange(index, e.value, "contabilidad")}
              textLabel={doc.label}
              direction="row"
              labelWidth="150px"
            />
          ))}
        </ContentBox>
      </SectionStructure>

      <SectionStructure>
        <p>INFORMACIÓN TRIBUTARIA Y LABORAL</p>
        <hr />
        <ContentBox additionalClassName={style.entregaDocumentos__lista} hasBorder={false}>
          {tributariaLaboralSwitches.map((doc, index) => (
            <SwitchField
              key={doc.id}
              name={doc.label}
              value={doc.active}
              onChange={(e) => handleSwitchChange(index, e.value, "tributariaLaboral")}
              textLabel={doc.label}
              direction="row"
              labelWidth="150px"
            />
          ))}
        </ContentBox>
      </SectionStructure>

      <p className={style.entregaDocumentos__text__limite}>
        Asegúrate de activar los documentos correctos.
      </p>

      <CustomButton
        text="Continuar"
        backgroundButton={isFilesEmpty ? "var(--gray-color)" : "var(--primary-color-app)"}
        colorP="#fff"
        onClick={handleSubmit}
        disabled={isFilesEmpty || isLoadingUpdate}
      />
    </div>
  );
};
