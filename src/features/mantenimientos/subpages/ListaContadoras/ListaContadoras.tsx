import React, { useState } from "react";
import { DataTable } from "@/components/DataTable/DataTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { AddModal } from "./AddModal/AddModal";
import { useModal } from "@/hooks/useModal";
import { Button } from "primereact/button";
import style from './ListaContadora.module.css';

interface Usuario {
  nombre: string;
  correo: string;
  nroFactura: string;
  valor: string;
  uid: string;
}

export const ListaContadoras: React.FC = () => {
  const addModal = useModal();
  const contrastModal = useModal();
  const [selectedUser, setSelectedUser] = useState<Usuario | null>(null);
  const [usuarios, setUsuarios] = useState<Usuario[]>([
    {
      uid: "1",
      nombre: "ABC",
      correo: "123456789",
      nroFactura: "001",
      valor: "1000",
    },
    {
      uid: "2",
      nombre: "DEF",
      correo: "987654321",
      nroFactura: "002",
      valor: "2000",
    },
    {
      uid: "3",
      nombre: "GHI",
      correo: "456789123",
      nroFactura: "003",
      valor: "3000",
    },
  ]);
  const [loadingMessage, setLoadingMessage] = useState("Cargando...");
  const [showDownloadButton, setShowDownloadButton] = useState(false);

  const handleClientRedirect = (id: string) => {
    console.log("Redirecting to user:", id);
  };

  const handleAddUser = (newUser: Usuario) => {
    setUsuarios([...usuarios, { ...newUser, uid: Date.now().toString() }]);
  };

  const handleUpdateUser = (updatedUser: Usuario) => {
    setUsuarios((prevUsuarios) =>
      prevUsuarios.map((user) =>
        user.uid === updatedUser.uid ? updatedUser : user
      )
    );
  };

  const handleContrast = () => {
    contrastModal.onVisibleModal();
    setShowDownloadButton(false);
    setLoadingMessage("Cargando...");
    setTimeout(() => {
      setLoadingMessage("Contrastando...");
      setTimeout(() => {
        setLoadingMessage("Buscando Incidencias...");
        setTimeout(() => {
          setLoadingMessage(
            <>
              Se ha encontrado <span className={style.red}>2 incidencias</span>
            </>
          );
          setShowDownloadButton(true);
        }, 2000);
      }, 2000);
    }, 1000);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/ruta/del/archivo.xlsx'; // Reemplaza con la ruta de tu archivo local
    link.download = 'reporte_incidencias.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <MainContentStructure titleText="Lista de Soportes">
        <DataTable
          columns={columns}
          data={usuarios}
          textAddButton="Crear Soporte"
          onAddModal={() => {
            setSelectedUser(null);
            addModal.onVisibleModal();
          }}
          isSearch={true}
          onEye={(rowData: Usuario) => {
            handleClientRedirect(rowData?.uid);
          }}
        />

        <div className={style.container__button}>
          <Button label="Contrastar" onClick={handleContrast} className="p-button-secondary" />
        </div>
      </MainContentStructure>

      <PrimeModal
        header="Crear Soporte"
        modalStatus={addModal.modalStatus}
        onHideModal={addModal.onHideModal}
        width={800}
      >
        <AddModal
          onHideModal={addModal.onHideModal}
          existingData={selectedUser}
          onSave={(data) => {
            if (selectedUser) {
              handleUpdateUser(data);
            } else {
              handleAddUser(data);
            }
            addModal.onHideModal();
          }}
        />
      </PrimeModal>

      <PrimeModal
        header="Proceso"
        modalStatus={contrastModal.modalStatus}
        onHideModal={contrastModal.onHideModal}
        width={400}
        closable={false}
      >
        <div className={style.container__1}>
          <p>{loadingMessage}</p>
          {showDownloadButton && (
            <Button label="Descargar Excel" icon="pi pi-download" onClick={handleDownload} />
          )}
        </div>
      </PrimeModal>
    </>
  );
};

const columns = [
  { nombre: "Prefijo", campo: "nombre" },
  { nombre: "NIT", campo: "correo" },
  { nombre: "Propiedad", campo: "nroFactura" },
  { nombre: "Valor", campo: "valor" },
];
